import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import DashboardClient from "@/components/admin/dashboard/DashboardClient";
import DashboardUpcomingState from "@/components/admin/dashboard/DashboardUpcomingState";
import { adminDashboardQueries } from "@/features/admin/dashboard/adminDashboardQueries";
import { getEventOperationStatus } from "@/utils/event-status";
import { createSessionClient } from "@/utils/supabase/session-server";

const getDashboardEventMeta = async (eventId: number) => {
  const sessionSupabase = await createSessionClient();
  const { data: event, error } = await sessionSupabase
    .from("events")
    .select("start_date,end_date")
    .eq("id", eventId)
    .maybeSingle();

  if (error) {
    console.error("Error loading dashboard page event meta:", error);
    throw new Error("대시보드 행사 정보를 불러오지 못했습니다.");
  }

  return event;
};

const prefetchDashboardData = async (
  queryClient: QueryClient,
  eventId: number
) => {
  await Promise.all([
    queryClient.prefetchQuery(adminDashboardQueries.kpis(eventId)),
    queryClient.prefetchQuery(
      adminDashboardQueries.participantAnalysis(eventId)
    ),
    queryClient.prefetchQuery(
      adminDashboardQueries.achieverStatistics(eventId)
    ),
    queryClient.prefetchQuery(adminDashboardQueries.missions(eventId)),
  ]);
};

const DashboardPage = async ({
  params,
}: {
  params: Promise<{ eventId: string }>;
}) => {
  const eventId = await params.then(({ eventId }) => Number(eventId));
  const event = await getDashboardEventMeta(eventId);

  const isUpcoming =
    typeof event?.start_date === "string" &&
    typeof event?.end_date === "string" &&
    getEventOperationStatus(event.start_date, event.end_date).isBefore;

  if (isUpcoming) {
    return <DashboardUpcomingState />;
  }

  const queryClient = new QueryClient();
  await prefetchDashboardData(queryClient, eventId);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <DashboardClient eventId={eventId} />
    </HydrationBoundary>
  );
};

export default DashboardPage;
