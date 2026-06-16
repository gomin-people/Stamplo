import Image from "next/image";
import { ArrowRight } from "lucide-react";

export const LandingUsage = () => {
  return (
    <section className="py-[clamp(72px,9vw,120px)] px-0 relative" id="usage">
      <div className="max-w-[1200px] mx-auto px-8 max-md:px-5 max-sm:px-4">
        <div className="max-w-[720px] mx-auto mb-14 text-center flex flex-col items-center gap-4">
          <span className="inline-flex items-center gap-2.25 text-[13px] font-bold tracking-wider text-gomin-primary-700 before:content-[''] before:w-1.75 before:h-1.75 before:rounded-full before:bg-gomin-primary-700 before:shadow-[0_0_0_4px_var(--primary-100)] reveal">
            간편한 유저 사용법
          </span>
          <h2 className="font-extrabold text-[clamp(30px,3.6vw,46px)] leading-[1.18] font-nanum break-keep word-keep-all reveal">
            미션하고, 스캔하고, 보상받기
          </h2>
          <p className="text-[clamp(16px,1.5vw,18px)] text-gomin-neutral-600 max-w-[56ch] leading-[1.6] break-keep word-keep-all reveal">
            참여자는 별도 설치 없이, 행사장에서 휴대폰만 있으면 됩니다.
          </p>
        </div>

        <div className="grid grid-cols-[1fr_auto_1fr_auto_1fr] gap-2 items-start max-lg:grid-cols-1 max-lg:gap-10">
          {/* Step 1: Scan QR */}
          <div className="flex flex-col items-center gap-[22px] reveal">
            <div className="relative w-full aspect-[9/19.2] bg-[#0e0e12] rounded-[42px] p-[11px] shadow-[0_40px_80px_-24px_rgba(20,12,60,0.45),0_6px_16px_rgba(17,17,17,0.18)] max-w-[250px] max-xs:max-w-[240px]">
              <div className="relative w-full h-full rounded-[32px] overflow-hidden bg-slate-50 flex flex-col">
                <Image
                  src="/images/landing/qrPage.webp"
                  alt="QR Scan Mockup"
                  fill
                  sizes="(max-width: 480px) 240px, 250px"
                  className="object-cover"
                />
              </div>
            </div>
            <div className="flex flex-col items-center gap-2.5 text-center max-w-[260px]">
              <div className="w-10 h-10 rounded-full bg-gomin-primary-700 text-white font-nanum font-extrabold text-base flex items-center justify-center shadow-[0_10px_24px_rgba(84,53,235,0.24),0_2px_4px_rgba(84,53,235,0.12)]">
                1
              </div>
              <div className="text-[19px] font-extrabold font-nanum break-keep word-keep-all">
                QR 스캔
              </div>
              <div className="text-sm text-gomin-neutral-500 leading-[1.55] break-keep word-keep-all">
                행사장 곳곳의 QR을 카메라로 스캔하면 미션이 열립니다.
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center pt-[220px] text-gomin-primary-300 max-lg:pt-0 max-lg:rotate-90 reveal">
            <ArrowRight className="inline w-[30px] h-[30px] stroke-[1.8]" />
          </div>

          {/* Step 2: Collect Stamp */}
          <div className="flex flex-col items-center gap-[22px] reveal">
            <div className="relative w-full aspect-[9/19.2] bg-[#0e0e12] rounded-[42px] p-[11px] shadow-[0_40px_80px_-24px_rgba(20,12,60,0.45),0_6px_16px_rgba(17,17,17,0.18)] max-w-[250px] max-xs:max-w-[240px]">
              <div className="relative w-full h-full rounded-[32px] overflow-hidden bg-slate-50 flex flex-col">
                <Image
                  src="/images/landing/missionPage.webp"
                  alt="Stamp Card Mockup"
                  fill
                  sizes="(max-width: 480px) 240px, 250px"
                  className="object-cover"
                />
              </div>
            </div>
            <div className="flex flex-col items-center gap-2.5 text-center max-w-[260px]">
              <div className="w-10 h-10 rounded-full bg-gomin-primary-700 text-white font-nanum font-extrabold text-base flex items-center justify-center shadow-[0_10px_24px_rgba(84,53,235,0.24),0_2px_4px_rgba(84,53,235,0.12)]">
                2
              </div>
              <div className="text-[19px] font-extrabold font-nanum break-keep word-keep-all">
                스탬프 적립
              </div>
              <div className="text-sm text-gomin-neutral-500 leading-[1.55] break-keep word-keep-all">
                스캔과 동시에 스탬프가 카드에 채워집니다. 종이도, 도장도 필요
                없어요.
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center pt-[220px] text-gomin-primary-300 max-lg:pt-0 max-lg:rotate-90 reveal">
            <ArrowRight className="inline w-[30px] h-[30px] stroke-[1.8]" />
          </div>

          {/* Step 3: Complete / Reward */}
          <div className="flex flex-col items-center gap-[22px] reveal">
            <div className="relative w-full aspect-[9/19.2] bg-[#0e0e12] rounded-[42px] p-[11px] shadow-[0_40px_80px_-24px_rgba(20,12,60,0.45),0_6px_16px_rgba(17,17,17,0.18)] max-w-[250px] max-xs:max-w-[240px]">
              <div className="relative w-full h-full rounded-[32px] overflow-hidden bg-slate-50 flex flex-col">
                <Image
                  src="/images/landing/rewardPage.webp"
                  alt="Reward Mockup"
                  fill
                  sizes="(max-width: 480px) 240px, 250px"
                  className="object-cover"
                />
              </div>
            </div>
            <div className="flex flex-col items-center gap-2.5 text-center max-w-[260px]">
              <div className="w-10 h-10 rounded-full bg-gomin-primary-700 text-white font-nanum font-extrabold text-base flex items-center justify-center shadow-[0_10px_24px_rgba(84,53,235,0.24),0_2px_4px_rgba(84,53,235,0.12)]">
                3
              </div>
              <div className="text-[19px] font-extrabold font-nanum break-keep word-keep-all">
                미션 완료 · 보상
              </div>
              <div className="text-sm text-gomin-neutral-500 leading-[1.55] break-keep word-keep-all">
                목표를 채우면 보상이 바로 지급됩니다. 끝까지 참여하게 만드는
                몰입감.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
