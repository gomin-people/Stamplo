"use client";

import { X } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogClose,
  DialogTitle,
} from "@/components/ui/dialog";
import { Dialog as DialogPrimitive } from "radix-ui";
import { participantEventQueries } from "@/features/participant/events/participantEventQueries";
import EventDetailContent from "@/components/user/event/EventDetailContent";
import EventDetailModalSkeleton from "@/components/user/event/EventDetailModalSkeleton";
import { cn } from "@/utils";
import { useModalHistoryBack } from "@/hooks/useModalHistoryBack";

type DetailProps = {
  eventId: string;
  isOpen: boolean;
  onClose: () => void;
};

const EventDetailModal = ({ eventId, isOpen, onClose }: DetailProps) => {
  useModalHistoryBack(isOpen, onClose);
  const { data: event } = useQuery({
    ...participantEventQueries.detail(Number(eventId)),
    enabled: isOpen,
    staleTime: 300_000,
  });

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <DialogPortal>
        <DialogOverlay className="bg-black/10 backdrop-blur-xs" />
        <DialogTitle className="hidden" />
        <DialogPrimitive.Content
          data-slot="dialog-content"
          className={cn(
            "fixed top-14 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-3rem)] max-w-sm h-[70vh] rounded-[24px] bg-gomin-primary-100 overflow-hidden shadow-xl outline-none",
            "animate-slide-down"
          )}
        >
          <DialogClose asChild>
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-3 right-3.5 z-10 w-8 h-8 rounded-full bg-gomin-primary-100 hover:bg-gomin-primary-200 active:scale-95"
              aria-label="닫기"
            >
              <X className="w-5 h-5 text-gomin-neutral-700" />
            </Button>
          </DialogClose>

          <div className="h-full overflow-y-auto scrollbar-hide">
            {event ? (
              <EventDetailContent event={event} />
            ) : (
              <EventDetailModalSkeleton />
            )}
          </div>
        </DialogPrimitive.Content>
      </DialogPortal>
    </Dialog>
  );
};

export default EventDetailModal;
