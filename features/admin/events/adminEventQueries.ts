import { queryOptions } from "@tanstack/react-query";
import { requestJson } from "@/features/shared/api/http";
import { fetchAdminEvent } from "@/features/admin/events/adminEventApi";
import { type MissionModel, type EventModel } from "@/types/models";

type EventDashboard = {
  event: EventModel;
  summary: {
    missionCount: number;
    activeMissionCount: number;
    participantCount: number;
    completionCount: number;
    rewardClaimedCount: number;
    completionRate: number;
  };
  missions: Array<
    Pick<MissionModel, "id" | "title" | "sortOrder" | "isActive"> & {
      completedCount: number;
    }
  >;
};

function getAdminEvents() {
  return requestJson<EventModel[]>("/api/v1/admin/events");
}

function getEventDashboard(eventId: number) {
  return requestJson<EventDashboard>(
    `/api/v1/admin/events/${eventId}/dashboard`
  );
}

export const adminEventQueries = {
  all: () => ["admin", "events"] as const,
  list: () =>
    queryOptions({
      queryKey: [...adminEventQueries.all(), "list"] as const,
      queryFn: getAdminEvents,
    }),
  detail: (eventId: number) =>
    queryOptions({
      queryKey: [...adminEventQueries.all(), "detail", eventId] as const,
      queryFn: () => fetchAdminEvent(eventId),
      enabled: eventId > 0,
    }),
  dashboard: (eventId: number) =>
    queryOptions({
      queryKey: [...adminEventQueries.all(), "dashboard", eventId] as const,
      queryFn: () => getEventDashboard(eventId),
      enabled: eventId > 0,
    }),
};
