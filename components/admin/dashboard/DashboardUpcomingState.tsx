import Image from "next/image";

const DashboardUpcomingState = () => {
  return (
    <div className="flex min-h-[calc(100vh-12rem)] flex-col items-center justify-center px-8 py-12 text-center">
      <Image
        src="/images/admin/dashboard/dashboard-upcoming-empty-state.png"
        alt="행사 시작 전 대시보드 안내 일러스트"
        width={360}
        height={360}
        className="h-auto w-full max-w-[300px]"
        priority
      />
      <p className="mt-6 text-lg font-semibold text-gomin-black">
        이 행사는 아직 시작 전이에요
      </p>
      <p className="mt-2 text-sm font-medium text-gomin-neutral-500">
        행사가 시작되면 대시보드에서 현황을 확인하실 수 있어요.
      </p>
    </div>
  );
};

export default DashboardUpcomingState;
