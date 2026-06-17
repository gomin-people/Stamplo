import { Separator } from "@/components/ui/separator";
import LogoutButton from "@/components/admin/common/LogoutButton";
import type { AdminUserModel } from "@/types/models";

type Props = {
  user: AdminUserModel;
};

const AdminUserInfo = ({ user }: Props) => {
  return (
    <div>
      <Separator className="mb-4 bg-gomin-neutral-100" />
      <div className="flex items-center gap-2.5 p-2">
        <div className="w-9 h-9 rounded-full bg-[#F4748A] flex items-center justify-center shrink-0">
          <span className="text-sm text-white">{user.name[0]}</span>
        </div>

        <div className="flex-1 min-w-0">
          <p className="text-sm text-gomin-black">{user.name}</p>
        </div>

        <LogoutButton />
      </div>
    </div>
  );
};

export default AdminUserInfo;
