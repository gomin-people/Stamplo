import { redirect } from "next/navigation";
import { ADMIN_EVENT_REGISTER_PATH } from "@/constants/adminRoutes";
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

  const { data: eventId, error: eventsError } = await supabase.rpc(
    "get_priority_admin_event_id"
  );

  if (eventsError) {
    console.error("Error fetching priority admin event:", eventsError);
    redirect("/admin");
  }

  if (eventId != null) {
    redirect(`/admin/events/${eventId}/dashboard`);
  }

  redirect(ADMIN_EVENT_REGISTER_PATH);
}
