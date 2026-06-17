import EntryClient from "@/components/user/entry/EntryClient";
import { fetchParticipantEvent } from "@/features/participant/events/participantEventApi";
// import { getEntryEvent } from "@/features/qr/entry/api/entry";

type EventEntryPageProps = {
  params: Promise<{ eventId: string }>;
};

export default async function EventEntryPage({ params }: EventEntryPageProps) {
  const { eventId } = await params;
  const event = await fetchParticipantEvent(Number(eventId));
  // const event = await getEntryEvent(eventId);

  return (
    <EntryClient
      eventId={eventId}
      posterImageUrl={event.posterImageUrl}
      hasBrochure={!!event.brochureImageUrl?.length}
    />
  );
}
