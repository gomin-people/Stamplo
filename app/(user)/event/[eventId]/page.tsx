import EntryClient from "@/components/user/entry/EntryClient";
import { fetchParticipantEvent } from "@/features/participant/events/participantEventApi";

type EventEntryPageProps = {
  params: Promise<{ eventId: string }>;
};

export default async function EventEntryPage({ params }: EventEntryPageProps) {
  const { eventId } = await params;
  const event = await fetchParticipantEvent(Number(eventId));

  return (
    <EntryClient
      eventId={eventId}
      posterImageUrl={event.posterImageUrl}
      hasBrochure={!!event.brochureImageUrl?.length}
    />
  );
}
