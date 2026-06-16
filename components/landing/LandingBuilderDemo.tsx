"use client";

import { useState, useMemo, useRef } from "react";
import Image from "next/image";
import { generatePalette, hslToHex, hexToHsl } from "@/utils";
import ThemePreviewPanel from "@/components/admin/event/themeStamp/ThemePreviewPanel";
import { Info, Plus, X } from "lucide-react";

export const LandingBuilderDemo = () => {
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

  return (
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
              스탬프 이미지를 따로 업로드하지 않으시면, 기본 제공되는 Stamplo
              스탬프 이미지가 자동으로 사용됩니다.
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
                ※ 입력하신 색상의 색조(Hue)만 추출하여 반영하며, 모바일 화면
                가독성을 보장하기 위해 채도와 명도는 고정된 최적의 값으로 자동
                조정됩니다.
              </span>
            </div>
          </div>

          {/* InfoBanner */}
          <div className="flex items-center gap-2.5 p-4 rounded-2xl bg-gomin-primary-100/50 border border-gomin-primary-100 text-gomin-primary-700/90 text-left">
            <Info className="w-5 h-5 shrink-0" />
            <p className="text-xs font-bold leading-normal">
              선택한 테마 색상은 진입 페이지, 설문조사 등 행사의 모든 페이지에
              일괄 적용됩니다.
            </p>
          </div>
        </div>
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
