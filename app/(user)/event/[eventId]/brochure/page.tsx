import { cookies } from "next/headers";
import { fetchParticipantEventBrochure } from "@/features/participant/events/participantEventApi";
import BrochureClient from "@/components/user/brochure/BrochureClient";
import { redirect } from "next/navigation";
import { getUserRoutes } from "@/constants/userRoutes";

type Props = {
  params: Promise<{ eventId: string }>;
};

export default async function BrochurePage({ params }: Props) {
  const { eventId } = await params;

  const event = await fetchParticipantEventBrochure(Number(eventId));

  if (!event.brochureImageUrl?.length) {
    redirect(getUserRoutes(eventId).mission);
  }

  const cookieStore = await cookies();
  const showGuide = !cookieStore.has(`brochure-guide-seen-${eventId}`);

  return (
    <BrochureClient images={event.brochureImageUrl} showGuide={showGuide} />
  );
}
