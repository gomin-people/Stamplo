"use client";

import { X } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogClose,
} from "@/components/ui/dialog";
import { Dialog as DialogPrimitive } from "radix-ui";
import { DialogTitle } from "@/components/ui/dialog";
import { participantEventQueries } from "@/features/participant/events/participantEventQueries";
import InfoCard from "@/components/user/common/InfoCard";
import EventDateTimeCard from "@/components/user/event/EventDateTimeCard";
import EventHostCard from "@/components/user/event/EventHostCard";
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
            "fixed top-14 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-3rem)] max-w-sm max-h-[85vh] rounded-[24px] bg-gomin-primary-100 flex flex-col shadow-xl",
            "animate-slide-down outline-none"
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

          <div className="overflow-y-auto scrollbar-hide flex-1 min-h-0">
            {event ? (
              <div className="bg-gomin-primary-100 pt-13 px-4 pb-6 flex flex-col gap-3">
                <InfoCard label="행사명">
                  <h2 className="text-[17px] font-nanum font-extrabold text-gomin-primary-700">
                    {event.title}
                  </h2>
                </InfoCard>

                <EventDateTimeCard
                  startDate={event.startDate || ""}
                  endDate={event.endDate || ""}
                  startTime={event.startTime}
                  endTime={event.endTime}
                />

                <InfoCard label="행사 장소">
                  <div className="flex justify-between items-center">
                    <span className="text-[15px] font-bold text-gomin-neutral-700">
                      {event.location}
                    </span>
                    {event.locationUrl && (
                      <a
                        href={event.locationUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[13px] font-nanum font-extrabold text-gomin-primary-700 hover:underline cursor-pointer"
                      >
                        지도보기
                      </a>
                    )}
                  </div>
                </InfoCard>

                <EventHostCard
                  production={event.production}
                  contactPhone={event.contactPhone}
                  contactEmail={event.contactEmail}
                />

                <InfoCard label="비고">
                  <p className="text-[14px] text-gomin-neutral-700 font-semibold whitespace-pre-line leading-relaxed">
                    {event.operatingRemarks || "특이사항이 없습니다."}
                  </p>
                </InfoCard>
              </div>
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
