import Image from "next/image";
import { Clock, BarChart3, Lock } from "lucide-react";

export const LandingData = () => {
  return (
    <section
      className="bg-[#F3F1FE] py-[clamp(72px,9vw,120px)] px-0 relative"
      id="data"
    >
      <div className="max-w-[1200px] mx-auto px-8 max-md:px-5 max-sm:px-4">
        <div className="grid grid-cols-[0.86fr_1.14fr] gap-14 items-center max-lg:grid-cols-1 max-lg:gap-10">
          <div className="flex flex-col gap-[22px]">
            <span className="inline-flex items-center gap-2.25 text-[13px] font-bold tracking-wider text-gomin-primary-700 before:content-[''] before:w-1.75 before:h-1.75 before:rounded-full before:bg-gomin-primary-700 before:shadow-[0_0_0_4px_var(--primary-100)] reveal">
              디테일한 데이터 분석
            </span>
            <h2 className="font-extrabold text-[clamp(30px,3.6vw,46px)] leading-[1.18] font-nanum break-keep word-keep-all reveal">
              행사가 끝나면
              <br />
              인사이트가 남습니다
            </h2>
            <p className="text-[clamp(16px,1.5vw,18px)] text-gomin-neutral-600 max-w-[56ch] leading-[1.6] break-keep word-keep-all reveal">
              실시간 대시보드로 참여 흐름을 한눈에. 다음 행사를 위한 데이터가
              자동으로 쌓입니다.
            </p>
            <div className="flex flex-col gap-3.5 mt-1">
              <div className="flex gap-3.5 items-start bg-white border border-gomin-neutral-100 rounded-2xl p-[16px_18px] shadow-[0_1px_2px_rgba(17,17,17,0.04),0_1px_1px_rgba(17,17,17,0.03)] reveal">
                <div className="w-10 h-10 shrink-0 rounded-xl bg-gomin-primary-100 text-gomin-primary-700 flex items-center justify-center">
                  <Clock />
                </div>
                <div>
                  <div className="text-base font-bold font-nanum break-keep word-keep-all">
                    시간대별 · 연령별 데이터
                  </div>
                  <div className="text-[13.5px] text-gomin-neutral-500 mt-0.75 leading-normal break-keep word-keep-all">
                    언제, 누가 가장 활발히 참여했는지 한눈에 파악하세요.
                  </div>
                </div>
              </div>
              <div className="flex gap-3.5 items-start bg-white border border-gomin-neutral-100 rounded-2xl p-[16px_18px] shadow-[0_1px_2px_rgba(17,17,17,0.04),0_1px_1px_rgba(17,17,17,0.03)] reveal">
                <div className="w-10 h-10 shrink-0 rounded-xl bg-gomin-primary-100 text-gomin-primary-700 flex items-center justify-center">
                  <BarChart3 />
                </div>
                <div>
                  <div className="text-base font-bold font-nanum break-keep word-keep-all">
                    미션별 참여율 데이터
                  </div>
                  <div className="text-[13.5px] text-gomin-neutral-500 mt-0.75 leading-normal break-keep word-keep-all">
                    어떤 미션이 잘 통했는지, 어디서 이탈했는지 미션 단위로
                    확인하세요.
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="relative flex justify-center max-lg:order-first reveal">
            {/* Premium Live Mockup Dashboard (Admin PC Web style) */}
            <div className="w-full bg-white rounded-2xl shadow-[0_40px_80px_-28px_rgba(20,12,60,0.40),0_4px_14px_rgba(17,17,17,0.10)] overflow-hidden border border-gomin-neutral-100/50">
              <div className="h-[46px] flex items-center gap-4 px-[18px] bg-gomin-neutral-100/50 border-b border-gomin-neutral-100/50">
                <div className="flex gap-[7px]">
                  <i className="w-3 h-3 rounded-full bg-gomin-neutral-200"></i>
                  <i className="w-3 h-3 rounded-full bg-gomin-neutral-200"></i>
                  <i className="w-3 h-3 rounded-full bg-gomin-neutral-200"></i>
                </div>
                <div className="flex-1 max-w-[360px] h-[26px] rounded-full bg-white border border-gomin-neutral-100 flex items-center gap-1.75 px-3.5 text-[12.5px] text-gomin-neutral-500 font-mono">
                  <Lock className="w-[13px] h-[13px] text-emerald-500" />
                  stamplo.com/admin
                </div>
              </div>
              <div className="aspect-16/10 bg-slate-50 relative overflow-hidden">
                <Image
                  src="/images/landing/dashboardPage.webp"
                  alt="Dashboard Mockup"
                  fill
                  sizes="(max-width: 1024px) 100vw, 700px"
                  className="object-fit"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
