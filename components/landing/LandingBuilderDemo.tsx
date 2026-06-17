"use client";

import { useState, useMemo } from "react";
import { generatePalette, hslToHex } from "@/utils";
import ThemePreviewPanel from "@/components/admin/event/themeStamp/ThemePreviewPanel";
import ThemeColorPicker from "@/components/admin/event/themeStamp/ThemeColorPicker";
import StampUploadSection from "@/components/admin/event/themeStamp/StampUploadSection";

export const LandingBuilderDemo = () => {
  const [stampImage, setStampImage] = useState<string | null>(null);
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

  return (
    <div className="flex flex-col lg:flex-row gap-10 items-start justify-center max-lg:items-stretch max-w-[960px] mx-auto">
      {/* 왼쪽: 어드민 등록 Step 3 디자인 폼 이식 */}
      <div className="flex-1 bg-white border border-gomin-neutral-100 rounded-3xl p-6 md:p-8 shadow-[0_16px_36px_rgba(17,17,17,0.03)] space-y-8 reveal text-gomin-black">
        {/* 1. 스탬프 모양 설정 섹션 */}
        <StampUploadSection
          value={stampImage ?? ""}
          onChange={setStampImage}
          onRemove={() => setStampImage(null)}
          onUploadingChange={() => {}}
          uploadMode="landing"
        />

        <hr className="border-gomin-neutral-100" />

        {/* 2. 테마 색상 설정 섹션 */}
        <ThemeColorPicker h={h} onHueChange={setH} keyColor={keyColor} />
      </div>

      {/* 오른쪽: 실시간 모바일 프리뷰 패널 이식 */}
      <div className="reveal shrink-0">
        <ThemePreviewPanel
          stampImage={stampImage}
          palette={palette}
          className="w-full lg:w-[320px] h-162.5"
        />
      </div>
    </div>
  );
};
