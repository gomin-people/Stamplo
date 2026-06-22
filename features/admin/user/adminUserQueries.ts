import { queryOptions } from "@tanstack/react-query";
import { resolveRequest, requestJson } from "@/features/shared/api/http";
import type { AdminUserModel } from "@/types/models";

export async function fetchAdminUser(): Promise<AdminUserModel> {
  const { url, init } = await resolveRequest("/api/v1/admin/user");
  return requestJson<AdminUserModel>(url, init);
}

export const adminUserQueries = {
  all: () => ["adminUser"] as const,
  me: () =>
    queryOptions({
      queryKey: adminUserQueries.all(),
      queryFn: fetchAdminUser,
    }),
};
