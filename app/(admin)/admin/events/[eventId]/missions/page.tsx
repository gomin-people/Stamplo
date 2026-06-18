import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { fetchAdminMissions } from "@/features/admin/missions/adminMissionApi";
import MissionClient from "@/components/admin/mission/MissionClient";
import { createSessionClient } from "@/utils/supabase/session-server";

export default async function MissionsPage({
  params,
}: {
  params: Promise<{ eventId: string }>;
}) {
  const eventId = await params.then(({ eventId }) => Number(eventId));

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["admin", "events", eventId, "missions"],
    queryFn: () => fetchAdminMissions(eventId),
  });

  const sessionSupabase = await createSessionClient();
  const { data: event, error: eventError } = await sessionSupabase
    .from("events")
    .select("start_date,end_date")
    .eq("id", eventId)
    .maybeSingle();

  if (eventError) {
    console.error("Error loading mission page event meta:", eventError);
    throw new Error("미션 관리 행사 정보를 불러오지 못했습니다.");
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <MissionClient
        eventId={eventId}
        eventStartDate={event?.start_date ?? null}
        eventEndDate={event?.end_date ?? null}
      />
    </HydrationBoundary>
  );
}
