import { fetchParticipantEvent } from "@/features/participant/events/participantEventApi";
import EventDetailClient from "@/components/user/event/EventDetailClient";

type Props = {
  params: Promise<{ eventId: string }>;
};

const EventDetailPage = async ({ params }: Props) => {
  const { eventId } = await params;
  const event = await fetchParticipantEvent(Number(eventId));

  return <EventDetailClient event={event} />;
};

export default EventDetailPage;
