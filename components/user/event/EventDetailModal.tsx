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
        className="absolute top-15 left-0 right-0 mx-auto w-[calc(100%-3rem)] max-w-sm max-h-[85vh] rounded-[24px] bg-gomin-white flex flex-col overflow-hidden animate-slide-down shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3.5 z-10 flex items-center justify-center w-8 h-8 rounded-full bg-gomin-primary-100 hover:bg-gomin-primary-200 active:scale-95 transition-all"
          aria-label="닫기"
        >
          <X className="w-5 h-5 text-gomin-neutral-700" />
        </button>

        <div className="overflow-y-auto">
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
                  {
                    "본 행사는 사전 예약 없이 현장 방문으로 참여 가능합니다.\n운영 시간 내에는 자유롭게 입장하실 수 있으며, 각 미션 부스는 선착순으로 운영됩니다.\n우천 시에도 행사는 정상 운영되나, 일부 야외 부스는 운영이 제한될 수 있습니다.\n주차 공간이 협소하오니 가급적 대중교통을 이용해 주시기 바랍니다.\n문의 사항은 행사 운영 담당자에게 직접 연락 주시면 안내해 드리겠습니다.\n미션 완료 후 리워드는 현장에서 즉시 수령 가능하며, 소진 시 조기 종료될 수 있습니다."
                  }
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
