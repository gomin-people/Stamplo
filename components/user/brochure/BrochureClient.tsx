"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { cn } from "@/utils";
import BrochureSlider from "@/components/user/brochure/BrochureSlider";
import BrochureIndicator from "@/components/user/brochure/BrochureIndicator";
import BrochureGuideOverlay from "@/components/user/brochure/BrochureGuideOverlay";
import FloatingActionButton from "@/components/user/mission/FloatingActionButton";
import { getUserRoutes } from "@/constants/userRoutes";

type Props = {
  images: string[];
  showGuide: boolean;
};

const BrochureClient = ({ images, showGuide }: Props) => {
  const { eventId } = useParams<{ eventId: string }>();
  const router = useRouter();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [guideVisible, setGuideVisible] = useState(
    () =>
      showGuide &&
      (typeof window === "undefined" ||
        !document.cookie
          .split("; ")
          .some((c) => c.startsWith(`brochure-guide-seen-${eventId}=`)))
  );

  const handlePrev = () =>
    setCurrentIndex((prev) => (prev === 0 ? prev : prev - 1));
  const handleNext = () =>
    currentIndex < images.length - 1 && setCurrentIndex((prev) => prev + 1);

  const isLastPage = images.length > 0 && currentIndex === images.length - 1;

  useEffect(() => {
    if (isLastPage) {
      router.prefetch(getUserRoutes(eventId).mission);
    }
  }, [isLastPage, eventId, router]);

  return (
    <div
      className={cn(
        "bg-gomin-white flex flex-col items-center pt-18 pb-[calc(2.5rem+env(safe-area-inset-bottom))]",
        showGuide ? "" : "animate-fade-in"
      )}
    >
      <div className="mb-4">
        <BrochureIndicator total={images.length} currentIndex={currentIndex} />
      </div>
      <BrochureSlider
        images={images}
        currentIndex={currentIndex}
        onPrev={handlePrev}
        onNext={handleNext}
      />

      {!guideVisible && (
        <FloatingActionButton
          label="스탬프 투어 시작하기"
          onClick={() => router.push(getUserRoutes(eventId).mission)}
          className="animate-fade-up"
        />
      )}

      {images.length > 1 && showGuide && (
        <BrochureGuideOverlay
          eventId={eventId}
          onDismiss={() => setGuideVisible(false)}
        />
      )}
    </div>
  );
};

export default BrochureClient;
