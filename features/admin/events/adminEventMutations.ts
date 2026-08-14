"use client";

import { useMutation } from "@tanstack/react-query";
import { createJsonRequest, requestJson } from "@/features/shared/api/http";
import { toSnakeKeys } from "@/utils/case";
import {
  type EventCreatePayloadModel,
  type EventUpdatePayloadModel,
  type QrCodeModel,
  type EventModel,
} from "@/types/models";

// 행사 생성 응답 타입
type CreatedEvent = EventModel & {
  qrCodes: QrCodeModel[];
};

// 행사 수정 mutation 요청 변수 타입
type UpdateEventVariables = {
  eventId: number;
  payload: EventUpdatePayloadModel;
};

function createAdminEvent(payload: EventCreatePayloadModel) {
  return requestJson<CreatedEvent>(
    "/api/v1/admin/events",
    createJsonRequest("POST", toSnakeKeys(payload))
  );
}

function updateAdminEvent(eventId: number, payload: EventUpdatePayloadModel) {
  return requestJson<EventModel>(
    `/api/v1/admin/events/${eventId}`,
    createJsonRequest("PATCH", toSnakeKeys(payload))
  );
}

type DeletedEvent = {
  id: number;
  nextEventId: number | null;
};

function deleteAdminEvent(eventId: number) {
  return requestJson<DeletedEvent>(
    `/api/v1/admin/events/${eventId}`,
    createJsonRequest("DELETE")
  );
}

/**
 * 어드민 행사 생성 mutation입니다.
 *
 * @returns React Query 행사 생성 mutation
 */
export function useCreateEventMutation() {
  return useMutation({
    mutationFn: createAdminEvent,
  });
}

/**
 * 어드민 행사 수정 mutation입니다.
 *
 * @returns React Query 행사 수정 mutation
 */
export function useUpdateEventMutation() {
  return useMutation({
    mutationFn: ({ eventId, payload }: UpdateEventVariables) =>
      updateAdminEvent(eventId, payload),
  });
}

/**
 * 어드민 행사 삭제 mutation입니다.
 *
 * @returns React Query 행사 삭제 mutation
 */
export function useDeleteEventMutation() {
  return useMutation({
    mutationFn: deleteAdminEvent,
  });
}
