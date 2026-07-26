import type { EventModel } from "@/types/models";
import InfoCard from "@/components/user/common/InfoCard";
import EventDateTimeCard from "@/components/user/event/EventDateTimeCard";
import EventHostCard from "@/components/user/event/EventHostCard";

type Props = {
  event: EventModel;
};

const EventDetailContent = ({ event }: Props) => {
  return (
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
  );
};

export default EventDetailContent;
