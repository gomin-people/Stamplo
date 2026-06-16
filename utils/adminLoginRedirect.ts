import "server-only";
import type { SupabaseClient } from "@supabase/supabase-js";
import { ADMIN_EVENT_REGISTER_PATH } from "@/constants/adminRoutes";

type PriorityAdminEventClient = Pick<SupabaseClient, "rpc">;

/**
 * 로그인 완료 후 관리자를 보낼 우선순위 경로를 계산합니다.
 *
 * @param supabase - 세션이 반영된 Supabase client
 * @returns 우선순위 행사 대시보드, 행사 등록, 또는 로그인 페이지 경로
 */
export const getAdminLoginRedirectPath = async (
  supabase: PriorityAdminEventClient
) => {
  const { data: eventId, error } = await supabase.rpc(
    "get_priority_admin_event_id"
  );

  if (error) {
    console.error("Error fetching priority admin event:", error);
    return "/admin";
  }

  const parsedEventId =
    typeof eventId === "number"
      ? eventId
      : typeof eventId === "string"
        ? Number(eventId)
        : null;

  if (parsedEventId === null || !Number.isInteger(parsedEventId)) {
    return ADMIN_EVENT_REGISTER_PATH;
  }

  return `/admin/events/${parsedEventId}/dashboard`;
};
