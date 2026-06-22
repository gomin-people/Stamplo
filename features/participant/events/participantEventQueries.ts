import { queryOptions } from "@tanstack/react-query";
import { fetchParticipantEvent } from "@/features/participant/events/participantEventApi";

export const participantEventQueries = {
  all: () => ["participant", "event"] as const,
  detail: (eventId: number) =>
    queryOptions({
      queryKey: [...participantEventQueries.all(), "detail", eventId] as const,
      queryFn: () => fetchParticipantEvent(eventId),
      enabled: eventId > 0,
    }),
};
