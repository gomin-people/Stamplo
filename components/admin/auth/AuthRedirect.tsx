import { redirect } from "next/navigation";
import { ADMIN_EVENT_REGISTER_PATH } from "@/constants/adminRoutes";
import { getPriorityAdminEventId } from "@/utils/admin-event-redirect";
import { createSessionClient } from "@/utils/supabase/session-server";

export default async function AuthRedirect() {
  const supabase = await createSessionClient();
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    await supabase.auth.signOut();
    redirect("/admin");
  }

  const eventId = await getPriorityAdminEventId(supabase);

  if (eventId != null) {
    redirect(`/admin/events/${eventId}/dashboard`);
  }

  redirect(ADMIN_EVENT_REGISTER_PATH);

  return null;
}
