import { LandingHeader } from "@/components/landing/LandingHeader";
import { RevealObserver } from "@/components/landing/RevealObserver";
import { LandingHero } from "@/components/landing/LandingHero";
import { LandingProblem } from "@/components/landing/LandingProblem";
import { LandingUsage } from "@/components/landing/LandingUsage";
import { LandingData } from "@/components/landing/LandingData";
import { LandingBuilderSection } from "@/components/landing/LandingBuilderSection";
import { LandingCTA } from "@/components/landing/LandingCTA";
import { LandingFooter } from "@/components/landing/LandingFooter";

export default function LandingPage() {
  return (
    <>
      <div
        id="top"
        className="absolute top-0 left-0 w-0 h-0 pointer-events-none"
      />
      <RevealObserver />

      {/* ===================== NAV ===================== */}
      <LandingHeader />

      <main>
        {/* ===================== HERO ===================== */}
        <LandingHero />

        {/* ===================== PROBLEM ===================== */}
        <LandingProblem />

        {/* ===================== USAGE — 3 steps ===================== */}
        <LandingUsage />

        {/* ===================== DATA ===================== */}
        <LandingData />

        {/* ===================== BUILDER ===================== */}
        <LandingBuilderSection />

        {/* ===================== VALUE BAND / CTA ===================== */}
        <LandingCTA />
      </main>

      {/* ===================== FOOTER ===================== */}
      <LandingFooter />
    </>
  );
}
