"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { type EventModel } from "@/types/models";
import { fetchParticipantEvent } from "@/features/participant/events/participantEventApi";
import InfoCard from "@/components/user/common/InfoCard";
import EventDateTimeCard from "@/components/user/event/EventDateTimeCard";
import EventHostCard from "@/components/user/event/EventHostCard";
import EventDetailModalSkeleton from "@/components/user/event/EventDetailModalSkeleton";

type Props = {
  eventId: string;
  isOpen: boolean;
  onClose: () => void;
};

const EventDetailModal = ({ eventId, isOpen, onClose }: Props) => {
  const [event, setEvent] = useState<EventModel | null>(null);

  useEffect(() => {
    if (isOpen) void fetchParticipantEvent(Number(eventId)).then(setEvent);
  }, [isOpen, eventId]);

  return isOpen ? (
    <div
      className="fixed inset-0 z-50 bg-[rgba(17,17,17,0.4)]"
      onClick={onClose}
    >
      <div
        className="absolute top-15 left-0 right-0 mx-4 max-h-[85vh] rounded-[24px] bg-gomin-white flex flex-col overflow-hidden animate-slide-down shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="h-12 flex items-center justify-end px-4 shrink-0">
          <button
            onClick={onClose}
            className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-gomin-neutral-100 active:scale-95 transition-all"
            aria-label="닫기"
          >
            <X className="w-5 h-5 text-gomin-neutral-700" />
          </button>
        </div>

        <div className="overflow-y-auto">
          {event ? (
            <div className="bg-gomin-primary-100 p-4 flex flex-col gap-3">
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
      </div>
    </div>
  ) : null;
};

export default EventDetailModal;
