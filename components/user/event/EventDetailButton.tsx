"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { FileText } from "lucide-react";
import { cn } from "@/utils";
import { Button } from "@/components/ui/button";
import EventDetailModal from "@/components/user/event/EventDetailModal";

type EventDetailButtonProps = {
  className?: string;
};

const EventDetailButton = ({ className }: EventDetailButtonProps) => {
  const { eventId } = useParams<{ eventId: string }>();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        variant="outline"
        className={cn(
          "gap-1.5 px-4 h-9 rounded-full border-2 border-gomin-neutral-200 bg-gomin-white/70 backdrop-blur-md text-gomin-neutral-700 hover:bg-gomin-white hover:text-gomin-neutral-600 shadow-[0_4px_12px_rgba(0,0,0,0.08)]",
          className
        )}
        aria-label="행사 정보"
      >
        <FileText className="w-4 h-4" />
        <span className="text-[13px] font-nanum font-extrabold">행사정보</span>
      </Button>
      <EventDetailModal
        eventId={eventId}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </>
  );
};

export default EventDetailButton;
