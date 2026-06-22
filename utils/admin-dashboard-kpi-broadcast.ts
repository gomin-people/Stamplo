import "server-only";

import { supabase } from "@/utils/supabase/server";

type DashboardKpiInvalidateReason =
  | "participant_entered"
  | "mission_completed"
  | "reward_claimed";

/**
 * 관리자 대시보드 KPI 구독자에게 invalidate Broadcast를 전송합니다.
 *
 * @param eventId - 갱신 대상 행사 ID
 * @param reason - 대시보드 재조회 원인이 된 이벤트 종류
 */
export const sendDashboardKpiInvalidate = async (
  eventId: number,
  reason: DashboardKpiInvalidateReason
) => {
  const channel = supabase.channel(`dashboard-kpis:${eventId}`, {
    config: { private: true },
  });

  try {
    await channel.send({
      type: "broadcast",
      event: "invalidate",
      payload: {
        eventId,
        reason,
        sentAt: new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error("Failed to send dashboard KPI invalidate broadcast:", error);
  } finally {
    await supabase.removeChannel(channel);
  }
};
