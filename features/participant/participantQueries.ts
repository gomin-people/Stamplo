import { queryOptions } from "@tanstack/react-query";
import { requestJson } from "@/features/shared/api/http";
import { type ParticipantModel } from "@/types/models";

type ParticipantState = {
  participant: ParticipantModel;
};

function getParticipant() {
  return requestJson<ParticipantState>("/api/v1/participant");
}

export const participantQueries = {
  all: () => ["participant"] as const,
  state: () =>
    queryOptions({
      queryKey: [...participantQueries.all(), "state"] as const,
      queryFn: getParticipant,
    }),
};
