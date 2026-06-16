"use client";

import { useMutation } from "@tanstack/react-query";
import { createJsonRequest, requestJson } from "@/features/shared/api/http";

type LoginPayload = {
  email: string;
  password: string;
};

type LoginResult = {
  success: boolean;
  redirectPath: string;
};

export function useAdminLoginMutation() {
  return useMutation({
    mutationFn: (payload: LoginPayload) =>
      requestJson<LoginResult>(
        "/api/v1/admin/login",
        createJsonRequest("POST", payload)
      ),
  });
}
