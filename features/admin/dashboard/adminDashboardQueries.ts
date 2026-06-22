import { queryOptions } from "@tanstack/react-query";
import {
  fetchAdminDashboardAchieverStatistics,
  fetchAdminDashboardKpis,
  fetchAdminDashboardMissions,
  fetchAdminDashboardParticipantAnalysis,
} from "./adminDashboardApi";

const STALE_TIME = 60_000;

export const adminDashboardQueries = {
  all: (eventId: number) => ["admin", "events", eventId, "dashboard"] as const,
  kpis: (eventId: number) =>
    queryOptions({
      queryKey: [...adminDashboardQueries.all(eventId), "kpis"] as const,
      queryFn: () => fetchAdminDashboardKpis(eventId),
      staleTime: STALE_TIME,
      refetchOnWindowFocus: false,
    }),
  participantAnalysis: (eventId: number) =>
    queryOptions({
      queryKey: [
        ...adminDashboardQueries.all(eventId),
        "participant-analysis",
      ] as const,
      queryFn: () => fetchAdminDashboardParticipantAnalysis(eventId),
      staleTime: STALE_TIME,
      refetchOnWindowFocus: false,
    }),
  achieverStatistics: (eventId: number) =>
    queryOptions({
      queryKey: [
        ...adminDashboardQueries.all(eventId),
        "achiever-statistics",
      ] as const,
      queryFn: () => fetchAdminDashboardAchieverStatistics(eventId),
      staleTime: STALE_TIME,
      refetchOnWindowFocus: false,
    }),
  missions: (eventId: number) =>
    queryOptions({
      queryKey: [...adminDashboardQueries.all(eventId), "missions"] as const,
      queryFn: () => fetchAdminDashboardMissions(eventId),
      staleTime: STALE_TIME,
      refetchOnWindowFocus: false,
    }),
};
