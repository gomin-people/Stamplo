const EventDetailModalSkeleton = () => {
  return (
    <div className="bg-gomin-primary-100 pt-13 px-4 pb-4 flex flex-col gap-3">
      {/* 행사명 */}
      <div className="bg-white border border-gomin-primary-200 rounded-[20px] p-5 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
        <div className="h-3 w-16 rounded-full bg-gomin-neutral-100 animate-pulse mb-3" />
        <div className="h-5 w-40 rounded-lg bg-gomin-neutral-100 animate-pulse" />
      </div>

      {/* 운영 기간 및 시간 */}
      <div className="bg-white border border-gomin-primary-200 rounded-[20px] p-5 shadow-[0_2px_8px_rgba(0,0,0,0.04)] h-[146px]">
        <div className="h-3 w-24 rounded-full bg-gomin-neutral-100 animate-pulse mb-3" />
        <div className="flex flex-col gap-2">
          <div className="h-4 w-48 rounded-lg bg-gomin-neutral-100 animate-pulse" />
          <div className="h-4 w-48 rounded-lg bg-gomin-neutral-100 animate-pulse" />
          <div className="h-4 w-36 rounded-lg bg-gomin-neutral-100 animate-pulse" />
        </div>
      </div>

      {/* 행사 장소 */}
      <div className="bg-white border border-gomin-primary-200 rounded-[20px] p-5 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
        <div className="h-3 w-16 rounded-full bg-gomin-neutral-100 animate-pulse mb-3" />
        <div className="h-5 w-32 rounded-lg bg-gomin-neutral-100 animate-pulse" />
      </div>

      {/* 주최측 정보 */}
      <div className="bg-white border border-gomin-primary-200 rounded-[20px] p-5 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
        <div className="h-3 w-20 rounded-full bg-gomin-neutral-100 animate-pulse mb-3" />
        <div className="h-5 w-28 rounded-lg bg-gomin-neutral-100 animate-pulse" />
      </div>

      {/* 비고 */}
      <div className="bg-white border border-gomin-primary-200 rounded-[20px] p-5 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
        <div className="h-3 w-10 rounded-full bg-gomin-neutral-100 animate-pulse mb-3" />
        <div className="flex flex-col gap-2">
          <div className="h-4 w-full rounded-lg bg-gomin-neutral-100 animate-pulse" />
          <div className="h-4 w-3/4 rounded-lg bg-gomin-neutral-100 animate-pulse" />
        </div>
      </div>
    </div>
  );
};

export default EventDetailModalSkeleton;
