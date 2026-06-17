"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelectedEventId } from "@/stores/admin";
import { ADMIN_EVENT_REGISTER_PATH } from "@/constants/adminRoutes";

const AuthRedirect = () => {
  const router = useRouter();
  const selectedEventId = useSelectedEventId();

  useEffect(() => {
    if (selectedEventId) {
      router.replace(`/admin/events/${selectedEventId}/dashboard`);
    } else {
      router.replace(ADMIN_EVENT_REGISTER_PATH);
    }
  }, [router, selectedEventId]);

  return null;
};

export default AuthRedirect;
