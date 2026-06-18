import { queryOptions } from "@tanstack/react-query";
import { requestJson } from "@/features/shared/api/http";
import { type ParticipantModel } from "@/types/models";

type ParticipantSurvey = Pick<
  ParticipantModel,
  "gender" | "ageRange" | "isRewardClaimed"
>;

function getParticipantSurvey() {
  return requestJson<ParticipantSurvey>("/api/v1/participant/survey");
}

export const participantSurveyQueries = {
  all: () => ["participant"] as const,
  survey: () =>
    queryOptions({
      queryKey: [...participantSurveyQueries.all(), "survey"] as const,
      queryFn: getParticipantSurvey,
    }),
};
