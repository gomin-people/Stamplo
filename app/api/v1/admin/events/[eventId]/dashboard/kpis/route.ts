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

  const { data, error } = await supabase.rpc("get_admin_dashboard_kpis", {
    p_event_id: eventId,
    p_today_starts_at: todayWindow?.startsAt ?? null,
    p_today_ends_before: todayWindow?.endsBefore ?? null,
  });

  if (error) {
    return serverError("대시보드 KPI 집계 조회 실패", error);
  }

  return ok(data);
}
