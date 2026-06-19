"use client";

import { useCallback, useEffect, useRef } from "react";
import { PartyPopperIcon, UsersIcon } from "lucide-animated";
import DashboardKpiCard, {
  type KpiIconComponent,
} from "@/components/admin/dashboard/DashboardKpiCard";
import MissionCompletionStatus from "@/components/admin/dashboard/MissionCompletionStatus";
import TodayFunnelSummary from "@/components/admin/dashboard/TodayFunnelSummary";
import { adminDashboardQueries } from "@/features/admin/dashboard/adminDashboardQueries";
import { useDashboardKpiBroadcast } from "@/hooks/useDashboardKpiBroadcast";
import dynamic from "next/dynamic";
import { useQuery } from "@tanstack/react-query";

const ParticipantAnalysisChart = dynamic(
  () => import("@/components/admin/dashboard/ParticipantAnalysisChart")
);
const ParticipantDemographicsChart = dynamic(
  () => import("@/components/admin/dashboard/ParticipantDemographicsChart")
);
import type {
  AdminDashboardKpiKey,
  AdminDashboardKpisResponse,
} from "@/types/admin-dashboard";

type Props = {
  eventId: number;
};

const dashboardPanelClassName =
  "min-w-0 rounded-xl border border-gomin-neutral-100 bg-white";

const emptyKpis: AdminDashboardKpisResponse = {
  totalParticipants: { value: 0 },
  totalRewardClaimed: { value: 0 },
  todayFunnel: {
    participants: 0,
    inProgress: { count: 0, percent: 0 },
    unclaimed: { count: 0, percent: 0 },
    claimed: { count: 0, percent: 0 },
  },
};

const dashboardKpiSections: {
  key: "overall" | "today";
  title: string;
  subtitle?: string;
  cardKeys?: AdminDashboardKpiKey[];
}[] = [
  {
    key: "overall",
    title: "참여 상태 분포",
  },
  {
    key: "today",
    title: "누적 현황",
    subtitle: "전체 행사 기준",
    cardKeys: ["totalParticipants", "totalRewardClaimed"],
  },
];

const dashboardCardMeta: Record<
  AdminDashboardKpiKey,
  {
    key: AdminDashboardKpiKey;
    title: string;
    icon: KpiIconComponent;
    colorClassNames: {
      icon: string;
      value: string;
    };
  }
> = {
  totalParticipants: {
    key: "totalParticipants",
    title: "총 참여자 수",
    icon: UsersIcon,
    colorClassNames: {
      icon: "bg-[#EEF4FF] text-[#4D7CFE]",
      value: "text-[#4D7CFE]",
    },
  },
  totalRewardClaimed: {
    key: "totalRewardClaimed",
    title: "총 굿즈 수령자 수",
    icon: PartyPopperIcon,
    colorClassNames: {
      icon: "bg-[#F3F1FE] text-[#5435EB]",
      value: "text-[#5435EB]",
    },
  },
};

const DashboardClient = ({ eventId }: Props) => {
  const kpisQuery = useQuery(adminDashboardQueries.kpis(eventId));
  const participantAnalysisQuery = useQuery(
    adminDashboardQueries.participantAnalysis(eventId)
  );
  const achieverStatisticsQuery = useQuery(
    adminDashboardQueries.achieverStatistics(eventId)
  );
  const missionsQuery = useQuery(adminDashboardQueries.missions(eventId));
  const { data: kpisData, refetch: refetchKpisQuery } = kpisQuery;
  const { data: participantAnalysis, refetch: refetchParticipantAnalysis } =
    participantAnalysisQuery;
  const { data: achieverStatistics, refetch: refetchAchieverStatistics } =
    achieverStatisticsQuery;
  const { data: missions, refetch: refetchMissions } = missionsQuery;

  const refetchAllDashboardData = useCallback(() => {
    if (!isValidEventId(eventId)) {
      return;
    }

    void refetchKpisQuery();
    void refetchParticipantAnalysis();
    void refetchAchieverStatistics();
    void refetchMissions();
  }, [
    eventId,
    refetchAchieverStatistics,
    refetchKpisQuery,
    refetchMissions,
    refetchParticipantAnalysis,
  ]);

  const isEventIdValid = isValidEventId(eventId);

  useDashboardKpiBroadcast({
    eventId,
    enabled: isEventIdValid,
    onInvalidate: refetchAllDashboardData,
  });
  useAlignedMinuteRefetch(refetchAllDashboardData, isEventIdValid);
  const kpisReady = kpisQuery.isSuccess && !!kpisData;

  const kpis = kpisData ?? emptyKpis;

  return (
    <div className="px-8 pt-0">
      <div className="mt-8 grid grid-cols-12 gap-4">
        {dashboardKpiSections.map((section) => {
          const isTodaySection = section.key === "overall";

          return (
            <section
              key={section.key}
              className={`rounded-xl border border-gomin-neutral-100 bg-white px-4 pt-3 pb-2 shadow-[0_8px_32px_rgba(15,23,42,0.06)] ${
                section.key === "overall"
                  ? "col-span-7 overflow-hidden"
                  : "col-span-5"
              }`}
            >
              {isTodaySection ? null : (
                <div className="flex min-w-0 flex-wrap items-end gap-x-4 gap-y-1">
                  <h2 className="text-lg font-semibold text-gomin-black">
                    {section.title}
                  </h2>
                  <p className="min-w-0 truncate text-sm font-medium text-gomin-neutral-500">
                    {section.subtitle}
                  </p>
                </div>
              )}

              {isTodaySection ? (
                <TodayFunnelSummary
                  funnel={kpis.todayFunnel}
                  ready={kpisReady}
                />
              ) : (
                <div className="grid grid-cols-2">
                  {(section.cardKeys ?? []).map((cardKey, index) => {
                    const card = dashboardCardMeta[cardKey];

                    return (
                      <div
                        key={`${eventId}-${card.key}`}
                        className={
                          index === 0
                            ? "relative pr-4 after:absolute after:top-[calc(50%+0.5rem)] after:right-0 after:h-12 after:-translate-y-1/2 after:border-r after:border-gomin-neutral-100 after:content-['']"
                            : "pl-4"
                        }
                      >
                        <DashboardKpiCard
                          title={card.title}
                          value={kpis[card.key].value}
                          icon={card.icon}
                          colorClassNames={card.colorClassNames}
                          ready={kpisReady}
                        />
                      </div>
                    );
                  })}
                </div>
              )}
            </section>
          );
        })}
      </div>

      <div className="mt-4 grid grid-cols-12 gap-4">
        <div className="col-span-8 flex min-w-0 flex-col gap-4">
          <section
            aria-label="참여자 수 분석"
            className={`${dashboardPanelClassName} overflow-hidden`}
          >
            <ParticipantAnalysisChart
              daily={participantAnalysis?.daily ?? []}
              hourlyTotal={participantAnalysis?.hourlyTotal ?? []}
              hourlyByDate={participantAnalysis?.hourlyByDate ?? []}
            />
          </section>

          <section
            aria-label="달성자 통계"
            className={`${dashboardPanelClassName} overflow-hidden`}
          >
            <ParticipantDemographicsChart
              totalRespondents={achieverStatistics?.totalRespondents ?? 0}
              genderData={achieverStatistics?.gender ?? []}
              ageData={achieverStatistics?.ageRange ?? []}
            />
          </section>
        </div>

        <div className="col-span-4 flex min-w-0 flex-col gap-4">
          <section
            aria-label="미션별 완료 현황"
            className={`${dashboardPanelClassName} overflow-visible`}
          >
            <MissionCompletionStatus missions={missions?.missions ?? []} />
          </section>
        </div>
      </div>
    </div>
  );
};

const useAlignedMinuteRefetch = (callback: () => void, enabled: boolean) => {
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    if (!enabled) {
      return;
    }

    let intervalId: number | undefined;
    const now = Date.now();
    const remainder = now % 60000;
    const delay = remainder === 0 ? 60000 : 60000 - remainder;

    const timeoutId = window.setTimeout(() => {
      callbackRef.current();
      intervalId = window.setInterval(() => {
        callbackRef.current();
      }, 60000);
    }, delay);

    return () => {
      window.clearTimeout(timeoutId);

      if (intervalId !== undefined) {
        window.clearInterval(intervalId);
      }
    };
  }, [enabled]);
};

const isValidEventId = (eventId: number): eventId is number =>
  Number.isInteger(eventId) && eventId > 0;

export default DashboardClient;
