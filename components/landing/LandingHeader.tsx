"use client";

import { useEffect, useState } from "react";
import StamploLogo from "@/components/admin/common/StamploLogo";
import { cn } from "@/utils";

export const LandingHeader = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 8);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 bg-white/82 backdrop-blur-[14px] backdrop-saturate-180 border-b transition-all duration-200 ease-[cubic-bezier(.2,.7,.2,1)] border-transparent",
        isScrolled &&
          "border-gomin-neutral-100/50 shadow-[0_1px_2px_rgba(17,17,17,0.04),0_1px_1px_rgba(17,17,17,0.03)]"
      )}
      id="nav"
    >
      <div className="max-w-[1200px] mx-auto px-8 max-md:px-5 max-sm:px-4 h-[68px] flex items-center justify-between">
        <a
          className="flex items-center gap-2.5 no-underline"
          href="#top"
          aria-label="Stamplo"
        >
          <StamploLogo width={112} height={32} />
        </a>
        <nav className="flex items-center gap-[30px] max-md:hidden">
          <a
            href="#problem"
            className="text-[15px] font-semibold text-gomin-neutral-600 hover:text-gomin-primary-700 transition-colors duration-120 no-underline"
          >
            문제 해결
          </a>
          <a
            href="#usage"
            className="text-[15px] font-semibold text-gomin-neutral-600 hover:text-gomin-primary-700 transition-colors duration-120 no-underline"
          >
            사용 방법
          </a>
          <a
            href="#data"
            className="text-[15px] font-semibold text-gomin-neutral-600 hover:text-gomin-primary-700 transition-colors duration-120 no-underline"
          >
            데이터 분석
          </a>
          <a
            href="#builder"
            className="text-[15px] font-semibold text-gomin-neutral-600 hover:text-gomin-primary-700 transition-colors duration-120 no-underline"
          >
            행사 제작
          </a>
        </nav>
        <div className="flex items-center gap-3">
          <a
            href="/admin"
            className="inline-flex items-center justify-center gap-2 font-sans font-bold border-0 rounded-xl cursor-pointer whitespace-nowrap no-underline active:scale-[0.98] transition-all duration-120 ease-[cubic-bezier(.2,.7,.2,1)] bg-gomin-primary-700 text-white hover:bg-gomin-primary-600 shadow-[0_10px_24px_rgba(84,53,235,0.24),0_2px_4px_rgba(84,53,235,0.12)] py-2.75 px-5 text-[15px]"
          >
            시작하기
          </a>
        </div>
      </div>
    </header>
  );
};
