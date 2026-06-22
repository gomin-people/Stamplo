import "server-only";

type PriorityAdminEventClient = {
  rpc: (
    fn: "get_priority_admin_event_id"
  ) => PromiseLike<{ data: unknown; error: unknown }>;
};

/**
 * 현재 관리자의 우선순위 행사 ID를 조회합니다.
 *
 * @param supabaseClient - 세션이 연결된 Supabase 클라이언트
 * @returns 우선순위 행사 ID 또는 null
 */
export const getPriorityAdminEventId = async (
  supabaseClient: PriorityAdminEventClient
) => {
  const { data: eventId, error } = await supabaseClient.rpc(
    "get_priority_admin_event_id"
  );

  if (error) {
    console.error("Error fetching priority admin event:", error);
    return null;
  }

  const parsedEventId =
    typeof eventId === "number" || typeof eventId === "string"
      ? Number(eventId)
      : null;

  if (
    parsedEventId !== null &&
    Number.isInteger(parsedEventId) &&
    parsedEventId > 0
  ) {
    return parsedEventId;
  }

  return null;
};
