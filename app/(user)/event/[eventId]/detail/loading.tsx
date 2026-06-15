import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="bg-white min-h-screen flex flex-col w-full max-w-md mx-auto relative select-none pt-14">
      <div className="px-6 mt-6">
        <Skeleton className="w-full aspect-3/4 rounded-[24px] bg-gomin-neutral-100" />
      </div>

      <div className="bg-gomin-neutral-100 rounded-t-[32px] p-6 flex flex-col gap-4.5 mt-6 flex-1">
        {/* 행사명 */}
        <div className="bg-white border border-gomin-neutral-200 rounded-[20px] p-5 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
          <Skeleton className="h-3 w-14 mb-2 bg-gomin-neutral-100" />
          <Skeleton className="h-5 w-48 bg-gomin-neutral-100" />
        </div>

        {/* 운영 기간 및 시간 */}
        <div className="bg-white border border-gomin-neutral-200 rounded-[20px] p-5 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
          <Skeleton className="h-3 w-20 mb-2 bg-gomin-neutral-100" />
          <Skeleton className="h-4 w-40 mb-1.5 bg-gomin-neutral-100" />
          <Skeleton className="h-4 w-32 bg-gomin-neutral-100" />
        </div>

        {/* 행사 장소 */}
        <div className="bg-white border border-gomin-neutral-200 rounded-[20px] p-5 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
          <Skeleton className="h-3 w-16 mb-2 bg-gomin-neutral-100" />
          <Skeleton className="h-4 w-36 bg-gomin-neutral-100" />
        </div>

        {/* 주최측 정보 */}
        <div className="bg-white border border-gomin-neutral-200 rounded-[20px] p-5 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
          <Skeleton className="h-3 w-16 mb-2 bg-gomin-neutral-100" />
          <Skeleton className="h-4 w-44 mb-1.5 bg-gomin-neutral-100" />
          <Skeleton className="h-4 w-32 bg-gomin-neutral-100" />
        </div>

        {/* 비고 */}
        <div className="bg-white border border-gomin-neutral-200 rounded-[20px] p-5 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
          <Skeleton className="h-3 w-8 mb-2 bg-gomin-neutral-100" />
          <Skeleton className="h-4 w-full mb-1.5 bg-gomin-neutral-100" />
          <Skeleton className="h-4 w-3/4 bg-gomin-neutral-100" />
        </div>
      </div>
    </div>
  );
}
