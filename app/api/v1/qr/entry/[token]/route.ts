import { type NextRequest, NextResponse } from "next/server";
import {
  badRequest,
  getParticipantEventUserId,
  notFound,
  parseOptionalNonEmptyString,
  serverError,
  setParticipantCookie,
} from "@/utils/api";
import { supabase } from "@/utils/supabase/server";
import { getEventOperationStatus } from "@/utils/event-status";
import { USER_ROUTES, getUserRoutes } from "@/constants/userRoutes";
import { sendDashboardKpiInvalidate } from "@/utils/admin-dashboard-kpi-broadcast";

// 입장 QR route parameter 타입
type EntryRouteContext = {
  params: Promise<{
    token: string;
  }>;
};

/**
 * ENTRY QR 토큰으로 행사 입장 처리와 참여자 쿠키 발급을 수행합니다.
 *
 * @param request - userId query parameter와 참여자 쿠키를 포함할 수 있는 요청 객체
 * @param context - QR token route parameter
 * @returns 행사, 참여자, QR 정보
 */
export async function GET(request: NextRequest, { params }: EntryRouteContext) {
  const { token } = await params;

  if (!token) {
    return badRequest("QR 토큰이 필요합니다.");
  }

  const requestedUserId = request.nextUrl.searchParams.get("userId");
  const userId = parseOptionalNonEmptyString(requestedUserId);

  if (requestedUserId !== null && userId === null) {
    return badRequest("올바른 userId가 필요합니다.");
  }

  const { data: qrCode, error: qrCodeError } = await supabase
    .from("qr_codes")
    .select("*, events(*)")
    .eq("token", token)
    .eq("type", "ENTRY")
    .maybeSingle();

  if (qrCodeError) {
    return serverError("입장 QR 조회 실패", qrCodeError);
  }

  if (!qrCode) {
    return notFound("입장 QR을 찾을 수 없습니다.");
  }

  const event = qrCode.events;

  if (!event) {
    return notFound("행사를 찾을 수 없습니다.");
  }

  const { isBefore, isAfter } = getEventOperationStatus(
    event.start_date,
    event.end_date
  );

  if (isBefore) {
    return NextResponse.redirect(
      new URL(
        `${USER_ROUTES.USER_UNAVAILABLE}?reason=event-not-started`,
        request.url
      )
    );
  }

  if (isAfter) {
    return NextResponse.redirect(
      new URL(`${USER_ROUTES.USER_UNAVAILABLE}?reason=event-ended`, request.url)
    );
  }

  const currentEventUserId = getParticipantEventUserId(request);

  // 같은 행사 참여자 쿠키가 이미 있으면 새 참여자를 만들지 않고 재사용
  if (currentEventUserId) {
    const { data: currentParticipant, error: currentParticipantError } =
      // participant_users 테이블에서 event_user_id와 events_id 기준 기존 참여자 조회
      await supabase
        .from("participant_users")
        .select("*")
        .eq("event_user_id", currentEventUserId)
        .eq("events_id", qrCode.events_id)
        .maybeSingle();

    if (currentParticipantError) {
      return serverError("기존 참여자 조회 실패", currentParticipantError);
    }

    if (currentParticipant) {
      const response = NextResponse.redirect(
        new URL(getUserRoutes(event.id).root, request.url)
      );
      setParticipantCookie(response, currentParticipant.event_user_id);
      return response;
    }
  }

  // participant_users 테이블에 ENTRY QR의 events_id와 user_id 기준 참여자 row 삽입 후 조회
  const { data: participant, error: participantError } = await supabase
    .from("participant_users")
    .insert({
      events_id: qrCode.events_id,
      user_id: userId,
      created_at: new Date().toISOString(),
    })
    .select("event_user_id")
    .single();

  if (participantError) {
    return serverError("참여자 생성 실패", participantError);
  }

  await sendDashboardKpiInvalidate(qrCode.events_id, "participant_entered");

  const response = NextResponse.redirect(
    new URL(getUserRoutes(event.id).root, request.url)
  );
  setParticipantCookie(response, participant.event_user_id);
  return response;
}
