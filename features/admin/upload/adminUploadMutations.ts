"use client";

import { useMutation } from "@tanstack/react-query";
import { ApiError } from "@/features/shared/api/http";

type UploadResult = { url: string; path: string };

export async function uploadAdminImage(
  file: File,
  options?: { width?: number }
): Promise<UploadResult> {
  const formData = new FormData();
  formData.append("file", file);
  if (options?.width) formData.append("width", String(options.width));

  const response = await fetch("/api/v1/admin/upload", {
    method: "POST",
    body: formData,
    credentials: "include",
  });

  const body = await response.json();

  if (!response.ok) {
    throw new ApiError(
      body?.message ?? "이미지 업로드 실패",
      response.status,
      body
    );
  }

  return body as UploadResult;
}

export function useUploadAdminImageMutation(options?: { width?: number }) {
  return useMutation({
    mutationFn: (file: File) => uploadAdminImage(file, options),
  });
}

export function useDeleteAdminImageMutation() {
  return useMutation({
    mutationFn: async (path: string): Promise<void> => {
      const response = await fetch("/api/v1/admin/upload", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ path }),
        credentials: "include",
      });

      if (!response.ok) {
        const body = await response.json();
        throw new ApiError(
          body?.message ?? "이미지 삭제 실패",
          response.status,
          body
        );
      }
    },
  });
}
