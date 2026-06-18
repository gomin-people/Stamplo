import { createServerClient } from "@supabase/ssr";
import { NextRequest, NextResponse, userAgent } from "next/server";
import { PARTICIPANT_COOKIE_NAME } from "@/utils/api";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  let response = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => request.cookies.getAll(),
        setAll: (cookiesToSet) => {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          response = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  await supabase.auth.getUser();

  if (pathname.startsWith("/admin")) {
    const { device } = userAgent(request);
    if (device.type === "mobile" || device.type === "tablet") {
      return NextResponse.redirect(new URL("/admin-unavailable", request.url));
    }
  }

  if (pathname.match(/^\/event\/[^/]+($|\/(brochure|detail))/)) {
    const participantCookie = request.cookies.get(PARTICIPANT_COOKIE_NAME);
    if (!participantCookie) {
      return NextResponse.redirect(new URL("/qr-required", request.url));
    }
  }

  return response;
}

export const config = {
  matcher: [
    "/admin",
    "/admin/:path*",
    "/event/:eventId",
    "/event/:eventId/brochure",
    "/event/:eventId/detail",
  ],
};
