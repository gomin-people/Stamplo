"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { cn } from "@/utils";
import {
  ArrowRight,
  CheckCircle2,
  XCircle,
  Scroll,
  Users,
  QrCode,
  Image as ImageIcon,
  Stamp,
  BarChart3,
  Clock,
  Lock,
  Award,
} from "lucide-react";

export default function LandingPage() {
  const [isScrolled, setIsScrolled] = useState(false);

  // Scroll event for sticky nav border/shadow
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 8);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // IntersectionObserver for scroll reveal animations (.reveal -> .in)
  useEffect(() => {
    const reveals = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        rootMargin: "0px 0px -8% 0px",
        threshold: 0.05,
      }
    );

    reveals.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* ===================== NAV ===================== */}
      <header
        className={cn(
          "sticky top-0 z-50 bg-white/82 backdrop-blur-[14px] backdrop-saturate-[180%] border-b transition-all duration-200 ease-[cubic-bezier(.2,.7,.2,1)] border-transparent",
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
            <span className="font-[var(--font-monomaniac-one)] text-[25px] tracking-[0.01em] text-gomin-primary-700 leading-none pt-[3px]">
              stamplo
            </span>
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
              페이지 만들기
            </a>
          </nav>
          <div className="flex items-center gap-3">
            <a
              href="#cta"
              className="inline-flex items-center justify-center gap-2 font-sans font-bold border-0 rounded-xl cursor-pointer whitespace-nowrap no-underline active:scale-[0.98] transition-all duration-120 ease-[cubic-bezier(.2,.7,.2,1)] bg-gomin-primary-700 text-white hover:bg-gomin-primary-600 shadow-[0_10px_24px_rgba(84,53,235,0.24),0_2px_4px_rgba(84,53,235,0.12)] py-2.75 px-5 text-[15px]"
            >
              시작하기
            </a>
          </div>
        </div>
      </header>

      <main id="top">
        {/* ===================== HERO ===================== */}
        <section
          className="pt-[clamp(48px,7vw,88px)] pb-[clamp(60px,8vw,110px)] relative"
          id="hero"
        >
          <div className="max-w-[1200px] mx-auto px-8 max-md:px-5 max-sm:px-4">
            <div className="w-full">
              <div className="grid grid-cols-[1.05fr_0.95fr] gap-14 items-center max-lg:grid-cols-1 max-lg:gap-10">
                <div className="flex flex-col gap-6.5">
                  <span className="inline-flex items-center gap-2.25 text-[13px] font-bold tracking-wider text-gomin-primary-700 before:content-[''] before:w-1.75 before:h-1.75 before:rounded-full before:bg-gomin-primary-700 before:shadow-[0_0_0_4px_var(--primary-100)] reveal transition-all duration-700 ease-[cubic-bezier(.2,.7,.2,1)] opacity-0 translate-y-6 [&.in]:opacity-100 [&.in]:translate-y-0 will-change-[transform,opacity]">
                    무료 스탬프 투어 플랫폼
                  </span>
                  <h1 className="font-extrabold text-[clamp(38px,5.4vw,68px)] leading-[1.1] tracking-tight font-nanum break-keep word-keep-all reveal delay-[80ms] transition-all duration-700 ease-[cubic-bezier(.2,.7,.2,1)] opacity-0 translate-y-6 [&.in]:opacity-100 [&.in]:translate-y-0 will-change-[transform,opacity]">
                    누구나 쉽게 시작하는
                    <br />
                    스탬프 투어,{" "}
                    <span className="font-[var(--font-monomaniac-one)] text-gomin-primary-700 tracking-[0.01em]">
                      Stamplo
                    </span>
                  </h1>
                  <p className="text-[clamp(16px,1.55vw,19px)] text-gomin-neutral-600 leading-[1.62] break-keep word-keep-all reveal delay-[160ms] transition-all duration-700 ease-[cubic-bezier(.2,.7,.2,1)] opacity-0 translate-y-6 [&.in]:opacity-100 [&.in]:translate-y-0 will-change-[transform,opacity]">
                    행사의 몰입도를 위해 스탬프 투어는 이제 필수.
                    <br />
                    간편하게 내 행사에 스탬프 투어를 적용해 보세요.
                  </p>
                  <div className="flex gap-3.5 flex-wrap reveal delay-[160ms] transition-all duration-700 ease-[cubic-bezier(.2,.7,.2,1)] opacity-0 translate-y-6 [&.in]:opacity-100 [&.in]:translate-y-0 will-change-[transform,opacity]">
                    <a
                      href="#cta"
                      className="inline-flex items-center justify-center gap-2 font-sans font-bold border-0 cursor-pointer leading-none transition-all duration-120 ease-[cubic-bezier(.2,.7,.2,1)] whitespace-nowrap no-underline active:scale-[0.98] bg-gomin-primary-700 text-white hover:bg-gomin-primary-600 shadow-[0_10px_24px_rgba(84,53,235,0.24),0_2px_4px_rgba(84,53,235,0.12)] py-[17px] px-[30px] text-[17px] rounded-2xl"
                    >
                      시작하기
                      <ArrowRight className="ml-1 inline" />
                    </a>
                  </div>
                </div>
                <div className="relative flex justify-center max-lg:order-first reveal delay-[160ms] transition-all duration-700 ease-[cubic-bezier(.2,.7,.2,1)] opacity-0 translate-y-6 [&.in]:opacity-100 [&.in]:translate-y-0 will-change-[transform,opacity]">
                  <div className="absolute inset-0 z-0 pointer-events-none before:content-[''] before:absolute before:w-[70%] before:h-[70%] before:left-[15%] before:top-[12%] before:bg-[radial-gradient(circle,var(--primary-200)_0%,transparent_68%)] before:filter before:blur-[10px] before:opacity-70"></div>
                  {/* Premium Live Mockup for Hero A */}
                  <div className="relative w-full aspect-[9/19.2] bg-[#0e0e12] rounded-[42px] p-[11px] shadow-[0_40px_80px_-24px_rgba(20,12,60,0.45),0_6px_16px_rgba(17,17,17,0.18)] max-w-[332px] max-md:max-w-[280px] max-sm:max-w-[240px]">
                    <div className="relative w-full h-full rounded-[32px] overflow-hidden bg-slate-50 flex flex-col"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===================== PROBLEM ===================== */}
        <section
          className="bg-gomin-neutral-100/50 py-[clamp(72px,9vw,120px)] px-0 relative"
          id="problem"
        >
          <div className="max-w-[1200px] mx-auto px-8 max-md:px-5 max-sm:px-4">
            <div className="max-w-[720px] mx-auto mb-14 text-center flex flex-col items-center gap-4">
              <span className="inline-flex items-center gap-2.25 text-[13px] font-bold tracking-wider text-gomin-primary-700 before:content-[''] before:w-1.75 before:h-1.75 before:rounded-full before:bg-gomin-primary-700 before:shadow-[0_0_0_4px_var(--primary-100)] reveal transition-all duration-700 ease-[cubic-bezier(.2,.7,.2,1)] opacity-0 translate-y-6 [&.in]:opacity-100 [&.in]:translate-y-0 will-change-[transform,opacity]">
                스탬프 투어 기존 방식의 문제점
              </span>
              <h2 className="font-extrabold text-[clamp(30px,3.6vw,46px)] leading-[1.18] font-nanum break-keep word-keep-all reveal delay-[80ms] transition-all duration-700 ease-[cubic-bezier(.2,.7,.2,1)] opacity-0 translate-y-6 [&.in]:opacity-100 [&.in]:translate-y-0 will-change-[transform,opacity]">
                실물 스탬프 투어,
                <br />
                이제는 한계가 분명합니다
              </h2>
              <p className="text-[clamp(16px,1.5vw,18px)] text-gomin-neutral-600 max-w-[56ch] leading-1.6 break-keep word-keep-all reveal delay-[160ms] transition-all duration-700 ease-[cubic-bezier(.2,.7,.2,1)] opacity-0 translate-y-6 [&.in]:opacity-100 [&.in]:translate-y-0 will-change-[transform,opacity]">
                종이와 도장에 묶인 운영은 행사의 몰입을 깨뜨립니다. Stamplo는
                웹과 QR로 그 마찰을 없앱니다.
              </p>
            </div>

            <div className="grid grid-cols-[1fr_auto_1fr] gap-7 items-stretch max-lg:grid-cols-1 max-lg:gap-2">
              <div className="flex flex-col gap-4 reveal delay-[80ms] transition-all duration-700 ease-[cubic-bezier(.2,.7,.2,1)] opacity-0 translate-y-6 [&.in]:opacity-100 [&.in]:translate-y-0 will-change-[transform,opacity]">
                <div className="flex items-center gap-2.25 text-sm font-bold text-red-500 mb-0.5">
                  <XCircle className="inline text-rose-500" />
                  실물 스탬프 투어의 문제
                </div>
                <div className="bg-white border border-gomin-neutral-100/60 rounded-[18px] p-6 flex gap-4 items-start shadow-[0_1px_2px_rgba(17,17,17,0.04),0_1px_1px_rgba(17,17,17,0.03)]">
                  <div className="w-[46px] h-[46px] shrink-0 rounded-[13px] flex items-center justify-center bg-red-50 text-red-500">
                    <Scroll />
                  </div>
                  <div>
                    <div className="text-[17px] font-bold font-nanum break-keep word-keep-all">
                      종이 훼손 문제
                    </div>
                    <div className="text-sm text-gomin-neutral-500 mt-1.25 leading-[1.55] break-keep word-keep-all">
                      비에 젖고 찢어지는 종이 스탬프지. 분실하면 그동안의 참여
                      기록이 한순간에 사라집니다.
                    </div>
                  </div>
                </div>
                <div className="bg-white border border-gomin-neutral-100/60 rounded-[18px] p-6 flex gap-4 items-start shadow-[0_1px_2px_rgba(17,17,17,0.04),0_1px_1px_rgba(17,17,17,0.03)]">
                  <div className="w-[46px] h-[46px] shrink-0 rounded-[13px] flex items-center justify-center bg-red-50 text-red-500">
                    <Users />
                  </div>
                  <div>
                    <div className="text-[17px] font-bold font-nanum break-keep word-keep-all">
                      대기열 · 행사 병목
                    </div>
                    <div className="text-sm text-gomin-neutral-500 mt-1.25 leading-[1.55] break-keep word-keep-all">
                      도장 부스 앞에 줄이 길어지면 동선이 막히고, 참여자의
                      몰입과 만족도가 함께 떨어집니다.
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-center text-gomin-neutral-300 max-lg:rotate-90 max-lg:py-2 reveal delay-[160ms] transition-all duration-700 ease-[cubic-bezier(.2,.7,.2,1)] opacity-0 translate-y-6 [&.in]:opacity-100 [&.in]:translate-y-0 will-change-[transform,opacity]">
                <ArrowRight className="inline w-[34px] h-[34px] stroke-[1.6]" />
              </div>

              <div className="flex flex-col gap-4 reveal delay-[160ms] transition-all duration-700 ease-[cubic-bezier(.2,.7,.2,1)] opacity-0 translate-y-6 [&.in]:opacity-100 [&.in]:translate-y-0 will-change-[transform,opacity]">
                <div className="flex items-center gap-2.25 text-sm font-bold text-emerald-500 mb-0.5">
                  <CheckCircle2 className="inline text-emerald-500" />
                  Stamplo의 해결
                </div>
                <div className="bg-gradient-to-br from-[#5f41ee] to-[#5435EB] text-white rounded-[18px] p-7 shadow-[0_10px_24px_rgba(84,53,235,0.24),0_2px_4px_rgba(84,53,235,0.12)] flex flex-col gap-3.5 h-full justify-center relative overflow-hidden after:content-[''] after:absolute after:-right-[50px] after:-bottom-[50px] after:w-[170px] after:h-[170px] after:rounded-full after:bg-white/10">
                  <div className="w-[50px] h-[50px] rounded-2xl bg-white/16 flex items-center justify-center relative z-10">
                    <QrCode className="w-6.5 h-6.5" />
                  </div>
                  <div className="font-nanum font-extrabold text-[21px] relative z-10 break-keep word-keep-all">
                    웹서비스와 QR코드로 해결
                  </div>
                  <div className="text-[14.5px] text-white/88 leading-[1.6] relative z-10 break-keep word-keep-all">
                    설치할 앱도, 나눠줄 종이도 없습니다. 참여자는 QR을 스캔해
                    바로 스탬프를 받고, 운영자는 부스 없이 동선을 흐르게
                    만듭니다.
                  </div>
                  <div className="flex gap-2 flex-wrap relative z-10 mt-0.5">
                    <span className="text-[12.5px] font-bold py-1.5 px-3 rounded-full bg-white/16">
                      종이 없음
                    </span>
                    <span className="text-[12.5px] font-bold py-1.5 px-3 rounded-full bg-white/16">
                      대기열 없음
                    </span>
                    <span className="text-[12.5px] font-bold py-1.5 px-3 rounded-full bg-white/16">
                      분실 걱정 없음
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===================== USAGE — 3 steps ===================== */}
        <section
          className="py-[clamp(72px,9vw,120px)] px-0 relative"
          id="usage"
        >
          <div className="max-w-[1200px] mx-auto px-8 max-md:px-5 max-sm:px-4">
            <div className="max-w-[720px] mx-auto mb-14 text-center flex flex-col items-center gap-4">
              <span className="inline-flex items-center gap-2.25 text-[13px] font-bold tracking-wider text-gomin-primary-700 before:content-[''] before:w-1.75 before:h-1.75 before:rounded-full before:bg-gomin-primary-700 before:shadow-[0_0_0_4px_var(--primary-100)] reveal transition-all duration-700 ease-[cubic-bezier(.2,.7,.2,1)] opacity-0 translate-y-6 [&.in]:opacity-100 [&.in]:translate-y-0 will-change-[transform,opacity]">
                유저 사용 방법
              </span>
              <h2 className="font-extrabold text-[clamp(30px,3.6vw,46px)] leading-[1.18] font-nanum break-keep word-keep-all reveal delay-[80ms] transition-all duration-700 ease-[cubic-bezier(.2,.7,.2,1)] opacity-0 translate-y-6 [&.in]:opacity-100 [&.in]:translate-y-0 will-change-[transform,opacity]">
                스캔하고, 모으고, 보상받기까지 3단계
              </h2>
              <p className="text-[clamp(16px,1.5vw,18px)] text-gomin-neutral-600 max-w-[56ch] leading-1.6 break-keep word-keep-all reveal delay-[160ms] transition-all duration-700 ease-[cubic-bezier(.2,.7,.2,1)] opacity-0 translate-y-6 [&.in]:opacity-100 [&.in]:translate-y-0 will-change-[transform,opacity]">
                참여자는 별도 설치 없이, 행사장에서 휴대폰만 있으면 됩니다.
              </p>
            </div>

            <div className="grid grid-cols-[1fr_auto_1fr_auto_1fr] gap-2 items-start max-lg:grid-cols-1 max-lg:gap-10">
              {/* Step 1: Scan QR */}
              <div className="flex flex-col items-center gap-[22px] reveal delay-[80ms] transition-all duration-700 ease-[cubic-bezier(.2,.7,.2,1)] opacity-0 translate-y-6 [&.in]:opacity-100 [&.in]:translate-y-0 will-change-[transform,opacity]">
                <div className="relative w-full aspect-[9/19.2] bg-[#0e0e12] rounded-[42px] p-[11px] shadow-[0_40px_80px_-24px_rgba(20,12,60,0.45),0_6px_16px_rgba(17,17,17,0.18)] max-w-[250px] max-xs:max-w-[240px]">
                  <div className="relative w-full h-full rounded-[32px] overflow-hidden bg-slate-900 flex flex-col">
                    {/* Live Camera Scanner UI */}
                    <div className="absolute inset-0 bg-slate-950 flex flex-col justify-between p-4 z-0">
                      {/* Scanner guide boundary */}
                      <div className="my-auto mx-auto w-40 h-40 border-2 border-emerald-400 rounded-2xl relative flex items-center justify-center">
                        <div
                          className="absolute -inset-1 border border-emerald-400/30 rounded-3xl animate-ping will-change-[transform,opacity]"
                          style={{ animationDuration: "3s" }}
                        ></div>
                        <QrCode className="text-emerald-400/30 w-16 h-16" />

                        {/* Scanning beam animation */}
                        <div className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-emerald-400 to-transparent top-0 animate-[bounce_2s_infinite] will-change-[transform,opacity]"></div>
                      </div>

                      {/* Text */}
                      <div className="text-center text-white shrink-0 mt-2">
                        <p className="text-xs font-semibold">
                          QR 코드를 스캔하세요
                        </p>
                        <p className="text-[10px] text-slate-400 mt-1">
                          포스터나 배너의 QR을 감지하면 자동 스탬프가
                          지급됩니다.
                        </p>
                      </div>
                    </div>
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

              <div className="flex items-center justify-center pt-[220px] text-gomin-primary-300 max-lg:pt-0 max-lg:rotate-90 reveal delay-[160ms] transition-all duration-700 ease-[cubic-bezier(.2,.7,.2,1)] opacity-0 translate-y-6 [&.in]:opacity-100 [&.in]:translate-y-0 will-change-[transform,opacity]">
                <ArrowRight className="inline w-[30px] h-[30px] stroke-[1.8]" />
              </div>

              {/* Step 2: Collect Stamp */}
              <div className="flex flex-col items-center gap-[22px] reveal delay-[160ms] transition-all duration-700 ease-[cubic-bezier(.2,.7,.2,1)] opacity-0 translate-y-6 [&.in]:opacity-100 [&.in]:translate-y-0 will-change-[transform,opacity]">
                <div className="relative w-full aspect-[9/19.2] bg-[#0e0e12] rounded-[42px] p-[11px] shadow-[0_40px_80px_-24px_rgba(20,12,60,0.45),0_6px_16px_rgba(17,17,17,0.18)] max-w-[250px] max-xs:max-w-[240px]">
                  <div className="relative w-full h-full rounded-[32px] overflow-hidden bg-slate-50 flex flex-col">
                    {/* Event Banner */}
                    <div className="relative h-20 shrink-0 bg-[#5435EB] overflow-hidden flex items-center justify-center">
                      <Image
                        src="/images/landing/landing_poster.png"
                        alt="Poster"
                        fill
                        sizes="(max-width: 768px) 100vw, 250px"
                        className="object-cover opacity-80"
                      />
                      <div className="absolute inset-0 bg-black/40"></div>
                      <div className="absolute bottom-2 left-3 text-white">
                        <h4 className="text-xs font-bold leading-none">
                          NEON TRACKS
                        </h4>
                      </div>
                    </div>

                    <div className="p-3 flex-1 flex flex-col justify-between">
                      {/* Stamp Grid */}
                      <div className="bg-white rounded-lg p-3 border border-slate-100 shadow-sm flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-center mb-1.5">
                            <span className="text-[9px] font-bold text-slate-400">
                              STAMP CHECK
                            </span>
                            <span className="text-[10px] font-extrabold text-[#5435EB]">
                              3 / 6 completed
                            </span>
                          </div>

                          {/* Live representation of the user image decoded from base64 */}
                          <div className="grid grid-cols-3 gap-2">
                            {[1, 2].map((i) => (
                              <div
                                key={i}
                                className="aspect-square rounded-md bg-[#F3F1FE] border border-[#D9D3F9] flex items-center justify-center p-1 relative overflow-hidden"
                              >
                                <Image
                                  src="/images/landing/landing_stamp.png"
                                  alt="stamp"
                                  fill
                                  sizes="80px"
                                  className="object-contain p-1"
                                />
                              </div>
                            ))}
                            {/* The base64 Decoded custom Image from bundle */}
                            <div className="aspect-square rounded-md bg-[#F3F1FE] border border-[#D9D3F9] flex items-center justify-center p-1 relative overflow-hidden">
                              <Image
                                src="/images/landing/usage_stamp.webp"
                                alt="Decoded Stamp"
                                fill
                                sizes="80px"
                                className="object-contain p-1"
                              />
                            </div>
                            {[4, 5, 6].map((i) => (
                              <div
                                key={i}
                                className="aspect-square rounded-md bg-slate-50 border border-dashed border-slate-200 flex items-center justify-center"
                              >
                                <span className="text-slate-300 text-[10px] font-bold">
                                  {i}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="mt-2.5">
                          <div className="w-full bg-slate-100 rounded-full h-1 overflow-hidden">
                            <div
                              className="bg-[#5435EB] h-full rounded-full"
                              style={{ width: "50%" }}
                            ></div>
                          </div>
                        </div>
                      </div>
                      <div className="mt-2">
                        <button className="w-full bg-[#5435EB] text-white text-[10px] font-bold py-1.5 rounded shadow flex items-center justify-center gap-1">
                          <QrCode size={10} />
                          스탬프 추가 적립
                        </button>
                      </div>
                    </div>
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
                    스캔과 동시에 스탬프가 카드에 채워집니다. 종이도, 도장도
                    필요 없어요.
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-center pt-[220px] text-gomin-primary-300 max-lg:pt-0 max-lg:rotate-90 reveal delay-[240ms] transition-all duration-700 ease-[cubic-bezier(.2,.7,.2,1)] opacity-0 translate-y-6 [&.in]:opacity-100 [&.in]:translate-y-0 will-change-[transform,opacity]">
                <ArrowRight className="inline w-[30px] h-[30px] stroke-[1.8]" />
              </div>

              {/* Step 3: Complete / Reward */}
              <div className="flex flex-col items-center gap-[22px] reveal delay-[240ms] transition-all duration-700 ease-[cubic-bezier(.2,.7,.2,1)] opacity-0 translate-y-6 [&.in]:opacity-100 [&.in]:translate-y-0 will-change-[transform,opacity]">
                <div className="relative w-full aspect-[9/19.2] bg-[#0e0e12] rounded-[42px] p-[11px] shadow-[0_40px_80px_-24px_rgba(20,12,60,0.45),0_6px_16px_rgba(17,17,17,0.18)] max-w-[250px] max-xs:max-w-[240px]">
                  <div className="relative w-full h-full rounded-[32px] overflow-hidden bg-slate-100 flex flex-col">
                    {/* Header */}
                    <div className="h-8 bg-white border-b border-slate-100 flex items-center px-3 justify-between shrink-0">
                      <span className="text-[10px] font-bold text-slate-400">
                        MISSION END
                      </span>
                    </div>

                    {/* Stamp fully filled in background */}
                    <div className="p-3 opacity-30 flex-1 flex flex-col justify-between pointer-events-none">
                      <div className="bg-white rounded-lg p-3 flex-1 flex flex-col justify-between">
                        <div className="grid grid-cols-3 gap-2">
                          {[1, 2, 3, 4, 5, 6].map((i) => (
                            <div
                              key={i}
                              className="aspect-square rounded-md bg-[#F3F1FE] border border-[#D9D3F9] flex items-center justify-center p-1 relative overflow-hidden"
                            >
                              <Image
                                src="/images/landing/landing_stamp.png"
                                alt="stamp"
                                fill
                                sizes="80px"
                                className="object-contain p-1"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Popup overlay reward modal */}
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center p-4 z-10">
                      <div className="bg-white rounded-2xl p-4 w-full text-center shadow-2xl flex flex-col items-center gap-2.5 animate-[bounce_1s_1] border border-slate-50">
                        <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                          <Award size={20} />
                        </div>
                        <div>
                          <h4 className="text-xs font-black text-slate-800 leading-tight">
                            미션 달성 완료!
                          </h4>
                          <p className="text-[9px] text-slate-400 mt-1 leading-normal">
                            모든 스탬프 투어를 완주하셨습니다. 아래 보상을
                            수령하세요.
                          </p>
                        </div>

                        {/* Coupon card wrapper */}
                        <div className="w-full bg-[#F3F1FE] rounded-lg p-2.5 border border-[#D9D3F9] flex items-center gap-2">
                          <div className="w-8 h-8 rounded bg-white border border-[#D9D3F9] flex items-center justify-center text-[#5435EB] font-bold text-[10px]">
                            COUPON
                          </div>
                          <div className="text-left">
                            <p className="text-[10px] font-bold text-slate-700 leading-tight">
                              무료 아메리카노 교환권
                            </p>
                            <p className="text-[8px] text-[#5435EB] mt-0.5 leading-none">
                              리워드 데스크에서 교환하세요
                            </p>
                          </div>
                        </div>

                        <button className="w-full bg-emerald-500 hover:bg-emerald-600 text-white text-[10px] font-bold py-2 rounded shadow transition-colors">
                          교환용 QR 코드 보기
                        </button>
                      </div>
                    </div>
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

        {/* ===================== DATA ===================== */}
        <section
          className="bg-[#F3F1FE] py-[clamp(72px,9vw,120px)] px-0 relative"
          id="data"
        >
          <div className="max-w-[1200px] mx-auto px-8 max-md:px-5 max-sm:px-4">
            <div className="grid grid-cols-[0.86fr_1.14fr] gap-14 items-center max-lg:grid-cols-1 max-lg:gap-10">
              <div className="flex flex-col gap-[22px]">
                <span className="inline-flex items-center gap-2.25 text-[13px] font-bold tracking-wider text-gomin-primary-700 before:content-[''] before:w-1.75 before:h-1.75 before:rounded-full before:bg-gomin-primary-700 before:shadow-[0_0_0_4px_var(--primary-100)] reveal transition-all duration-700 ease-[cubic-bezier(.2,.7,.2,1)] opacity-0 translate-y-6 [&.in]:opacity-100 [&.in]:translate-y-0 will-change-[transform,opacity]">
                  디테일한 데이터 분석
                </span>
                <h2 className="font-extrabold text-[clamp(30px,3.6vw,46px)] leading-[1.18] font-nanum break-keep word-keep-all reveal delay-[80ms] transition-all duration-700 ease-[cubic-bezier(.2,.7,.2,1)] opacity-0 translate-y-6 [&.in]:opacity-100 [&.in]:translate-y-0 will-change-[transform,opacity]">
                  행사가 끝나면
                  <br />
                  인사이트가 남습니다
                </h2>
                <p className="text-[clamp(16px,1.5vw,18px)] text-gomin-neutral-600 max-w-[56ch] leading-1.6 break-keep word-keep-all reveal delay-[160ms] transition-all duration-700 ease-[cubic-bezier(.2,.7,.2,1)] opacity-0 translate-y-6 [&.in]:opacity-100 [&.in]:translate-y-0 will-change-[transform,opacity]">
                  실시간 대시보드로 참여 흐름을 한눈에. 다음 행사를 위한
                  데이터가 자동으로 쌓입니다.
                </p>
                <div className="flex flex-col gap-3.5 mt-1">
                  <div className="flex gap-3.5 items-start bg-white border border-gomin-neutral-100 rounded-2xl p-[16px_18px] shadow-[0_1px_2px_rgba(17,17,17,0.04),0_1px_1px_rgba(17,17,17,0.03)] reveal delay-[160ms] transition-all duration-700 ease-[cubic-bezier(.2,.7,.2,1)] opacity-0 translate-y-6 [&.in]:opacity-100 [&.in]:translate-y-0 will-change-[transform,opacity]">
                    <div className="w-10 h-10 shrink-0 rounded-xl bg-gomin-primary-100 text-gomin-primary-700 flex items-center justify-center">
                      <Clock />
                    </div>
                    <div>
                      <div className="text-base font-bold font-nanum break-keep word-keep-all">
                        시간대별 · 연령별 데이터
                      </div>
                      <div className="text-[13.5px] text-gomin-neutral-500 mt-0.75 leading-1.5 break-keep word-keep-all">
                        언제, 누가 가장 활발히 참여했는지 한눈에 파악하세요.
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-3.5 items-start bg-white border border-gomin-neutral-100 rounded-2xl p-[16px_18px] shadow-[0_1px_2px_rgba(17,17,17,0.04),0_1px_1px_rgba(17,17,17,0.03)] reveal delay-[240ms] transition-all duration-700 ease-[cubic-bezier(.2,.7,.2,1)] opacity-0 translate-y-6 [&.in]:opacity-100 [&.in]:translate-y-0 will-change-[transform,opacity]">
                    <div className="w-10 h-10 shrink-0 rounded-xl bg-gomin-primary-100 text-gomin-primary-700 flex items-center justify-center">
                      <BarChart3 />
                    </div>
                    <div>
                      <div className="text-base font-bold font-nanum break-keep word-keep-all">
                        미션별 참여율 데이터
                      </div>
                      <div className="text-[13.5px] text-gomin-neutral-500 mt-0.75 leading-1.5 break-keep word-keep-all">
                        어떤 미션이 잘 통했는지, 어디서 이탈했는지 미션 단위로
                        확인하세요.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative flex justify-center max-lg:order-first reveal delay-[160ms] transition-all duration-700 ease-[cubic-bezier(.2,.7,.2,1)] opacity-0 translate-y-6 [&.in]:opacity-100 [&.in]:translate-y-0 will-change-[transform,opacity]">
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
                      stamplo.io/dashboard
                    </div>
                  </div>
                  <div className="aspect-[16/10] bg-slate-50 flex">
                    {/* Admin Mockup Sidebar */}
                    <div className="w-1/4 bg-slate-900 text-slate-400 p-2.5 flex flex-col gap-2 shrink-0 border-r border-slate-800 text-[10px]">
                      <div className="flex items-center gap-1.5 px-1.5 mb-2">
                        <span className="w-5 h-5 rounded bg-[#5435EB] flex items-center justify-center text-white font-bold text-[10px]">
                          S
                        </span>
                        <span className="font-extrabold text-white text-xs font-logo">
                          stamplo
                        </span>
                      </div>
                      <span className="bg-slate-800 text-white rounded px-2 py-1 flex items-center gap-1.5 font-bold">
                        <BarChart3 size={11} />
                        실시간 통계
                      </span>
                      <span className="px-2 py-1 flex items-center gap-1.5 hover:text-white cursor-pointer">
                        <Scroll size={11} />
                        미션 관리
                      </span>
                      <span className="px-2 py-1 flex items-center gap-1.5 hover:text-white cursor-pointer">
                        <QrCode size={11} />
                        QR 토큰 생성
                      </span>
                    </div>

                    {/* Admin Mockup Main Content */}
                    <div className="flex-1 p-3 flex flex-col gap-2.5 overflow-hidden">
                      {/* Top Metric Cards */}
                      <div className="grid grid-cols-3 gap-2 text-left">
                        <div className="bg-white rounded-lg p-2 border border-slate-100 shadow-sm">
                          <p className="text-[8px] text-slate-400 font-bold">
                            TOTAL VISITORS
                          </p>
                          <p className="text-sm font-extrabold text-slate-800 mt-0.5">
                            1,248명
                          </p>
                          <span className="text-[8px] font-bold text-emerald-500 bg-emerald-50 px-1 py-0.2 rounded">
                            +12%
                          </span>
                        </div>
                        <div className="bg-white rounded-lg p-2 border border-slate-100 shadow-sm">
                          <p className="text-[8px] text-slate-400 font-bold">
                            COMPLETION RATE
                          </p>
                          <p className="text-sm font-extrabold text-slate-800 mt-0.5">
                            78.4%
                          </p>
                          <span className="text-[8px] font-bold text-emerald-500 bg-emerald-50 px-1 py-0.2 rounded">
                            +4.2%
                          </span>
                        </div>
                        <div className="bg-white rounded-lg p-2 border border-slate-100 shadow-sm">
                          <p className="text-[8px] text-slate-400 font-bold">
                            REWARD CLAIMED
                          </p>
                          <p className="text-sm font-extrabold text-slate-800 mt-0.5">
                            980개
                          </p>
                          <span className="text-[8px] text-slate-400 font-bold">
                            / 1,000개 limit
                          </span>
                        </div>
                      </div>

                      {/* Main Chart Area */}
                      <div className="bg-white rounded-lg p-3 border border-slate-100 shadow-sm flex-1 flex flex-col justify-between">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-[9px] font-extrabold text-slate-700">
                            시간대별 실시간 참여량
                          </span>
                          <span className="text-[8px] text-slate-400">
                            Updated: Just now
                          </span>
                        </div>
                        {/* Live CSS bar chart */}
                        <div className="flex-1 flex items-end gap-2.5 pt-2 border-b border-slate-100 px-2 h-16">
                          <div className="flex-1 bg-slate-100 rounded-t h-4 flex justify-center relative group cursor-pointer">
                            <span className="absolute -top-4 text-[7px] font-bold opacity-0 group-hover:opacity-100 bg-slate-900 text-white rounded px-1">
                              10
                            </span>
                          </div>
                          <div className="flex-1 bg-slate-100 rounded-t h-8 flex justify-center relative group cursor-pointer">
                            <span className="absolute -top-4 text-[7px] font-bold opacity-0 group-hover:opacity-100 bg-slate-900 text-white rounded px-1">
                              32
                            </span>
                          </div>
                          <div className="flex-1 bg-[#BFB5ED] rounded-t h-12 flex justify-center relative group cursor-pointer">
                            <span className="absolute -top-4 text-[7px] font-bold opacity-0 group-hover:opacity-100 bg-slate-900 text-white rounded px-1">
                              50
                            </span>
                          </div>
                          <div className="flex-1 bg-[#8A77E7] rounded-t h-16 flex justify-center relative group cursor-pointer">
                            <span className="absolute -top-4 text-[7px] font-bold opacity-0 group-hover:opacity-100 bg-slate-900 text-white rounded px-1">
                              98
                            </span>
                          </div>
                          <div className="flex-1 bg-[#5435EB] rounded-t h-20 flex justify-center relative group cursor-pointer animate-pulse">
                            <span className="absolute -top-4 text-[7px] font-bold opacity-0 group-hover:opacity-100 bg-slate-900 text-white rounded px-1">
                              140
                            </span>
                          </div>
                          <div className="flex-1 bg-[#8A77E7] rounded-t h-14 flex justify-center relative group cursor-pointer">
                            <span className="absolute -top-4 text-[7px] font-bold opacity-0 group-hover:opacity-100 bg-slate-900 text-white rounded px-1">
                              75
                            </span>
                          </div>
                          <div className="flex-1 bg-[#BFB5ED] rounded-t h-10 flex justify-center relative group cursor-pointer">
                            <span className="absolute -top-4 text-[7px] font-bold opacity-0 group-hover:opacity-100 bg-slate-900 text-white rounded px-1">
                              45
                            </span>
                          </div>
                        </div>
                        <div className="flex justify-between text-[7px] text-slate-450 mt-1 px-1 font-bold">
                          <span>10:00</span>
                          <span>12:00</span>
                          <span>14:00</span>
                          <span>16:00</span>
                          <span>18:00</span>
                          <span>20:00</span>
                          <span>22:00</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===================== BUILDER ===================== */}
        <section
          className="py-[clamp(72px,9vw,120px)] px-0 relative"
          id="builder"
        >
          <div className="max-w-[1200px] mx-auto px-8 max-md:px-5 max-sm:px-4">
            <div className="max-w-[720px] mx-auto mb-14 text-center flex flex-col items-center gap-4">
              <span className="inline-flex items-center gap-2.25 text-[13px] font-bold tracking-wider text-gomin-primary-700 before:content-[''] before:w-1.75 before:h-1.75 before:rounded-full before:bg-gomin-primary-700 before:shadow-[0_0_0_4px_var(--primary-100)] reveal transition-all duration-700 ease-[cubic-bezier(.2,.7,.2,1)] opacity-0 translate-y-6 [&.in]:opacity-100 [&.in]:translate-y-0 will-change-[transform,opacity]">
                쉬운 페이지 만들기
              </span>
              <h2 className="font-extrabold text-[clamp(30px,3.6vw,46px)] leading-[1.18] font-nanum break-keep word-keep-all reveal delay-[80ms] transition-all duration-700 ease-[cubic-bezier(.2,.7,.2,1)] opacity-0 translate-y-6 [&.in]:opacity-100 [&.in]:translate-y-0 will-change-[transform,opacity]">
                이미지 두 장이면, 페이지가 완성됩니다
              </h2>
              <p className="text-[clamp(16px,1.5vw,18px)] text-gomin-neutral-600 max-w-[56ch] leading-1.6 break-keep word-keep-all reveal delay-[160ms] transition-all duration-700 ease-[cubic-bezier(.2,.7,.2,1)] opacity-0 translate-y-6 [&.in]:opacity-100 [&.in]:translate-y-0 will-change-[transform,opacity]">
                포스터 이미지와 스탬프 이미지만 준비되어 있다면 OK. 브랜드
                컬러를 입힌 디자인으로 누구든 쉽게 우리 행사를 드러내는 페이지를
                만들 수 있습니다.
              </p>
            </div>

            <div className="grid grid-cols-[0.9fr_auto_1.1fr] gap-8 items-center max-lg:grid-cols-1 max-lg:gap-7">
              <div className="flex flex-col gap-4.5 reveal delay-[80ms] transition-all duration-700 ease-[cubic-bezier(.2,.7,.2,1)] opacity-0 translate-y-6 [&.in]:opacity-100 [&.in]:translate-y-0 will-change-[transform,opacity]">
                <div className="flex flex-col gap-2.5">
                  <div className="flex items-center gap-2 text-sm font-bold text-gomin-neutral-600">
                    <ImageIcon className="w-[17px] h-[17px] text-gomin-primary-700" />
                    포스터 이미지
                  </div>
                  <div className="relative w-full rounded-2xl shadow-[0_4px_10px_rgba(17,17,17,0.06),0_1px_2px_rgba(17,17,17,0.04)] overflow-hidden bg-gomin-neutral-100/50 h-[200px]">
                    <Image
                      src="/images/landing/landing_poster.png"
                      alt="Festival Poster"
                      fill
                      sizes="(max-width: 768px) 100vw, 400px"
                      className="object-cover p-1"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-2.5">
                  <div className="flex items-center gap-2 text-sm font-bold text-gomin-neutral-600">
                    <Stamp className="w-[17px] h-[17px] text-gomin-primary-700" />
                    스탬프 이미지
                  </div>
                  <div className="flex gap-4 items-center">
                    <div className="relative w-full rounded-2xl shadow-[0_4px_10px_rgba(17,17,17,0.06),0_1px_2px_rgba(17,17,17,0.04)] overflow-hidden bg-gomin-neutral-100/50 h-[120px] w-[120px] rounded-xl flex items-center justify-center p-2">
                      <Image
                        src="/images/landing/landing_stamp.png"
                        alt="Stamp Badge"
                        fill
                        sizes="120px"
                        className="object-contain p-2"
                      />
                    </div>
                    <div>
                      <div className="flex gap-2 mt-1">
                        <i
                          className="w-[26px] h-[26px] rounded-lg border-2 border-white shadow-[0_1px_2px_rgba(17,17,17,0.04),0_1px_1px_rgba(17,17,17,0.03)]"
                          style={{ background: "#5435EB" }}
                        ></i>
                        <i
                          className="w-[26px] h-[26px] rounded-lg border-2 border-white shadow-[0_1px_2px_rgba(17,17,17,0.04),0_1px_1px_rgba(17,17,17,0.03)]"
                          style={{ background: "#1FA971" }}
                        ></i>
                        <i
                          className="w-[26px] h-[26px] rounded-lg border-2 border-white shadow-[0_1px_2px_rgba(17,17,17,0.04),0_1px_1px_rgba(17,17,17,0.03)]"
                          style={{ background: "#E59A0E" }}
                        ></i>
                        <i
                          className="w-[26px] h-[26px] rounded-lg border-2 border-white shadow-[0_1px_2px_rgba(17,17,17,0.04),0_1px_1px_rgba(17,17,17,0.03)]"
                          style={{ background: "#E5484D" }}
                        ></i>
                      </div>
                      <span className="text-[11px] font-bold text-slate-400 mt-1 inline-block">
                        브랜드 컬러 적용 가능
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-center gap-2.5 text-gomin-primary-400 max-lg:rotate-90 reveal delay-[160ms] transition-all duration-700 ease-[cubic-bezier(.2,.7,.2,1)] opacity-0 translate-y-6 [&.in]:opacity-100 [&.in]:translate-y-0 will-change-[transform,opacity]">
                <div className="text-[12.5px] font-bold text-gomin-primary-700 bg-gomin-primary-100 py-1.25 px-3 rounded-full">
                  자동 생성
                </div>
                <ArrowRight className="inline w-[34px] h-[34px] stroke-[1.7]" />
              </div>

              <div className="flex justify-center reveal delay-[160ms] transition-all duration-700 ease-[cubic-bezier(.2,.7,.2,1)] opacity-0 translate-y-6 [&.in]:opacity-100 [&.in]:translate-y-0 will-change-[transform,opacity]">
                <div className="relative w-full aspect-[9/19.2] bg-[#0e0e12] rounded-[42px] p-[11px] shadow-[0_40px_80px_-24px_rgba(20,12,60,0.45),0_6px_16px_rgba(17,17,17,0.18)] max-w-[270px] max-xs:max-w-[240px]">
                  <div className="relative w-full h-full rounded-[32px] overflow-hidden bg-slate-50 flex flex-col">
                    {/* Header */}
                    <div className="h-10 bg-white border-b border-slate-100 flex items-center px-4 justify-between shrink-0">
                      <span className="text-xs font-bold text-[#5435EB] tracking-wide font-logo">
                        stamplo
                      </span>
                      <div className="flex gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-200"></span>
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-200"></span>
                      </div>
                    </div>

                    {/* Result Page preview content */}
                    <div className="relative aspect-[4/3] shrink-0 bg-[#5435EB] overflow-hidden flex items-center justify-center">
                      <Image
                        src="/images/landing/landing_poster.png"
                        alt="Poster"
                        fill
                        sizes="(max-width: 768px) 100vw, 300px"
                        className="object-cover opacity-90"
                      />
                      <div className="absolute inset-0 bg-black/50"></div>
                      <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-3 text-white">
                        <h4 className="text-sm font-extrabold leading-tight">
                          NEON TRACKS FESTIVAL
                        </h4>
                        <p className="text-[9px] opacity-80 mt-1">
                          인사이드 스테이지 스탬프 랠리
                        </p>
                      </div>
                    </div>

                    {/* Stamp collection container with the newly generated stamp */}
                    <div className="p-3.5 flex-1 flex flex-col justify-between">
                      <div className="bg-white rounded-xl p-3 border border-slate-100 shadow-sm flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-center mb-1.5">
                            <span className="text-[9px] text-slate-400 font-bold">
                              MY ACHIEVEMENTS
                            </span>
                            <span className="text-[10px] font-extrabold text-[#5435EB]">
                              2 / 4 collected
                            </span>
                          </div>

                          {/* 4 slots grid for a customized look */}
                          <div className="grid grid-cols-2 gap-3 py-1">
                            <div className="aspect-[4/3] rounded-lg bg-[#F3F1FE] border border-[#D9D3F9] flex items-center justify-center p-1.5 relative overflow-hidden">
                              <Image
                                src="/images/landing/landing_stamp.png"
                                alt="Stamp"
                                fill
                                sizes="120px"
                                className="object-contain p-1.5"
                              />
                            </div>
                            <div className="aspect-[4/3] rounded-lg bg-[#F3F1FE] border border-[#D9D3F9] flex items-center justify-center p-1.5 relative overflow-hidden">
                              <Image
                                src="/images/landing/landing_stamp.png"
                                alt="Stamp"
                                fill
                                sizes="120px"
                                className="object-contain p-1.5"
                              />
                            </div>
                            <div className="aspect-[4/3] rounded-lg bg-slate-50 border border-dashed border-slate-200 flex items-center justify-center">
                              <span className="text-slate-350 text-[10px] font-bold">
                                3
                              </span>
                            </div>
                            <div className="aspect-[4/3] rounded-lg bg-slate-50 border border-dashed border-slate-200 flex items-center justify-center">
                              <span className="text-slate-350 text-[10px] font-bold">
                                4
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="w-full bg-slate-100 rounded-full h-1 overflow-hidden mt-2">
                          <div
                            className="bg-[#5435EB] h-full rounded-full"
                            style={{ width: "50%" }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===================== VALUE BAND / CTA ===================== */}
        <section
          className="bg-gradient-to-br from-[#5f41ee] via-[#5435EB] to-[#4226c9] text-white text-center overflow-hidden relative before:content-[''] before:absolute before:-left-[140px] before:-top-[100px] before:w-[440px] before:h-[440px] before:rounded-full before:bg-[radial-gradient(circle,rgba(255,255,255,0.12)_0%,transparent_65%)] after:content-[''] after:absolute after:-right-[160px] after:-bottom-[160px] after:w-[480px] after:h-[480px] after:rounded-full after:bg-[radial-gradient(circle,rgba(255,255,255,0.10)_0%,transparent_65%)] py-0 px-0"
          id="cta"
        >
          <div className="max-w-[1200px] mx-auto px-8 max-md:px-5 max-sm:px-4">
            <div className="py-[clamp(80px,11vw,150px)] px-0 relative z-10 flex flex-col items-center gap-[30px]">
              <Image
                src="/images/landing/logo_stamplo_white.svg"
                alt="Stamplo"
                width={64}
                height={64}
                className="w-16 h-16 reveal transition-all duration-700 ease-[cubic-bezier(.2,.7,.2,1)] opacity-0 translate-y-6 [&.in]:opacity-100 [&.in]:translate-y-0 will-change-[transform,opacity]"
                unoptimized
              />
              <span className="inline-flex items-center gap-2.25 text-[13px] font-bold tracking-wider text-white before:content-[''] before:w-1.75 before:h-1.75 before:rounded-full before:bg-white before:shadow-[0_0_0_4px_rgba(255,255,255,0.18)] reveal transition-all duration-700 ease-[cubic-bezier(.2,.7,.2,1)] opacity-0 translate-y-6 [&.in]:opacity-100 [&.in]:translate-y-0 will-change-[transform,opacity]">
                핵심 가치
              </span>
              <h2 className="text-white font-extrabold text-[clamp(32px,4.6vw,60px)] leading-[1.18] font-nanum break-keep word-keep-all reveal delay-[80ms] transition-all duration-700 ease-[cubic-bezier(.2,.7,.2,1)] opacity-0 translate-y-6 [&.in]:opacity-100 [&.in]:translate-y-0 will-change-[transform,opacity]">
                누구나 쉽게, 무료로
                <br />
                몰입감 있는 행사를 만들 수 있도록
              </h2>
              <p className="text-white/86 text-[clamp(16px,1.6vw,20px)] max-w-[52ch] leading-normal break-keep word-keep-all reveal delay-[160ms] transition-all duration-700 ease-[cubic-bezier(.2,.7,.2,1)] opacity-0 translate-y-6 [&.in]:opacity-100 [&.in]:translate-y-0 will-change-[transform,opacity]">
                Stamplo는 스탬프 투어의 모든 마찰을 없앱니다.
                <br />
                포스터 한 장으로 시작해, 데이터로 남기세요.
              </p>
              <div className="flex gap-3.5 flex-wrap justify-center reveal delay-[160ms] transition-all duration-700 ease-[cubic-bezier(.2,.7,.2,1)] opacity-0 translate-y-6 [&.in]:opacity-100 [&.in]:translate-y-0 will-change-[transform,opacity]">
                <a
                  href="mailto:gominpeople26@gmail.com"
                  className="inline-flex items-center justify-center gap-2 font-sans font-bold border-0 cursor-pointer leading-none transition-all duration-120 ease-[cubic-bezier(.2,.7,.2,1)] whitespace-nowrap no-underline active:scale-[0.98] bg-white text-gomin-primary-700 hover:bg-[#f2efff] py-[17px] px-[30px] text-[17px] rounded-2xl"
                >
                  무료로 시작하기
                  <ArrowRight className="ml-1 inline" />
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ===================== FOOTER ===================== */}
      <footer className="bg-[#0e0d14] text-white/70 py-[60px] px-0 pb-10">
        <div className="max-w-[1200px] mx-auto px-8 max-md:px-5 max-sm:px-4">
          <div className="flex justify-between items-start gap-10 flex-wrap max-md:flex-col max-md:gap-8">
            <div>
              <a className="flex items-center gap-2.5 no-underline" href="#top">
                <Image
                  src="/images/landing/logo_stamplo_white.svg"
                  alt="Stamplo 로고"
                  width={32}
                  height={32}
                  unoptimized
                />
                <span className="font-[var(--font-monomaniac-one)] text-[25px] tracking-[0.01em] text-white leading-none pt-[3px]">
                  stamplo
                </span>
              </a>
              <p className="text-sm text-white/55 mt-3.5 max-w-[34ch] leading-1.6 break-keep word-keep-all">
                누구나 무료로 쉽게 시작하는 스탬프 투어 플랫폼. 종이 없이, 줄
                서지 않고, 데이터로 남기는 행사.
              </p>
            </div>
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
            <div className="flex flex-col gap-3.5 items-start">
              <span className="text-[13px] font-bold text-white/45 tracking-wider">
                지금 시작하기
              </span>
              <a
                href="mailto:gominpeople26@gmail.com"
                className="inline-flex items-center justify-center gap-2 font-sans font-bold text-base border-0 rounded-xl cursor-pointer py-3.5 px-6 leading-none transition-all duration-120 ease-[cubic-bezier(.2,.7,.2,1)] whitespace-nowrap no-underline active:scale-[0.98] bg-gomin-primary-700 text-white hover:bg-gomin-primary-600 shadow-[0_10px_24px_rgba(84,53,235,0.24),0_2px_4px_rgba(84,53,235,0.12)]"
              >
                무료로 시작하기
                <ArrowRight className="ml-1 inline" />
              </a>
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
    </>
  );
}
