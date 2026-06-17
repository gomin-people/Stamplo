import Image from "next/image";

export const LandingFooter = () => {
  return (
    <footer className="bg-[#0e0d14] text-white/70 py-[60px] px-0 pb-10">
      <div className="max-w-[1200px] mx-auto px-8 max-md:px-5 max-sm:px-4">
        <div className="flex justify-between items-start gap-10 flex-wrap max-md:flex-col max-md:gap-8">
          <div className="flex flex-col max-w-[320px]">
            <a className="flex items-center gap-2.5 no-underline" href="#top">
              <Image
                src="/images/landing/logo_stamplo_white.svg"
                alt="Stamplo 로고"
                width={32}
                height={32}
                unoptimized
              />
              <span className="font-(--font-monomaniac-one) text-[25px] tracking-[0.01em] text-white leading-none pt-[3px]">
                stamplo
              </span>
            </a>
            <p className="text-sm text-white/55 mt-3.5 leading-[1.6] break-keep word-keep-all">
              누구나 쉽게 시작하는 스탬프 투어 플랫폼.
            </p>
          </div>

          <div className="flex gap-[clamp(60px,10vw,120px)] flex-wrap max-sm:flex-col max-sm:gap-8">
            <div className="flex flex-col gap-3">
              <span className="text-[13px] font-bold text-white/45 tracking-wider">
                바로가기
              </span>
              <a
                href="#problem"
                className="text-[14.5px] text-white/78 hover:text-white no-underline"
              >
                문제 해결
              </a>
              <a
                href="#usage"
                className="text-[14.5px] text-white/78 hover:text-white no-underline"
              >
                사용 방법
              </a>
              <a
                href="#data"
                className="text-[14.5px] text-white/78 hover:text-white no-underline"
              >
                데이터 분석
              </a>
              <a
                href="#builder"
                className="text-[14.5px] text-white/78 hover:text-white no-underline"
              >
                페이지 만들기
              </a>
            </div>
            <div className="flex flex-col gap-3">
              <span className="text-[13px] font-bold text-white/45 tracking-wider">
                문의
              </span>
              <span className="text-[14.5px] text-white/78">
                고민하는 사람들
              </span>
              <a
                href="mailto:gominpeople26@gmail.com"
                className="text-[14.5px] text-white/78 hover:text-white no-underline"
              >
                gominpeople26@gmail.com
              </a>
            </div>
          </div>
        </div>
        <div className="mt-11 pt-6 border-t border-white/10 flex justify-between gap-4 flex-wrap text-xs text-white/45">
          <span>
            © 2026 고민하는 사람들 (Gomin People). All rights reserved.
          </span>
          <span>Stamplo</span>
        </div>
      </div>
    </footer>
  );
};
