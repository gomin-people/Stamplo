import { queryOptions } from "@tanstack/react-query";
import { requestJson } from "@/features/shared/api/http";
import { type MissionModel, type ParticipantModel } from "@/types/models";

export type ParticipantMission = MissionModel & {
  isCompleted: boolean;
  completedAt: string | null;
  token?: string | null;
};

export type ParticipantMissions = {
  participant: ParticipantModel;
  missions: ParticipantMission[];
  summary: {
    totalCount: number;
    completedCount: number;
  };
};

function getParticipantMissions() {
  return requestJson<ParticipantMissions>("/api/v1/participant/missions");
}

export const participantMissionQueries = {
  all: () => ["participant", "missions"] as const,
  list: () =>
    queryOptions({
      queryKey: participantMissionQueries.all(),
      queryFn: getParticipantMissions,
      // 서버에서 prefetch한 데이터가 있으면 30초간 fresh로 유지해 클라이언트 첫 fetch와
      // 포커스 재진입 시 자동 refetch를 억제한다.
      staleTime: 30_000,
    }),
};
