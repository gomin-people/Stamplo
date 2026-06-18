import { requestJson, resolveRequest } from "@/features/shared/api/http";
import type { EventModel, MissionModel, QrCodeModel } from "@/types/models";

export type AdminEventDetail = EventModel & {
  missions: MissionModel[];
  qrCodes: QrCodeModel[];
  participantCount: number;
};

export async function fetchAdminEvent(
  eventId: number
): Promise<AdminEventDetail> {
  const { url, init } = await resolveRequest(`/api/v1/admin/events/${eventId}`);
  return requestJson<AdminEventDetail>(url, init);
}
