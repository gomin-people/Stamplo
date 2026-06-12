"use client";

import { useState, useEffect, useRef, memo } from "react";
import { useRouter } from "next/navigation";
import BrochureButton from "@/components/user/mission/BrochureButton";
import ViewToggle from "@/components/user/mission/ViewToggle";
import MissionStamp from "@/components/user/mission/MissionStamp";
import MissionItem from "@/components/user/mission/MissionItem";
import FloatingActionButton from "@/components/user/mission/FloatingActionButton";
import SurveyModal from "@/components/user/mission/SurveyModal";
import {
  useParticipantMissionsQuery,
  type ParticipantMission,
  type ParticipantMissions,
} from "@/features/participant/missions/participantMissionQueries";
import { cn } from "@/utils";
import { buildInitialData } from "@/utils/participant-mission";
import { type ParticipantModel } from "@/types/models";

type EventData = {
  id: number;
  title?: string;
  name?: string;
  description?: string;
  stampImageUrl?: string | null;
};

type InitialMission = {
  id: number;
  title: string;
  description: string | null;
  isCompleted: boolean;
};

type MissionPageClientProps = {
  event: EventData;
  eventId: string;
  initialMissions: InitialMission[];
  initialParticipant?: ParticipantModel;
  isPreview?: boolean;
};

type ViewMode = "list" | "grid";

type ClientMission = {
  id: number;
  title: string;
  description: string;
  isStamped: boolean;
};

const MissionPageClient = ({
  event,
  eventId,
  initialMissions,
  initialParticipant,
  isPreview = false,
}: MissionPageClientProps) => {
  const router = useRouter();
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [isSurveyOpen, setIsSurveyOpen] = useState(false);

  const initialData: ParticipantMissions | undefined =
    !isPreview && initialMissions.length > 0
      ? buildInitialData(initialMissions, initialParticipant)
      : undefined;

<<<<<<< HEAD
  // React Query를 통해 DB에서 참여자의 실시간 완료 스탬프 현황 데이터를 가져옴
  const { data, isError, isFetching } = useParticipantMissionsQuery({
=======
  const { data, isError } = useParticipantMissionsQuery({
>>>>>>> 45818a9 (fix: 이미지 최적화)
    enabled: !isPreview,
    initialData,
  });

  const missions: ClientMission[] =
    data && !isPreview
      ? (data.missions as ParticipantMission[]).map((m) => ({
          id: m.id,
          title: m.title,
          description: m.description ?? "",
          isStamped: m.isCompleted,
        }))
      : initialMissions.map((m: InitialMission) => ({
          id: m.id,
          title: m.title,
          description: m.description ?? "",
          isStamped: !!m.isCompleted,
        }));

  const incompleteCount = missions.filter((m) => !m.isStamped).length;
  const isAllCompleted = incompleteCount === 0;

  const isSurveyCompleted =
    data && !isPreview
      ? !!data.participant.gender && !!data.participant.ageRange
      : false;

<<<<<<< HEAD
  // 설문 제출 완료 감지 시 자동으로 완료 페이지 이동
  useEffect(() => {
    if (isSurveyCompleted && isSurveyOpen) {
      const timer = setTimeout(() => {
        router.push(`/event/${eventId}/complete`);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isSurveyCompleted, isSurveyOpen, eventId, router]);

  // 리워드 수령 완료 여부
=======
>>>>>>> 45818a9 (fix: 이미지 최적화)
  const isRewardClaimed =
    data && !isPreview ? data.participant.isRewardClaimed : false;

  const hasError = isError && !isPreview;
  const isMissionsEmpty = missions.length === 0 && !isPreview;
  const isShowEmpty = hasError || isMissionsEmpty;
  const showBrochureButton = isPreview || !hasError;
  const showMissionUI = isPreview || (showBrochureButton && !isMissionsEmpty);

  const handleAction = () => {
    if (isAllCompleted) {
      if (isSurveyCompleted) {
        router.push(`/event/${eventId}/complete`);
      } else {
        setIsSurveyOpen(true);
      }
    } else {
      window.location.assign(`/event/${eventId}/qr-check`);
    }
  };

  const handleSurveySubmitSuccess = () => {
    setTimeout(() => {
      router.push(`/event/${eventId}/complete`);
    }, 100);
  };

  const eventName = event?.title || event?.name || `이벤트 #${eventId}`;

  return (
    <div
      className={cn(
        "flex flex-col relative bg-gomin-white",
        isPreview
          ? "h-full pb-20"
          : isShowEmpty
            ? "h-full overflow-hidden pt-14"
            : "pb-21.5 pt-14"
      )}
    >
      <main className="flex-1 max-w-md w-full mx-auto px-6 pt-4 pb-1.5 overflow-x-hidden">
        <div className="flex items-center justify-between gap-4 mb-5">
          <h1 className="text-4xl font-nanum font-extrabold leading-11.25 text-gomin-primary-700 tracking-tight select-none">
            {eventName}
          </h1>
          {showBrochureButton && (
            <BrochureButton eventId={eventId} className="animate-bounce-once" />
          )}
        </div>

        {showMissionUI && (
          <div className="mb-4 min-h-14 flex items-center">
            {!isAllCompleted ? (
              <h2 className="text-2xl font-nanum font-extrabold text-gomin-neutral-700 leading-tight tracking-tight select-none">
                <span className="text-gomin-primary-700 font-nanum font-extrabold">
                  {incompleteCount}개
                </span>
                의 스탬프를 더 모으고
                <br />
                리워드를 받으세요
              </h2>
            ) : (
              <h2 className="text-2xl font-nanum font-extrabold text-gomin-black leading-tight tracking-tight flex items-center gap-1.5 select-none">
                🎉 축하합니다!
                <br />
                모든 스탬프를 수집했어요!
              </h2>
            )}
          </div>
        )}

        {showMissionUI && (
          <div className="flex justify-end mb-5">
            <ViewToggle viewMode={viewMode} onChange={setViewMode} />
          </div>
        )}

        <div className="transition-all duration-300">
          {isShowEmpty ? (
            <div className="flex flex-col items-center justify-center pb-20 pt-40 text-center select-none">
              <p className="text-[128px] font-nanum font-extrabold text-gomin-primary-700 leading-none">
                텅
              </p>
              <p className="text-2xl font-nanum font-extrabold text-gomin-black mt-4">
                이런.. 미션이 없어요..
              </p>
            </div>
          ) : viewMode === "grid" ? (
            <div className="grid grid-cols-2 gap-4">
              {missions.map((mission) => (
                <MissionStamp
                  key={mission.id}
                  mission={mission}
                  stampImageUrl={event.stampImageUrl}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {missions.map((mission) => (
                <MissionItem
                  key={mission.id}
                  mission={mission}
                  stampImageUrl={event.stampImageUrl}
                />
              ))}
            </div>
          )}
        </div>
      </main>

      {showMissionUI && (
        <FloatingActionButton
          isAllCompleted={isAllCompleted}
          onClick={handleAction}
          isPreview={isPreview}
          isRewardClaimed={isRewardClaimed}
          isLoading={isFetching && !isPreview}
          className={isPreview ? "" : "animate-fade-up"}
        />
      )}

      <SurveyModal
        isOpen={isSurveyOpen && !isSurveyCompleted}
        onClose={() => setIsSurveyOpen(false)}
        onSubmitSuccess={handleSurveySubmitSuccess}
      />
    </div>
  );
};

export default MissionPageClient;
