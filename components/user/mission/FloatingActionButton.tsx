"use client";

import { ScanLine } from "lucide-react";
import ThemedButton from "@/components/user/common/ThemedButton";
import { cn } from "@/utils";

type FloatingActionButtonProps = {
  isAllCompleted?: boolean;
  onClick: () => void;
  label?: string;
  isPreview?: boolean;
  isRewardClaimed?: boolean;
  isLoading?: boolean;
  className?: string;
};

const FloatingActionButton = ({
  isAllCompleted = false,
  onClick,
  label,
  isPreview = false,
  isRewardClaimed = false,
  isLoading = false,
  className,
}: FloatingActionButtonProps) => {
  return (
    <div
      className={cn(
        isPreview ? "absolute" : "fixed",
        "bottom-6 left-1/2 -translate-x-1/2 w-full max-w-md px-6 z-50",
        className
      )}
    >
      <ThemedButton
        onClick={onClick}
        disabled={isRewardClaimed || isLoading}
        className={`w-full max-w-none disabled:bg-gomin-neutral-200 disabled:text-gomin-neutral-400 disabled:cursor-not-allowed disabled:pointer-events-none disabled:shadow-none`}
      >
        {isLoading ? (
          <div className="flex items-center justify-center gap-2">
            <span className="size-5 border-2 border-gomin-neutral-400 border-t-transparent rounded-full animate-spin" />
            <span>로딩 중...</span>
          </div>
        ) : label ? (
          <span>{label}</span>
        ) : isRewardClaimed ? (
          <span>리워드 수령 완료</span>
        ) : !isAllCompleted ? (
          <>
            <ScanLine className="w-5 h-5 stroke-[2.5]" />
            <span>QR 체크하기</span>
          </>
        ) : (
          <span>리워드 수령하기</span>
        )}
      </ThemedButton>
    </div>
  );
};

export default FloatingActionButton;
