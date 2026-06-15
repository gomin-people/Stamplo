// 참여자 설문(survey) 관련 React Query key 모음
export const participantSurveyQueryKeys = {
  all: ["participant"] as const,
  survey: ["participant", "survey"] as const,
  missions: ["participant", "missions"] as const,
};
