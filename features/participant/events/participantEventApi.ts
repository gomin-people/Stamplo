import { requestJson, resolveRequest } from "@/features/shared/api/http";
import { type EventModel } from "@/types/models";

export async function fetchParticipantEvent(
  eventId: number
): Promise<EventModel> {
  const { url, init } = await resolveRequest(
    `/api/v1/participant/events/${eventId}`
  );
  return requestJson<EventModel>(url, init);
}

export async function fetchParticipantEventBrochure(
  eventId: number
): Promise<Pick<EventModel, "brochureImageUrl">> {
  const { url, init } = await resolveRequest(
    `/api/v1/participant/events/${eventId}/brochure`
  );
  return requestJson<Pick<EventModel, "brochureImageUrl">>(url, init);
}
