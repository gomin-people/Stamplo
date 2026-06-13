import { getEntryEvent } from "@/features/qr/entry/api/entry";
import EventDetailClient from "@/components/user/event/EventDetailClient";

type Props = {
  params: Promise<{ eventId: string }>;
};

const EventDetailPage = async ({ params }: Props) => {
  const { eventId } = await params;
  const event = await getEntryEvent(eventId);

  return <EventDetailClient event={event} />;
};

export default EventDetailPage;
