import { redirect } from "next/navigation";
import Footer from "@/components/admin/common/Footer";
import Header from "@/components/admin/common/Header";
import Sidebar from "@/components/admin/common/Sidebar";
import type { AdminUserModel } from "@/types/models";
import { getPriorityAdminEventId } from "@/utils/admin-event-redirect";
import { createSessionClient } from "@/utils/supabase/session-server";

export default async function AdminEventRegisterLayout({
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

  const cancelTargetEventId = await getPriorityAdminEventId(supabase);
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
        events={[]}
        user={adminUser}
        cancelTargetEventId={
          cancelTargetEventId != null ? String(cancelTargetEventId) : null
        }
      />
      <div className="min-h-0 min-w-0 flex-1 overflow-y-auto bg-gomin-admin-surface">
        <Header events={[]} />
        <main>{children}</main>
        <Footer />
      </div>
    </div>
  );
}
