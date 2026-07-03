import { notFound, redirect } from "next/navigation";
import Footer from "@/components/admin/common/Footer";
import Header from "@/components/admin/common/Header";
import Sidebar from "@/components/admin/common/Sidebar";
import type { AdminUserModel, EventModel } from "@/types/models";
import { toCamelKeys } from "@/utils/case";
import { createSessionClient } from "@/utils/supabase/session-server";

type AdminEventLayoutProps = {
  children: React.ReactNode;
  params: Promise<{
    eventId: string;
  }>;
};

const parseEventId = (value: string) => {
  const parsed = Number(value);

  return Number.isInteger(parsed) && parsed > 0 ? parsed : null;
};

export default async function AdminEventLayout({
  children,
  params,
}: AdminEventLayoutProps) {
  const { eventId: eventIdParam } = await params;
  const eventId = parseEventId(eventIdParam);

  if (eventId === null) {
    notFound();
  }

  const supabase = await createSessionClient();
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    redirect("/admin");
  }

  const { data: events, error: eventsError } = await supabase
    .from("events")
    .select("id,title,start_date,end_date")
    .order("created_at", { ascending: false })
    .order("id", { ascending: false });

  if (eventsError) {
    console.error("Error loading admin event layout data:", eventsError);
    throw new Error("관리자 행사 목록 조회에 실패했습니다.");
  }

  const eventList = toCamelKeys(events ?? []) as EventModel[];
  const currentEvent = eventList.find((event) => event.id === eventId);

  if (!currentEvent) {
    notFound();
  }
  const adminUser: AdminUserModel = {
    id: user.id,
    name:
      typeof user.user_metadata?.name === "string"
        ? user.user_metadata.name
        : (user.email ?? "관리자"),
  };

  return (
    <div className="flex h-screen overflow-hidden bg-gomin-neutral-100">
      <Sidebar
        events={eventList}
        user={adminUser}
        currentEvent={currentEvent}
      />
      <div className="min-h-0 min-w-0 flex-1 overflow-y-auto bg-gomin-admin-surface">
        <Header events={eventList} currentEvent={currentEvent} />
        <main>{children}</main>
        <Footer />
      </div>
    </div>
  );
}
