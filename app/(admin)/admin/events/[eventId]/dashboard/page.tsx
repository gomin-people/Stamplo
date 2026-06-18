import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import DashboardClient from "@/components/admin/dashboard/DashboardClient";
import { adminDashboardQueries } from "@/features/admin/dashboard/adminDashboardQueries";

export default async function DashboardPage({
  params,
}: {
  params: Promise<{ eventId: string }>;
}) {
  const eventId = await params.then(({ eventId }) => Number(eventId));
  const queryClient = new QueryClient();

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

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <DashboardClient eventId={eventId} />
    </HydrationBoundary>
  );
}
