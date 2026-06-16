"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import StamploLogo from "@/components/admin/common/StamploLogo";
import { ArrowRight } from "lucide-react";

const HERO_MOCKUPS = [
  "/images/landing/missionPage.webp",
  "/images/landing/missionListPage.webp",
];

export const LandingHero = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % HERO_MOCKUPS.length);
    }, 2000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section
      className="pt-[clamp(48px,7vw,88px)] pb-[clamp(60px,8vw,110px)] relative"
      id="hero"
    >
      <div className="max-w-[1200px] mx-auto px-8 max-md:px-5 max-sm:px-4">
        <div className="w-full">
          <div className="grid grid-cols-[1.05fr_0.95fr] gap-14 items-center max-lg:grid-cols-1 max-lg:gap-10">
            <div className="flex flex-col gap-5">
              <h1 className="font-extrabold text-[clamp(24px,4.8vw,56px)] leading-[1.2] tracking-tight font-nanum break-keep word-keep-all reveal">
                누구나 쉽게
                <br /> 시작하는 스탬프 투어
              </h1>
              <div className="reveal">
                <StamploLogo
                  width={280}
                  height={80}
                  className="w-[clamp(210px,28vw,280px)] h-auto"
                />
              </div>
              <p className="text-[clamp(14px,1.5vw,18px)] text-gomin-neutral-600 leading-[1.62] break-keep word-keep-all reveal">
                행사의 몰입도를 위해 스탬프 투어는 이제 필수.
                <br />
                간편하게 내 행사에 스탬프 투어를 적용해 보세요.
              </p>
              <div className="flex gap-3.5 flex-wrap reveal">
                <a
                  href="/admin"
                  className="inline-flex items-center justify-center gap-2 font-sans font-bold border-0 cursor-pointer leading-none transition-all duration-120 ease-[cubic-bezier(.2,.7,.2,1)] whitespace-nowrap no-underline active:scale-[0.98] bg-gomin-primary-700 text-white hover:bg-gomin-primary-600 shadow-[0_10px_24px_rgba(84,53,235,0.24),0_2px_4px_rgba(84,53,235,0.12)] py-[17px] px-[30px] text-[17px] rounded-2xl"
                >
                  시작하기
                  <ArrowRight className="ml-1 inline" />
                </a>
              </div>
            </div>
            <div className="relative flex justify-center reveal">
              <div className="absolute inset-0 z-0 pointer-events-none before:content-[''] before:absolute before:w-[70%] before:h-[70%] before:left-[15%] before:top-[12%] before:bg-[radial-gradient(circle,var(--primary-200)_0%,transparent_68%)] before:filter before:blur-[10px] before:opacity-70"></div>
              {/* Premium Live Mockup for Hero A */}
              <div className="relative w-full aspect-[9/19.2] bg-[#0e0e12] rounded-[42px] p-[11px] shadow-[0_40px_80px_-24px_rgba(20,12,60,0.45),0_6px_16px_rgba(17,17,17,0.18)] max-w-[332px] max-md:max-w-[280px] max-sm:max-w-[240px]">
                <div className="relative w-full h-full rounded-[32px] overflow-hidden bg-slate-50 flex flex-col">
                  {HERO_MOCKUPS.map((src, index) => (
                    <Image
                      key={src}
                      src={src}
                      alt={`mockup ${index}`}
                      fill
                      sizes="(max-width: 640px) 240px, (max-width: 768px) 280px, 332px"
                      className={`object-cover transition-opacity duration-700 ease-in-out ${
                        currentIndex === index ? "opacity-100" : "opacity-0"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
