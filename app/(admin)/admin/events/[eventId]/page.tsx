import { fetchAdminEvent } from "@/features/admin/events/adminEventApi";
import EventEditClient from "@/components/admin/event/edit/EventEditClient";

export default async function EventEditPage({
  params,
}: {
  params: Promise<{ eventId: string }>;
}) {
  const eventId = await params.then(({ eventId }) => Number(eventId));
  const event = await fetchAdminEvent(eventId);

  return <EventEditClient initialEvent={event} />;
}
