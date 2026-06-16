"use client";

import { useEffect, useState, useMemo, useRef } from "react";
import Image from "next/image";
import { cn, generatePalette, hslToHex, hexToHsl } from "@/utils";
import StamploLogo from "@/components/admin/common/StamploLogo";
import ThemePreviewPanel from "@/components/admin/event/themeStamp/ThemePreviewPanel";
import AnimatedIconStamplo from "@/components/icons/AnimatedIconStamplo";
import {
  ArrowRight,
  CheckCircle2,
  XCircle,
  Scroll,
  Users,
  QrCode,
  BarChart3,
  Clock,
  Lock,
  Info,
  Plus,
  X,
} from "lucide-react";

// 모듈 레벨 — React cleanup과 완전히 독립적으로 유지됨
let _revealIo: IntersectionObserver | null = null;

const inViewport = (el: Element): boolean => {
  if (typeof window === "undefined") return false;
  const r = el.getBoundingClientRect();
  const vh = window.innerHeight || document.documentElement.clientHeight;
  return r.top < vh && r.bottom > 0;
};

const runReveal = (forceAll = false): void => {
  if (typeof document === "undefined") return;

  const elements = Array.from(document.querySelectorAll<Element>(".reveal"));
  if (elements.length === 0) return; // 아직 DOM 없음 → 다음 트리거에서 처리

  _revealIo?.disconnect();

  if (forceAll) {
    elements.forEach((el) => el.setAttribute("data-in", "true"));
    return;
  }

  elements.forEach((el) => {
    if (inViewport(el)) el.setAttribute("data-in", "true");
  });

  _revealIo = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.setAttribute("data-in", "true");
          _revealIo?.unobserve(entry.target);
        }
      });
    },
    { rootMargin: "0px 0px -8% 0px", threshold: 0.05 }
  );
  elements.forEach((el) => {
    if (el.getAttribute("data-in") !== "true") _revealIo!.observe(el);
  });
};

const isRestore = (persisted: boolean): boolean => {
  if (persisted) return true;
  const nav = performance.getEntriesByType("navigation")[0] as
    | PerformanceNavigationTiming
    | undefined;
  return nav?.type === "back_forward"; // persisted=false여도 뒤로가기면 복원
};

if (typeof window !== "undefined") {
  window.addEventListener("pageshow", (e: Event) => {
    const restore = isRestore((e as PageTransitionEvent).persisted);
    runReveal(restore);
    // DOM/스크롤 복원이 늦게 끝나는 경우 대비, 다음 프레임에 한 번 더
    requestAnimationFrame(() => runReveal(restore));
  });
}

export default function LandingPage() {
  const [isScrolled, setIsScrolled] = useState(false);

  // 어드민 Step 3 (EventThemeStampForm) 행사 생성 체험용 상태
  const [stampImage, setStampImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [h, setH] = useState(250); // Stamplo 기본 브랜드 퍼플 컬러 #5435EB의 H

  const keyColor = useMemo(() => {
    return hslToHex(h, 85, 50);
  }, [h]);

  const palette = useMemo(() => {
    try {
      return generatePalette(keyColor);
    } catch {
      return generatePalette("#5435EB");
    }
  }, [keyColor]);

  const [isFocused, setIsFocused] = useState(false);
  const [typingValue, setTypingValue] = useState("");

  const handleStampFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const ext = file.name.split(".").pop()?.toLowerCase();
    const allowedExtensions = ["png", "jpg", "jpeg", "webp"];
    const allowedMimeTypes = ["image/png", "image/jpeg", "image/webp"];
    if (
      !ext ||
      !allowedExtensions.includes(ext) ||
      !allowedMimeTypes.includes(file.type)
    ) {
      alert(
        "지원하지 않는 파일 형식입니다. (png, jpg, jpeg, webp 이미지만 업로드 가능)"
      );
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("파일 크기는 5MB 이하여야 합니다.");
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }

    if (stampImage) {
      URL.revokeObjectURL(stampImage);
    }

    const localUrl = URL.createObjectURL(file);
    setStampImage(localUrl);
  };

  const handleStampRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (stampImage) {
      URL.revokeObjectURL(stampImage);
    }
    setStampImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const triggerFileInput = () => fileInputRef.current?.click();

  const handleHexInputChange = (val: string) => {
    const cleanHex = val.replace(/[^0-9a-fA-F]/g, "");
    const formattedInput = `#${cleanHex}`;
    setTypingValue(formattedInput);

    const isValidHexFormat = cleanHex.length === 3 || cleanHex.length === 6;
    if (isValidHexFormat) {
      try {
        const [parsedH] = hexToHsl(formattedInput);
        setH(Math.round(parsedH));
      } catch {
        // 타이핑 시 에러 무시
      }
    }
  };

  // Scroll event for sticky nav border/shadow
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 8);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    runReveal(); // 첫 로드 애니메이션 (복구는 pageshow가 담당)
    return () => {
      _revealIo?.disconnect();
      _revealIo = null;
    };
  }, []);

  return (
    <>
      {/* ===================== NAV ===================== */}
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
              페이지 만들기
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

      <main id="top">
        {/* ===================== HERO ===================== */}
        <section
          className="pt-[clamp(48px,7vw,88px)] pb-[clamp(60px,8vw,110px)] relative"
          id="hero"
        >
          <div className="max-w-[1200px] mx-auto px-8 max-md:px-5 max-sm:px-4">
            <div className="w-full">
              <div className="grid grid-cols-[1.05fr_0.95fr] gap-14 items-center max-lg:grid-cols-1 max-lg:gap-10">
                <div className="flex flex-col gap-5">
                  <h1 className="font-extrabold text-[clamp(30px,4.8vw,58px)] leading-[1.2] tracking-tight font-nanum break-keep word-keep-all reveal">
                    누구나 쉽게
                    <br /> 시작하는 스탬프 투어
                  </h1>
                  <div className="reveal">
                    <StamploLogo
                      width={280}
                      height={80}
                      className="w-[clamp(180px,24vw,280px)] h-auto"
                    />
                  </div>
                  <p className="text-[clamp(16px,1.55vw,19px)] text-gomin-neutral-600 leading-[1.62] break-keep word-keep-all reveal">
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
                <div className="relative flex justify-center max-lg:order-first reveal">
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
              <span className="inline-flex items-center gap-2.25 text-[13px] font-bold tracking-wider text-gomin-primary-700 before:content-[''] before:w-1.75 before:h-1.75 before:rounded-full before:bg-gomin-primary-700 before:shadow-[0_0_0_4px_var(--primary-100)] reveal">
                스탬프 투어 기존 방식의 문제점
              </span>
              <h2 className="font-extrabold text-[clamp(30px,3.6vw,46px)] leading-[1.18] font-nanum break-keep word-keep-all reveal">
                스탬프 투어,
                <br />
                모바일로 더 편리하게{" "}
              </h2>
              <p className="text-[clamp(16px,1.5vw,18px)] text-gomin-neutral-600 max-w-[56ch] leading-[1.6] break-keep word-keep-all reveal">
                종이와 도장을 사용하는 기존 방법은 여러가지 문제가 있습니다.
                Stamplo는 웹과 QR로 그 문제를 해결합니다.
              </p>
            </div>

            <div className="grid grid-cols-[1fr_auto_1fr] gap-7 items-stretch max-lg:grid-cols-1 max-lg:gap-2">
              <div className="flex flex-col gap-4 reveal">
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
                      종이와 스탬프의 문제
                    </div>
                    <div className="text-sm text-gomin-neutral-500 mt-1.25 leading-[1.55] break-keep word-keep-all">
                      종이는 쉽게 훼손되고 분실의 우려가 있습니다. 또한 제작,
                      인쇄, 관리에 비용이 추가적으로 발생합니다.
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

              <div className="flex items-center justify-center text-gomin-neutral-300 max-lg:rotate-90 max-lg:py-2 reveal">
                <ArrowRight className="inline w-[34px] h-[34px] stroke-[1.6]" />
              </div>

              <div className="flex flex-col gap-4 reveal">
                <div className="flex items-center gap-2.25 text-sm font-bold text-emerald-500 mb-0.5">
                  <CheckCircle2 className="inline text-emerald-500" />
                  Stamplo의 해결
                </div>
                <div className="bg-linear-to-br from-[#5f41ee] to-[#5435EB] text-white rounded-[18px] p-7 shadow-[0_10px_24px_rgba(84,53,235,0.24),0_2px_4px_rgba(84,53,235,0.12)] flex flex-col gap-3.5 h-full justify-center relative overflow-hidden after:content-[''] after:absolute after:right-[-50px] after:bottom-[-50px] after:w-[170px] after:h-[170px] after:rounded-full after:bg-white/10">
                  <div className="w-[50px] h-[50px] rounded-2xl bg-white/16 flex items-center justify-center relative z-10">
                    <QrCode className="w-6.5 h-6.5" />
                  </div>
                  <div className="font-nanum font-extrabold text-[21px] relative z-10 break-keep word-keep-all">
                    웹서비스와 QR코드로 해결
                  </div>
                  <div className="text-[14.5px] text-white/88 leading-[1.6] relative z-10 break-keep word-keep-all">
                    설치할 앱도, 나눠줄 종이도 없습니다. 참여자는 QR을 스캔해
                    바로 스탬프 투어를 시작하고, 미션을 완료하면서 자연스러운
                    행사 흐름을 경험합니다.
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
                  <div className="relative w-full h-full rounded-[32px] overflow-hidden bg-slate-50 flex flex-col"></div>
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
                  <div className="relative w-full h-full rounded-[32px] overflow-hidden bg-slate-50 flex flex-col"></div>
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

              <div className="flex items-center justify-center pt-[220px] text-gomin-primary-300 max-lg:pt-0 max-lg:rotate-90 reveal">
                <ArrowRight className="inline w-[30px] h-[30px] stroke-[1.8]" />
              </div>

              {/* Step 3: Complete / Reward */}
              <div className="flex flex-col items-center gap-[22px] reveal">
                <div className="relative w-full aspect-[9/19.2] bg-[#0e0e12] rounded-[42px] p-[11px] shadow-[0_40px_80px_-24px_rgba(20,12,60,0.45),0_6px_16px_rgba(17,17,17,0.18)] max-w-[250px] max-xs:max-w-[240px]">
                  <div className="relative w-full h-full rounded-[32px] overflow-hidden bg-slate-50 flex flex-col"></div>
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
                <span className="inline-flex items-center gap-2.25 text-[13px] font-bold tracking-wider text-gomin-primary-700 before:content-[''] before:w-1.75 before:h-1.75 before:rounded-full before:bg-gomin-primary-700 before:shadow-[0_0_0_4px_var(--primary-100)] reveal">
                  디테일한 데이터 분석
                </span>
                <h2 className="font-extrabold text-[clamp(30px,3.6vw,46px)] leading-[1.18] font-nanum break-keep word-keep-all reveal">
                  행사가 끝나면
                  <br />
                  인사이트가 남습니다
                </h2>
                <p className="text-[clamp(16px,1.5vw,18px)] text-gomin-neutral-600 max-w-[56ch] leading-[1.6] break-keep word-keep-all reveal">
                  실시간 대시보드로 참여 흐름을 한눈에. 다음 행사를 위한
                  데이터가 자동으로 쌓입니다.
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
                      <div className="text-[13.5px] text-gomin-neutral-500 mt-0.75 leading-[1.5] break-keep word-keep-all">
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
                      <div className="text-[13.5px] text-gomin-neutral-500 mt-0.75 leading-[1.5] break-keep word-keep-all">
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
                  <div className="aspect-16/10 bg-slate-50 flex">
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
          className="py-[clamp(72px,9vw,120px)] px-0 relative bg-linear-to-b from-white to-gomin-neutral-50/20"
          id="builder"
        >
          <div className="max-w-[1200px] mx-auto px-8 max-md:px-5 max-sm:px-4">
            <div className="max-w-[720px] mx-auto mb-14 text-center flex flex-col items-center gap-4">
              <span className="inline-flex items-center gap-2.25 text-[13px] font-bold tracking-wider text-gomin-primary-700 before:content-[''] before:w-1.75 before:h-1.75 before:rounded-full before:bg-gomin-primary-700 before:shadow-[0_0_0_4px_var(--primary-100)] reveal">
                행사 만들기 체험
              </span>
              <h2 className="font-extrabold text-[clamp(30px,3.6vw,46px)] leading-[1.18] font-nanum break-keep word-keep-all reveal">
                스탬프 및 테마 디자인 설정
              </h2>
              <p className="text-[clamp(16px,1.5vw,18px)] text-gomin-neutral-600 max-w-[56ch] leading-[1.6] break-keep word-keep-all reveal">
                실제 서비스의 행사 생성 에디터 화면입니다. 스탬프 이미지를
                등록하고 색상 슬라이더로 행사 고유의 테마 색상을 직접
                설정해보세요.
              </p>
            </div>

            <div className="flex flex-col lg:flex-row gap-10 items-start justify-center max-lg:items-stretch max-w-[960px] mx-auto">
              {/* 왼쪽: 어드민 등록 Step 3 디자인 폼 이식 */}
              <div className="flex-1 bg-white border border-gomin-neutral-100 rounded-3xl p-6 md:p-8 shadow-[0_16px_36px_rgba(17,17,17,0.03)] space-y-8 reveal text-gomin-black">
                {/* 1. 스탬프 모양 설정 섹션 */}
                <div className="space-y-3 text-gomin-black text-left">
                  <h3 className="text-base font-bold text-gomin-neutral-700">
                    스탬프 모양
                  </h3>

                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleStampFileChange}
                    accept="image/*"
                    className="hidden"
                  />

                  {stampImage ? (
                    <div className="relative w-[150px] h-[150px] rounded-2xl border border-gomin-neutral-200 flex items-center justify-center p-4 group transition-all hover:shadow-sm">
                      <div className="absolute inset-0 bg-checkerboard rounded-2xl overflow-hidden z-0" />
                      <Image
                        width={122}
                        height={122}
                        fetchPriority={"high"}
                        loading="eager"
                        src={stampImage}
                        alt="스탬프 모양 미리보기"
                        className="w-full h-full object-contain relative z-10"
                      />
                      <button
                        type="button"
                        onClick={handleStampRemove}
                        className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-white shadow-md border border-gomin-neutral-100 flex items-center justify-center text-gomin-neutral-500 hover:text-gomin-black hover:scale-105 transition-all cursor-pointer z-20"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <div
                      onClick={triggerFileInput}
                      className="w-[150px] h-[150px] rounded-2xl border-2 border-dashed border-gomin-neutral-200 bg-gomin-neutral-50/50 hover:bg-gomin-neutral-50 hover:border-gomin-neutral-300 flex flex-col items-center justify-center gap-2.5 cursor-pointer transition-all p-3 text-center select-none"
                    >
                      <div className="w-8 h-8 rounded-full bg-white border border-gomin-neutral-100 shadow-sm flex items-center justify-center text-gomin-neutral-400">
                        <Plus className="w-4 h-4" />
                      </div>
                      <div className="space-y-0.5">
                        <p className="text-[13px] font-extrabold text-gomin-neutral-600">
                          스탬프 이미지 업로드
                        </p>
                        <p className="text-[10px] font-bold text-gomin-neutral-400 leading-normal">
                          1:1 비율 권장
                          <br />
                          투명 배경 PNG
                        </p>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center gap-2.5 p-4 rounded-2xl bg-gomin-primary-100/50 border border-gomin-primary-100 text-gomin-primary-700/90 text-left">
                    <Info className="w-5 h-5 shrink-0" />
                    <p className="text-xs font-bold leading-normal">
                      스탬프 이미지를 따로 업로드하지 않으시면, 기본 제공되는
                      Stamplo 스탬프 이미지가 자동으로 사용됩니다.
                    </p>
                  </div>
                </div>

                <hr className="border-gomin-neutral-100" />

                {/* 2. 테마 색상 설정 섹션 */}
                <div className="space-y-5">
                  <h3 className="text-base font-bold text-gomin-neutral-700 text-left">
                    테마 색상
                  </h3>

                  {/* Hue 슬라이더 */}
                  <div className="space-y-2">
                    <input
                      type="range"
                      min="0"
                      max="360"
                      value={h}
                      onChange={(e) => setH(Number(e.target.value))}
                      className="theme-hue-slider w-full h-4.5 rounded-full appearance-none outline-none shadow-inner border border-black/5 cursor-pointer"
                      style={
                        {
                          background:
                            "linear-gradient(to right, #ff0000 0%, #ffff00 17%, #00ff00 33%, #00ffff 50%, #0000ff 67%, #ff00ff 83%, #ff0000 100%)",
                          "--slider-thumb-color": keyColor,
                        } as React.CSSProperties
                      }
                    />
                  </div>

                  {/* 색상 칩 & Hex 입력 */}
                  <div className="flex flex-col gap-3">
                    <div className="flex flex-wrap items-center gap-3">
                      <div
                        className="w-12 h-12 rounded-xl border border-gomin-neutral-200 shadow-sm shrink-0"
                        style={{ backgroundColor: keyColor }}
                      />
                      <input
                        type="text"
                        value={isFocused ? typingValue : keyColor}
                        onFocus={() => {
                          setIsFocused(true);
                          setTypingValue(keyColor);
                        }}
                        onBlur={() => {
                          setIsFocused(false);
                        }}
                        onChange={(e) => handleHexInputChange(e.target.value)}
                        placeholder="#5435EB"
                        className="h-12 w-32 bg-white border border-gomin-neutral-200 rounded-xl px-3 font-mono text-sm font-bold text-gomin-neutral-700 uppercase focus:outline-none focus:border-gomin-neutral-400 focus:ring-1 focus:ring-gomin-neutral-400 shadow-sm transition-all"
                      />
                      <span className="text-xs font-bold text-gomin-neutral-400 leading-normal max-w-[280px] text-left">
                        ※ 입력하신 색상의 색조(Hue)만 추출하여 반영하며, 모바일
                        화면 가독성을 보장하기 위해 채도와 명도는 고정된 최적의
                        값으로 자동 조정됩니다.
                      </span>
                    </div>
                  </div>

                  {/* InfoBanner */}
                  <div className="flex items-center gap-2.5 p-4 rounded-2xl bg-gomin-primary-100/50 border border-gomin-primary-100 text-gomin-primary-700/90 text-left">
                    <Info className="w-5 h-5 shrink-0" />
                    <p className="text-xs font-bold leading-normal">
                      선택한 테마 색상은 진입 페이지, 설문조사 등 행사의 모든
                      페이지에 일괄 적용됩니다.
                    </p>
                  </div>
                </div>
              </div>

              {/* 오른쪽: 실시간 모바일 프리뷰 패널 이식 */}
              <div className="reveal shrink-0">
                <ThemePreviewPanel stampImage={stampImage} palette={palette} />
              </div>
            </div>
          </div>
        </section>

        {/* ===================== VALUE BAND / CTA ===================== */}
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
                <span className="font-(--font-monomaniac-one) text-[25px] tracking-[0.01em] text-white leading-none pt-[3px]">
                  stamplo
                </span>
              </a>
              <p className="text-sm text-white/55 mt-3.5 max-w-[34ch] leading-[1.6] break-keep word-keep-all">
                누구나 쉽게 시작하는 스탬프 투어 플랫폼.
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
                href="/admin"
                className="inline-flex items-center justify-center gap-2 font-sans font-bold text-base border-0 rounded-xl cursor-pointer py-3.5 px-6 leading-none transition-all duration-120 ease-[cubic-bezier(.2,.7,.2,1)] whitespace-nowrap no-underline active:scale-[0.98] bg-gomin-primary-700 text-white hover:bg-gomin-primary-600 shadow-[0_10px_24px_rgba(84,53,235,0.24),0_2px_4px_rgba(84,53,235,0.12)]"
              >
                시작하기
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
