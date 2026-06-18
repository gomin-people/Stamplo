import { redirect } from "next/navigation";
import Footer from "@/components/admin/common/Footer";
import Header from "@/components/admin/common/Header";
import Sidebar from "@/components/admin/common/Sidebar";
import type { AdminUserModel, EventModel } from "@/types/models";
import { toCamelKeys } from "@/utils/case";
import { createSessionClient } from "@/utils/supabase/session-server";

export default async function AdminEventsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
    .select("*")
    .order("created_at", { ascending: false })
    .order("id", { ascending: false });

  if (eventsError) {
    console.error("Error loading admin events layout data:", eventsError);
    throw new Error("관리자 행사 목록 조회에 실패했습니다.");
  }

  const normalizedEvents = toCamelKeys(events ?? []) as EventModel[];
  const adminUser: AdminUserModel = {
    id: user.id,
    name:
      typeof user.user_metadata?.name === "string"
        ? user.user_metadata.name
        : (user.email ?? "관리자"),
  };

  return (
    <div className="flex h-screen overflow-hidden bg-gomin-neutral-100">
      <Sidebar events={normalizedEvents} user={adminUser} />
      <div className="min-h-0 min-w-0 flex-1 overflow-y-auto">
        <Header events={normalizedEvents} />
        <main>{children}</main>
        <Footer />
      </div>
    </div>
  );
}
