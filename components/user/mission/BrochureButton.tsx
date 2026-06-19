"use client";

import { FileText } from "lucide-react";
import { cn } from "@/utils";
import { Button } from "@/components/ui/button";

type BrochureButtonProps = {
  onClick: () => void;
  className?: string;
};

const BrochureButton = ({ onClick, className }: BrochureButtonProps) => {
  return (
    <Button
      onClick={onClick}
      variant="outline"
      className={cn(
        "gap-1.5 px-4 h-9 rounded-full border-2 bg-white/80 backdrop-blur-md hover:bg-white shadow-[0_4px_12px_rgba(0,0,0,0.08)] border-gomin-primary-700 text-gomin-primary-700 hover:text-gomin-primary-600",
        className
      )}
      aria-label="행사 정보"
    >
      <FileText className="w-4 h-4" />
      <span className="text-[13px] font-nanum font-extrabold">행사정보</span>
    </Button>
  );
};

// const BrochureButton = ({ onClick, className }: BrochureButtonProps) => {
//   return (
//     <button
//       onClick={onClick}
//       className={cn(
//         "flex items-center justify-center w-11 h-11 text-gomin-primary-700 active:scale-95 transition-all duration-200",
//         className
//       )}
//       aria-label="행사 정보"
//     >
//       <Info className="w-8.5 h-8.5" />
//     </button>
//   );
// };

export default BrochureButton;
