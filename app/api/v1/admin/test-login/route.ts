import { NextRequest, NextResponse } from "next/server";
import { getAdminLoginRedirectPath } from "@/utils/adminLoginRedirect";
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

  const redirectPath = await getAdminLoginRedirectPath(supabase);

  return NextResponse.redirect(`${request.nextUrl.origin}${redirectPath}`, {
    status: 303,
  });
};
