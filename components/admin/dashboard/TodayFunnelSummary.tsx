"use client";

import { useCallback, useEffect, useRef } from "react";
import {
  CircleCheckBigIcon,
  HandHelpingIcon,
  StampIcon,
  UsersIcon,
} from "lucide-animated";
import AnimatedNumber from "@/components/admin/common/AnimatedNumber";
import { cn } from "@/utils";
import type {
  AnimatedIconComponent,
  AnimatedIconHandle,
} from "@/types/animated-icon";
import type { AdminDashboardTodayFunnel } from "@/types/admin-dashboard";

type Props = {
  funnel: AdminDashboardTodayFunnel;
  ready?: boolean;
};

// 오늘 참여자 퍼널 단계별 표시 메타데이터
const funnelStages: {
  key: "inProgress" | "unclaimed" | "claimed";
  label: string;
  icon: AnimatedIconComponent;
  colorClassNames: {
    badge: string;
    value: string;
  };
}[] = [
  {
    key: "inProgress",
    label: "진행 중",
    icon: StampIcon,
    colorClassNames: {
      badge: "bg-[#FFF3DB] text-[#F59E0B]",
      value: "text-[#F59E0B]",
    },
  },
  {
    key: "unclaimed",
    label: "완료 후 미수령",
    icon: CircleCheckBigIcon,
    colorClassNames: {
      badge: "bg-[#DDF7ED] text-[#20B486]",
      value: "text-[#20B486]",
    },
  },
  {
    key: "claimed",
    label: "수령 완료",
    icon: HandHelpingIcon,
    colorClassNames: {
      badge: "bg-[#F3EEFF] text-[#6D28D9]",
      value: "text-[#6D28D9]",
    },
  },
];

const KPI_ICON_ANIMATION_DURATION_MS = 900;

/**
 * 오늘 참여자의 상태별 분포 퍼널 요약 UI를 렌더링합니다.
 *
 * @param funnel - 오늘 참여자 퍼널 집계 데이터
 * @param ready - 실제 데이터 로딩 완료 여부
 */
const TodayFunnelSummary = ({ funnel, ready = true }: Props) => {
  const topIconRef = useRef<AnimatedIconHandle>(null);
  const stageIconRefs = useRef<
    Record<"inProgress" | "unclaimed" | "claimed", AnimatedIconHandle | null>
  >({
    inProgress: null,
    unclaimed: null,
    claimed: null,
  });
  const previousCountsRef = useRef({
    participants: funnel.participants,
    inProgress: funnel.inProgress.count,
    unclaimed: funnel.unclaimed.count,
    claimed: funnel.claimed.count,
  });
  const hasSeenReadyValueRef = useRef(false);
  const resetAnimationTimeoutsRef = useRef<number[]>([]);

  const animateIcon = useCallback((iconHandle: AnimatedIconHandle | null) => {
    if (!iconHandle) {
      return;
    }

    iconHandle.stopAnimation();
    window.requestAnimationFrame(() => {
      iconHandle.startAnimation();
    });

    const timeoutId = window.setTimeout(() => {
      iconHandle.stopAnimation();
      resetAnimationTimeoutsRef.current =
        resetAnimationTimeoutsRef.current.filter((id) => id !== timeoutId);
    }, KPI_ICON_ANIMATION_DURATION_MS);

    resetAnimationTimeoutsRef.current.push(timeoutId);
  }, []);

  const startHoverAnimation = useCallback(
    (iconHandle: AnimatedIconHandle | null) => {
      if (!iconHandle) {
        return;
      }

      iconHandle.startAnimation();
    },
    []
  );

  const stopHoverAnimation = useCallback(
    (iconHandle: AnimatedIconHandle | null) => {
      if (!iconHandle) {
        return;
      }

      iconHandle.stopAnimation();
    },
    []
  );

  useEffect(() => {
    if (!ready) {
      return;
    }

    if (!hasSeenReadyValueRef.current) {
      previousCountsRef.current = {
        participants: funnel.participants,
        inProgress: funnel.inProgress.count,
        unclaimed: funnel.unclaimed.count,
        claimed: funnel.claimed.count,
      };
      hasSeenReadyValueRef.current = true;
      return;
    }

    const previousCounts = previousCountsRef.current;

    if (funnel.participants > previousCounts.participants) {
      animateIcon(topIconRef.current);
    }

    if (funnel.inProgress.count > previousCounts.inProgress) {
      animateIcon(stageIconRefs.current.inProgress);
    }

    if (funnel.unclaimed.count > previousCounts.unclaimed) {
      animateIcon(stageIconRefs.current.unclaimed);
    }

    if (funnel.claimed.count > previousCounts.claimed) {
      animateIcon(stageIconRefs.current.claimed);
    }

    previousCountsRef.current = {
      participants: funnel.participants,
      inProgress: funnel.inProgress.count,
      unclaimed: funnel.unclaimed.count,
      claimed: funnel.claimed.count,
    };
  }, [animateIcon, funnel, ready]);

  useEffect(() => {
    return () => {
      for (const timeoutId of resetAnimationTimeoutsRef.current) {
        window.clearTimeout(timeoutId);
      }
    };
  }, []);

  return (
    <div className="flex h-full min-h-0 flex-col">
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 flex-wrap items-end gap-x-4 gap-y-1">
          <h2 className="text-lg font-semibold text-gomin-black">
            참여 상태 분포
          </h2>
          <p className="min-w-0 truncate text-sm font-medium text-gomin-neutral-400">
            오늘 참여자 중 각 참여자의 상태별 분포
          </p>
        </div>

        <div className="flex shrink-0 items-center gap-2 rounded-full bg-[#EEF4FF] px-3 py-1.5">
          <div
            className="flex shrink-0 items-center"
            onMouseEnter={() => startHoverAnimation(topIconRef.current)}
            onMouseLeave={() => stopHoverAnimation(topIconRef.current)}
          >
            <UsersIcon
              ref={topIconRef}
              size={20}
              animateOnHover={false}
              aria-hidden="true"
              className="flex size-5 shrink-0 items-center justify-center text-[#2563EB] [&_svg]:!h-5 [&_svg]:!w-5"
            />
          </div>
          <span className="text-sm font-medium text-gomin-neutral-500">
            오늘 참여자
          </span>
          <div className="flex items-baseline gap-1">
            <span className="translate-y-[0.05rem] text-sm leading-none font-semibold text-[#2563EB]">
              <AnimatedNumber value={funnel.participants} />
            </span>
            <span className="text-sm leading-none font-medium text-gomin-neutral-400">
              명
            </span>
          </div>
        </div>
      </div>

      <div className="flex min-h-0 flex-1 flex-col">
        <div className="grid grid-cols-3 gap-0">
          {funnelStages.map((stage, index) => {
            const Icon = stage.icon;
            const value = funnel[stage.key];

            return (
              <div
                key={stage.key}
                className={cn(
                  "relative min-w-0 px-3",
                  index !== 0 &&
                    "before:absolute before:top-[calc(50%+0.25rem)] before:left-0 before:h-12 before:-translate-y-1/2 before:border-l before:border-gomin-neutral-100 before:content-['']"
                )}
              >
                <div className="flex min-h-[5.5rem] min-w-0 translate-y-1 items-center gap-3">
                  <div
                    className={cn(
                      "mx-1 flex size-12 shrink-0 items-center justify-center rounded-xl",
                      stage.colorClassNames.badge
                    )}
                    onMouseEnter={() =>
                      startHoverAnimation(stageIconRefs.current[stage.key])
                    }
                    onMouseLeave={() =>
                      stopHoverAnimation(stageIconRefs.current[stage.key])
                    }
                  >
                    <Icon
                      ref={(iconHandle) => {
                        stageIconRefs.current[stage.key] = iconHandle;
                      }}
                      size={24}
                      animateOnHover={false}
                      aria-hidden="true"
                      className="flex size-6 shrink-0 items-center justify-center text-current [&_svg]:!h-6 [&_svg]:!w-6"
                    />
                  </div>

                  <div className="flex min-w-0 flex-1 translate-y-0.5 flex-col gap-0.5">
                    <div className="-translate-y-0.5 truncate text-sm leading-none font-medium text-gomin-neutral-500">
                      {stage.label}
                    </div>
                    <div
                      className={cn(
                        "flex min-w-0 translate-y-1 items-baseline gap-1.5",
                        stage.colorClassNames.value
                      )}
                    >
                      <span className="min-w-0 whitespace-nowrap text-3xl leading-none font-semibold">
                        <span className="inline-block translate-y-0.5">
                          <AnimatedNumber value={value.count} ready={ready} />
                        </span>
                      </span>
                      <span className="text-base leading-none font-medium text-gomin-neutral-400">
                        명
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TodayFunnelSummary;
