"use client";

import { Newspaper } from "lucide-react";
import { cn } from "@/utils";

type BrochureButtonProps = {
  onClick: () => void;
  className?: string;
};

const BrochureButton = ({ onClick, className }: BrochureButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex items-center justify-center w-11 h-11 shrink-0 rounded-full border-2 border-gomin-primary-700 bg-gomin-white text-gomin-primary-700 hover:bg-gomin-primary-100/50 active:scale-95 transition-all duration-200 shadow-md",
        className
      )}
      aria-label="행사 안내 보기"
    >
      <Newspaper className="w-5 h-5" />
    </button>
  );
};

export default BrochureButton;
