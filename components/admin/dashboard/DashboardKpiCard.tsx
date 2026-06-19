"use client";

import { useCallback, useEffect, useRef } from "react";
import AnimatedNumber from "@/components/admin/common/AnimatedNumber";
import type {
  AnimatedIconComponent,
  AnimatedIconHandle,
} from "@/types/animated-icon";
import { cn, formatNumber } from "@/utils";

const KPI_ICON_ANIMATION_DURATION_MS = 900;

export type KpiIconComponent = AnimatedIconComponent;

type Props = {
  title: string;
  icon: KpiIconComponent;
  value: number;
  colorClassNames: {
    icon: string;
    value: string;
  };
  ready?: boolean;
};

const DashboardKpiCard = ({
  title,
  icon,
  value,
  colorClassNames,
  ready = true,
}: Props) => {
  const Icon = icon;
  const iconRef = useRef<AnimatedIconHandle>(null);
  const previousValueRef = useRef(value);
  const hasSeenReadyValueRef = useRef(false);
  const resetIconAnimationTimeoutRef = useRef<number | null>(null);

  const animateIcon = useCallback(() => {
    if (resetIconAnimationTimeoutRef.current !== null) {
      window.clearTimeout(resetIconAnimationTimeoutRef.current);
    }

    iconRef.current?.stopAnimation();
    window.requestAnimationFrame(() => {
      iconRef.current?.startAnimation();
    });

    resetIconAnimationTimeoutRef.current = window.setTimeout(() => {
      iconRef.current?.stopAnimation();
      resetIconAnimationTimeoutRef.current = null;
    }, KPI_ICON_ANIMATION_DURATION_MS);
  }, []);

  useEffect(() => {
    if (!ready) {
      return;
    }

    const previousValue = previousValueRef.current;

    if (!hasSeenReadyValueRef.current) {
      previousValueRef.current = value;
      hasSeenReadyValueRef.current = true;
      return;
    }

    if (value > previousValue) {
      animateIcon();
    }

    previousValueRef.current = value;
  }, [animateIcon, ready, value]);

  useEffect(() => {
    return () => {
      if (resetIconAnimationTimeoutRef.current !== null) {
        window.clearTimeout(resetIconAnimationTimeoutRef.current);
      }
    };
  }, []);

  return (
    <section
      aria-label={title}
      className="flex min-h-[5.5rem] min-w-0 items-center gap-3"
    >
      <div
        className={cn(
          "mx-1 flex size-12 shrink-0 items-center justify-center rounded-xl",
          colorClassNames.icon
        )}
      >
        <Icon
          ref={iconRef}
          size={24}
          animateOnHover={false}
          aria-hidden="true"
          className="flex size-6 shrink-0 items-center justify-center text-current [&_svg]:!h-6 [&_svg]:!w-6"
        />
      </div>
      <div className="flex min-w-0 flex-1 translate-y-0.5 flex-col gap-0.5">
        <div
          className="-translate-y-0.5 truncate text-sm leading-none font-medium text-gomin-neutral-500"
          title={title}
        >
          {title}
        </div>
        <div className="flex min-w-0 translate-y-1 items-baseline gap-1.5">
          <div
            className={cn(
              "min-w-0 whitespace-nowrap text-3xl leading-none font-semibold",
              colorClassNames.value
            )}
            title={`${formatNumber(value)}명`}
          >
            <span className="inline-block translate-y-0.5">
              <AnimatedNumber value={value} ready={ready} />
            </span>
          </div>
          <span className="text-base leading-none font-medium text-gomin-neutral-400">
            명
          </span>
        </div>
      </div>
    </section>
  );
};

export default DashboardKpiCard;
