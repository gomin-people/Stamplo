import AnimatedIconStamplo from "@/components/icons/AnimatedIconStamplo";
import { ArrowRight } from "lucide-react";

export const LandingCTA = () => {
  return (
    <section
      className="bg-linear-to-br from-[#5f41ee] via-[#5435EB] to-[#4226c9] text-white text-center overflow-hidden relative before:content-[''] before:absolute before:left-[-140px] before:top-[-100px] before:w-[440px] before:h-[440px] before:rounded-full before:bg-[radial-gradient(circle,rgba(255,255,255,0.12)_0%,transparent_65%)] after:content-[''] after:absolute after:right-[-160px] after:bottom-[-160px] after:w-[480px] after:h-[480px] after:rounded-full after:bg-[radial-gradient(circle,rgba(255,255,255,0.10)_0%,transparent_65%)] py-0 px-0"
      id="cta"
    >
      <div className="max-w-[1200px] mx-auto px-8 max-md:px-5 max-sm:px-4">
        <div className="py-[clamp(80px,11vw,150px)] px-0 relative z-10 flex flex-col items-center gap-[30px]">
          <AnimatedIconStamplo className="w-28 h-28 text-white reveal" />

          <h2 className="text-white font-extrabold text-[clamp(32px,4.6vw,60px)] leading-[1.18] font-nanum break-keep word-keep-all reveal">
            누구나 쉽게
            <br />
            몰입감 있는 행사를 만들 수 있도록
          </h2>
          <p className="text-white/86 text-[clamp(16px,1.6vw,20px)] max-w-[52ch] leading-normal break-keep word-keep-all reveal">
            Stamplo는 쾌적한 스탬프 투어 경험을 디자인 합니다.
            <br />
            간편하게 모바일 스탬프 투어를 만들어 보세요.
          </p>
          <div className="flex gap-3.5 flex-wrap justify-center reveal">
            <a
              href="/admin"
              className="inline-flex items-center justify-center gap-2 font-sans font-bold border-0 cursor-pointer leading-none transition-all duration-120 ease-[cubic-bezier(.2,.7,.2,1)] whitespace-nowrap no-underline active:scale-[0.98] bg-white text-gomin-primary-700 hover:bg-[#f2efff] py-[17px] px-[30px] text-[17px] rounded-2xl"
            >
              시작하기
              <ArrowRight className="ml-1 inline" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
