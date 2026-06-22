"use client";

import { useEffect } from "react";

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
  if (typeof window === "undefined") return false;
  if (persisted) return true;
  const nav = performance.getEntriesByType("navigation")[0] as
    | PerformanceNavigationTiming
    | undefined;
  return nav?.type === "back_forward"; // persisted=false여도 뒤로가기면 복원
};

export const RevealObserver = () => {
  useEffect(() => {
    const handlePageShow = (e: Event) => {
      const restore = isRestore((e as PageTransitionEvent).persisted);
      runReveal(restore);
      // DOM/스크롤 복원이 늦게 끝나는 경우 대비, 다음 프레임에 한 번 더
      requestAnimationFrame(() => runReveal(restore));
    };

    window.addEventListener("pageshow", handlePageShow);
    runReveal(); // 첫 로드 애니메이션 (복구는 pageshow가 담당)

    return () => {
      window.removeEventListener("pageshow", handlePageShow);
      _revealIo?.disconnect();
      _revealIo = null;
    };
  }, []);

  return null;
};
