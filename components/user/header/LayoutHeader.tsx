"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Header from "@/components/user/header/Header";
import BrochureButton from "@/components/user/mission/BrochureButton";
import EventDetailModal from "@/components/user/event/EventDetailModal";
import { USER_ROUTES } from "@/constants/userRoutes";

const shouldHideHeader = (pathname: string) => {
  // 1. 최상위 루트(/)인 경우 숨김
  if (pathname === "/") return true;

  // 경로의 세그먼트 분석 (예: '/event/coex/brochure' => ['event', 'coex', 'brochure'])
  const segments = pathname.split("/").filter(Boolean);

  // 2. 최초 진입 페이지 (/event/[slug]) 형태인 경우 숨김
  // 세그먼트가 ['event', '이벤트명'] 형태로 2개인 경우입니다.
  if (segments.length === 2 && segments[0] === "event") {
    return true;
  }

  // 3. 완료 페이지 (.../complete) 형태인 경우 숨김
  if (segments[segments.length - 1] === "complete") {
    return true;
  }

  // 4. QR 스캔 페이지 (.../qr-check) 형태인 경우 숨김
  if (segments[segments.length - 1] === "qr-check") {
    return true;
  }

  return false;
};

const LayoutHeader = () => {
  const pathname = usePathname();
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  // 헤더를 숨겨야 하는 페이지이면 아무것도 렌더링하지 않습니다.
  if (shouldHideHeader(pathname)) {
    return null;
  }

  // qr-required 페이지에서는 백버튼을 노출하지 않습니다.
  const showBackButton = pathname !== USER_ROUTES.QR_REQUIRED;

  const segments = pathname.split("/").filter(Boolean);
  const isMission = segments[0] === "event" && segments[2] === "mission";
  const eventId = isMission ? segments[1] : null;

  return (
    <>
      <Header
        showBackButton={showBackButton}
        rightSlot={
          isMission && eventId ? (
            <BrochureButton onClick={() => setIsDetailOpen(true)} />
          ) : undefined
        }
      />
      {isMission && eventId && (
        <EventDetailModal
          eventId={eventId}
          isOpen={isDetailOpen}
          onClose={() => setIsDetailOpen(false)}
        />
      )}
    </>
  );
};

export default LayoutHeader;
