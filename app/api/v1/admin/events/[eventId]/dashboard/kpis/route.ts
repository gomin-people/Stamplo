import {
  badRequest,
  notFound,
  ok,
  parsePositiveInteger,
  serverError,
} from "@/utils/api";
import { authorizeAdminEvent } from "@/utils/admin-event-auth";
import { getAdminDashboardTodayWindow } from "@/utils/admin-dashboard-date";
import { supabase } from "@/utils/supabase/server";

const MISSION_COMPLETIONS_PAGE_SIZE = 1000;
const PARTICIPANTS_PAGE_SIZE = 1000;
const PARTICIPANT_ID_CHUNK_SIZE = 500;

// 어드민 대시보드 KPI route parameter 타입
type AdminDashboardKpisRouteContext = {
  params: Promise<{
    eventId: string;
  }>;
};

/**
 * 특정 행사의 어드민 대시보드 상단 KPI/퍼널 데이터를 조회합니다.
 *
 * @param request - Route Handler 요청 객체
 * @param context - 행사 ID route parameter
 * @returns 전체 정보 KPI 2개와 오늘 참여자 상태 분포 데이터
 */
export async function GET(
  request: Request,
  { params }: AdminDashboardKpisRouteContext
) {
  void request;
  const { eventId: eventIdParam } = await params;
  const eventId = parsePositiveInteger(eventIdParam);

  if (eventId === null) {
    return badRequest("올바른 행사 ID가 필요합니다.");
  }

  const authorization = await authorizeAdminEvent(eventId, "대시보드 KPI");

  if ("response" in authorization) {
    return authorization.response;
  }

  const { data: event, error: eventError } = await supabase
    .from("events")
    .select("start_date,end_date")
    .eq("id", eventId)
    .maybeSingle();

  if (eventError) {
    return serverError("대시보드 KPI 행사 기간 조회 실패", eventError);
  }

  if (!event) {
    return notFound("행사를 찾을 수 없습니다.");
  }

  const todayWindow = getAdminDashboardTodayWindow(
    event.start_date,
    event.end_date
  );

  const [
    { count: totalParticipants, error: totalParticipantsError },
    { count: totalRewardClaimed, error: totalRewardClaimedError },
    { data: activeMissions, error: activeMissionsError },
  ] = await Promise.all([
    supabase
      .from("participant_users")
      .select("id", { count: "exact", head: true })
      .eq("events_id", eventId),
    supabase
      .from("participant_users")
      .select("id", { count: "exact", head: true })
      .eq("events_id", eventId)
      .eq("is_reward_claimed", true),
    supabase
      .from("missions")
      .select("id")
      .eq("events_id", eventId)
      .eq("is_active", true),
  ]);

  if (totalParticipantsError) {
    return serverError(
      "대시보드 총 참여자 수 조회 실패",
      totalParticipantsError
    );
  }

  if (totalRewardClaimedError) {
    return serverError(
      "대시보드 총 굿즈 수령 수 조회 실패",
      totalRewardClaimedError
    );
  }

  if (activeMissionsError) {
    return serverError("대시보드 활성 미션 조회 실패", activeMissionsError);
  }

  const activeMissionIds = (activeMissions ?? [])
    .map((mission) => mission.id)
    .filter((missionId): missionId is number => typeof missionId === "number");
  const todayParticipantStates = await fetchTodayParticipantStates(
    eventId,
    todayWindow
  );

  if ("error" in todayParticipantStates) {
    return serverError(
      "대시보드 오늘 참여자 상세 조회 실패",
      todayParticipantStates.error
    );
  }

  const todayFunnel = await buildTodayFunnelSummary(
    eventId,
    activeMissionIds,
    todayWindow,
    todayParticipantStates.data
  );

  if ("error" in todayFunnel) {
    return serverError("대시보드 오늘 퍼널 요약 조회 실패", todayFunnel.error);
  }

  return ok({
    total_participants: {
      value: totalParticipants ?? 0,
    },
    total_reward_claimed: {
      value: totalRewardClaimed ?? 0,
    },
    today_funnel: todayFunnel.data,
  });
}

const fetchTodayParticipantStates = async (
  eventId: number,
  todayWindow: {
    startsAt: string;
    endsBefore: string;
  } | null
) => {
  if (!todayWindow) {
    return { data: [] as { id: number; isRewardClaimed: boolean }[] };
  }

  const participants: { id: number; isRewardClaimed: boolean }[] = [];

  for (let from = 0; ; from += PARTICIPANTS_PAGE_SIZE) {
    const { data, error } = await supabase
      .from("participant_users")
      .select("id,is_reward_claimed")
      .eq("events_id", eventId)
      .gte("created_at", todayWindow.startsAt)
      .lt("created_at", todayWindow.endsBefore)
      .order("id", { ascending: true })
      .range(from, from + PARTICIPANTS_PAGE_SIZE - 1);

    if (error) {
      return { error };
    }

    const rows = data ?? [];

    for (const row of rows) {
      if (typeof row.id === "number") {
        participants.push({
          id: row.id,
          isRewardClaimed: row.is_reward_claimed === true,
        });
      }
    }

    if (rows.length < PARTICIPANTS_PAGE_SIZE) {
      break;
    }
  }

  return { data: participants };
};

const buildTodayFunnelSummary = async (
  eventId: number,
  activeMissionIds: number[],
  todayWindow: {
    startsAt: string;
    endsBefore: string;
  } | null,
  participants: { id: number; isRewardClaimed: boolean }[]
) => {
  const participantCount = participants.length;

  if (!todayWindow || participantCount === 0 || activeMissionIds.length === 0) {
    return {
      data: {
        participants: participantCount,
        in_progress: {
          count: participantCount,
          percent: getPercent(participantCount, participantCount),
        },
        unclaimed: { count: 0, percent: 0 },
        claimed: { count: 0, percent: 0 },
      },
    };
  }

  const participantMissionMap = new Map<number, Set<number>>();

  for (
    let index = 0;
    index < participants.length;
    index += PARTICIPANT_ID_CHUNK_SIZE
  ) {
    const participantIds = participants
      .slice(index, index + PARTICIPANT_ID_CHUNK_SIZE)
      .map((participant) => participant.id);

    for (let from = 0; ; from += MISSION_COMPLETIONS_PAGE_SIZE) {
      const { data, error } = await supabase
        .from("mission_completions")
        .select("participant_users_id,missions_id")
        .eq("events_id", eventId)
        .in("missions_id", activeMissionIds)
        .in("participant_users_id", participantIds)
        .gte("completed_at", todayWindow.startsAt)
        .lt("completed_at", todayWindow.endsBefore)
        .order("id", { ascending: true })
        .range(from, from + MISSION_COMPLETIONS_PAGE_SIZE - 1);

      if (error) {
        return { error };
      }

      const rows = data ?? [];

      for (const row of rows) {
        if (
          typeof row.participant_users_id !== "number" ||
          typeof row.missions_id !== "number"
        ) {
          continue;
        }

        const missionIds =
          participantMissionMap.get(row.participant_users_id) ??
          new Set<number>();
        missionIds.add(row.missions_id);
        participantMissionMap.set(row.participant_users_id, missionIds);
      }

      if (rows.length < MISSION_COMPLETIONS_PAGE_SIZE) {
        break;
      }
    }
  }

  let completedCount = 0;
  let claimedCount = 0;

  for (const participant of participants) {
    const completedMissionIds = participantMissionMap.get(participant.id);
    const isCompleted =
      completedMissionIds !== undefined &&
      completedMissionIds.size === activeMissionIds.length;

    if (!isCompleted) {
      continue;
    }

    completedCount += 1;

    if (participant.isRewardClaimed) {
      claimedCount += 1;
    }
  }

  const inProgressCount = participantCount - completedCount;
  const unclaimedCount = completedCount - claimedCount;

  return {
    data: {
      participants: participantCount,
      in_progress: {
        count: inProgressCount,
        percent: getPercent(inProgressCount, participantCount),
      },
      unclaimed: {
        count: unclaimedCount,
        percent: getPercent(unclaimedCount, participantCount),
      },
      claimed: {
        count: claimedCount,
        percent: getPercent(claimedCount, participantCount),
      },
    },
  };
};

const getPercent = (count: number, total: number) => {
  if (total === 0) {
    return 0;
  }

  return Math.round((count / total) * 1000) / 10;
};
