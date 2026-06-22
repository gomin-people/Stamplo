import { useMutation } from "@tanstack/react-query";
import { requestJson, createJsonRequest } from "@/features/shared/api/http";

function postAdminLogout() {
  return requestJson("/api/v1/admin/logout", createJsonRequest("POST"));
}

export function useAdminLogoutMutation() {
  return useMutation({
    mutationFn: postAdminLogout,
  });
}
