import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/utils";

export default function Loading() {
  return (
    <div className="px-8 pt-0">
      <div className="mt-8 grid grid-cols-12 gap-4">
        {/* 참여 상태 분포 카드 */}
        <section className="col-span-7 overflow-hidden rounded-xl border border-gomin-neutral-100 bg-white px-4 pt-4 pb-2 shadow-[0_8px_32px_rgba(15,23,42,0.06)]">
          <div className="flex h-full min-h-0 flex-col">
            <div className="flex items-start justify-between gap-3 pb-2">
              <div className="flex min-w-0 flex-1 flex-wrap items-end gap-x-4 gap-y-1">
                <Skeleton className="h-6 w-28 bg-gomin-neutral-100" />
                <Skeleton className="h-4 w-56 bg-gomin-neutral-100" />
              </div>

              <Skeleton className="h-7 w-40 rounded-full bg-gomin-neutral-100" />
            </div>

            <div className="flex min-h-0 flex-1 flex-col">
              <div className="grid grid-cols-3 gap-0">
                {Array.from({ length: 3 }, (_, index) => (
                  <div
                    key={index}
                    className={cn(
                      index === 0
                        ? "px-3"
                        : "relative px-3 before:absolute before:top-1/2 before:left-0 before:h-12 before:-translate-y-1/2 before:border-l before:border-gomin-neutral-100 before:content-['']"
                    )}
                  >
                    <div className="flex min-h-[5rem] min-w-0 items-center gap-3">
                      <Skeleton className="mx-1 size-12 rounded-xl bg-gomin-neutral-100" />
                      <div className="flex min-w-0 flex-1 flex-col gap-2 pt-2">
                        <Skeleton className="h-4 w-16 bg-gomin-neutral-100" />
                        <Skeleton className="h-8 w-[4.75rem] bg-gomin-neutral-100" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 누적 현황 카드 */}
        <section className="col-span-5 rounded-xl border border-gomin-neutral-100 bg-white px-4 pt-4 pb-2 shadow-[0_8px_32px_rgba(15,23,42,0.06)]">
          <div className="flex min-w-0 flex-wrap items-end gap-x-4 gap-y-1">
            <Skeleton className="h-6 w-17 bg-gomin-neutral-100" />
            <Skeleton className="h-4 w-22 bg-gomin-neutral-100" />
          </div>

          <div className="grid grid-cols-2">
            {Array.from({ length: 2 }, (_, index) => (
              <div
                key={index}
                className={cn(
                  index === 0
                    ? "relative pr-4 after:absolute after:top-1/2 after:right-0 after:h-12 after:-translate-y-1/2 after:border-r after:border-gomin-neutral-100 after:content-['']"
                    : "pl-4"
                )}
              >
                <div className="flex min-h-[5rem] min-w-0 translate-y-1 items-center gap-3">
                  <Skeleton className="mx-1 size-12 rounded-xl bg-gomin-neutral-100" />
                  <div className="flex min-w-0 flex-1 flex-col gap-2">
                    <Skeleton className="h-4 w-21 bg-gomin-neutral-100" />
                    <Skeleton className="h-8 w-[4.5rem] bg-gomin-neutral-100" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      <div className="mt-4 grid grid-cols-12 gap-4">
        <div className="col-span-8 flex min-w-0 flex-col gap-4">
          {/* 참여자 수 분석 카드 */}
          <section className="overflow-hidden rounded-xl border border-gomin-neutral-100 bg-white">
            <div className="flex h-full min-h-[21.25rem] min-w-0 flex-col pl-4 pr-3 pt-4 pb-4">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="flex min-w-0 flex-1 flex-wrap items-end gap-x-4 gap-y-1">
                  <Skeleton className="h-6 w-27 bg-gomin-neutral-100" />
                  <Skeleton className="h-4 w-38 bg-gomin-neutral-100" />
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  <Skeleton className="h-9 w-[150px] rounded-lg bg-gomin-neutral-100" />
                </div>
              </div>

              <div className="mt-4 min-h-0 flex-1" />
            </div>
          </section>

          {/* 달성자 통계 카드 */}
          <section className="overflow-hidden rounded-xl border border-gomin-neutral-100 bg-white">
            <div className="flex h-full min-h-74.5 min-w-0 flex-col px-4 pt-4 pb-4">
              <div className="flex min-w-0 flex-wrap items-end gap-x-4 gap-y-1">
                <Skeleton className="h-6 w-22 bg-gomin-neutral-100" />
                <Skeleton className="h-4 w-39 bg-gomin-neutral-100" />
              </div>

              <div className="mt-4 min-h-0 flex-1" />
            </div>
          </section>
        </div>

        <div className="col-span-4 flex min-w-0 flex-col gap-4">
          {/* 미션별 완료 현황 카드 */}
          <section className="overflow-visible rounded-xl border border-gomin-neutral-100 bg-white">
            <div className="flex h-full min-h-[41rem] min-w-0 flex-col px-4 pt-4">
              <div className="flex min-w-0 flex-wrap items-end gap-x-4 gap-y-1">
                <Skeleton className="h-6 w-32 bg-gomin-neutral-100" />
                <Skeleton className="h-4 w-32 bg-gomin-neutral-100" />
              </div>

              <div className="mt-5 grid grid-cols-[minmax(0,14rem)_minmax(0,4.25rem)_minmax(0,1fr)_minmax(4.5rem,5.75rem)] items-center gap-x-2 border-b border-gomin-neutral-100 pb-8" />

              <div className="min-h-0 min-w-0">
                {Array.from({ length: 8 }, (_, index) => (
                  <div
                    key={index}
                    className="grid min-h-14 grid-cols-[minmax(0,14rem)_minmax(0,4.25rem)_minmax(0,1fr)_minmax(4.5rem,5.75rem)] items-center gap-x-2 border-b border-dashed border-gomin-neutral-100"
                  >
                    <Skeleton className="h-4 w-32 bg-gomin-neutral-100" />
                    <Skeleton className="ml-auto h-4 w-10 bg-gomin-neutral-100" />
                    <div />
                    <div className="flex flex-col items-end gap-2">
                      <Skeleton className="h-4 w-12 bg-gomin-neutral-100" />
                      <Skeleton className="h-1.5 w-full rounded-full bg-gomin-neutral-100" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
