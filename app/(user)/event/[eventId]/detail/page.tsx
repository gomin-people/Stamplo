import { fetchParticipantEvent } from "@/features/participant/events/participantEventApi";
import EventDetailClient from "@/components/user/event/EventDetailClient";

type Props = {
  params: Promise<{ eventId: string }>;
};

export default async function EventDetailPage({ params }: Props) {
  const { eventId } = await params;
  const event = await fetchParticipantEvent(Number(eventId));

  return <EventDetailClient event={event} />;
}
