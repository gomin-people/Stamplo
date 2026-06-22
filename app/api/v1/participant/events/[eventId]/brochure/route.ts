import { type NextRequest } from "next/server";
import {
  badRequest,
  notFound,
  ok,
  parsePositiveInteger,
  serverError,
} from "@/utils/api";
import { supabase } from "@/utils/supabase/server";

type EventBrochureRouteContext = {
  params: Promise<{ eventId: string }>;
};

export async function GET(
  _request: NextRequest,
  { params }: EventBrochureRouteContext
) {
  const { eventId: eventIdParam } = await params;
  const eventId = parsePositiveInteger(eventIdParam);

  if (eventId === null) {
    return badRequest("올바른 행사 ID가 필요합니다.");
  }

  const { data: event, error } = await supabase
    .from("events")
    .select("brochure_image_url")
    .eq("id", eventId)
    .maybeSingle();

  if (error) {
    return serverError("브로셔 조회 실패", error);
  }

  if (!event) {
    return notFound("행사를 찾을 수 없습니다.");
  }

  return ok(event);
}
