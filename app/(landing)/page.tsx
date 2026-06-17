import { LandingHeader } from "@/components/landing/LandingHeader";
import { RevealObserver } from "@/components/landing/RevealObserver";
import { LandingHero } from "@/components/landing/LandingHero";
import { LandingProblem } from "@/components/landing/LandingProblem";
import { LandingUsage } from "@/components/landing/LandingUsage";
import { LandingData } from "@/components/landing/LandingData";
import { LandingBuilderSection } from "@/components/landing/LandingBuilderSection";
import { LandingCTA } from "@/components/landing/LandingCTA";
import { LandingFooter } from "@/components/landing/LandingFooter";
import ReactDOM from "react-dom";

export default function LandingPage() {
  return (
    <>
      <RevealObserver />

      {/* ===================== NAV ===================== */}
      <LandingHeader />

      <main id="top">
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
