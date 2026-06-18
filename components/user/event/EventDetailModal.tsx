"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { type EventModel } from "@/types/models";
import { fetchParticipantEvent } from "@/features/participant/events/participantEventApi";
import InfoCard from "@/components/user/common/InfoCard";
import EventDateTimeCard from "@/components/user/event/EventDateTimeCard";
import EventHostCard from "@/components/user/event/EventHostCard";

type Props = {
  eventId: string;
  isOpen: boolean;
  onClose: () => void;
};

const EventDetailModal = ({ eventId, isOpen, onClose }: Props) => {
  const [event, setEvent] = useState<EventModel | null>(null);

  useEffect(() => {
    if (!isOpen) return;
    fetchParticipantEvent(Number(eventId)).then(setEvent);
  }, [isOpen, eventId]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-gomin-white flex flex-col animate-fade-in">
      <div className="h-14 flex items-center justify-end px-4 shrink-0">
        <button
          onClick={onClose}
          className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-gomin-neutral-100 active:scale-95 transition-all"
          aria-label="닫기"
        >
          <X className="w-6 h-6 text-gomin-neutral-700" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto">
        {event ? (
          <div className="bg-gomin-primary-100 rounded-t-[32px] p-6 flex flex-col gap-4.5 min-h-full">
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
          <div className="bg-gomin-primary-100 rounded-t-[32px] p-6 flex flex-col gap-4.5 min-h-full">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="h-24 rounded-[20px] bg-gomin-neutral-100 animate-pulse"
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default EventDetailModal;
