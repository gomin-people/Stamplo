import { NextRequest, NextResponse } from "next/server";
import { ADMIN_EVENT_REGISTER_PATH } from "@/constants/adminRoutes";
import { getPriorityAdminEventId } from "@/utils/admin-event-redirect";
import { createSessionClient } from "@/utils/supabase/session-server";

const redirectToAdmin = (request: NextRequest) => {
  const redirectUrl = new URL("/admin", request.nextUrl.origin);

  return NextResponse.redirect(redirectUrl, { status: 303 });
};

export const POST = async (request: NextRequest) => {
  if (process.env.STAMPLY_TEST_LOGIN_ENABLED !== "true") {
    return redirectToAdmin(request);
  }

  const email = process.env.STAMPLY_TEST_LOGIN_EMAIL;
  const password = process.env.STAMPLY_TEST_LOGIN_PASSWORD;

  if (!email || !password) {
    return redirectToAdmin(request);
  }

  const supabase = await createSessionClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.error("Test login failed:", error);
    return redirectToAdmin(request);
  }

  const eventId = await getPriorityAdminEventId(supabase);
  const redirectPath =
    eventId != null
      ? `/admin/events/${eventId}/dashboard`
      : ADMIN_EVENT_REGISTER_PATH;

  return NextResponse.redirect(`${request.nextUrl.origin}${redirectPath}`, {
    status: 303,
  });
};
