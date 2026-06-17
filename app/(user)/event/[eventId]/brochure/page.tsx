import { cookies } from "next/headers";
import { fetchParticipantEventBrochure } from "@/features/participant/events/participantEventApi";
import BrochureClient from "@/components/user/brochure/BrochureClient";
import { redirect } from "next/navigation";
import { getUserRoutes } from "@/constants/userRoutes";

type Props = {
  params: Promise<{ eventId: string }>;
  searchParams: Promise<{ from?: string }>;
};

export default async function BrochurePage({ params, searchParams }: Props) {
  const { eventId } = await params;
  const { from } = await searchParams;

  const event = await fetchParticipantEventBrochure(Number(eventId));

  if (!event.brochureImageUrl?.length) {
    redirect(
      from === "mission"
        ? getUserRoutes(eventId).detail
        : getUserRoutes(eventId).mission
    );
  }

  const cookieStore = await cookies();
  const showGuide = !cookieStore.has(`brochure-guide-seen-${eventId}`);

  return (
    <BrochureClient images={event.brochureImageUrl} showGuide={showGuide} />
  );
}
