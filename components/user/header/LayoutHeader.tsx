"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/user/header/Header";
import EventDetailButton from "@/components/user/event/EventDetailButton";
import { USER_ROUTES } from "@/constants/userRoutes";

const shouldHideHeader = (pathname: string) => {
  if (pathname === "/") return true;

  const segments = pathname.split("/").filter(Boolean);

  if (segments.length === 2 && segments[0] === "event") {
    return true;
  }

  if (segments[segments.length - 1] === "complete") {
    return true;
  }

  if (segments[segments.length - 1] === "qr-check") {
    return true;
  }

  return false;
};

const LayoutHeader = () => {
  const pathname = usePathname();

  if (shouldHideHeader(pathname)) {
    return null;
  }

  const showBackButton = pathname !== USER_ROUTES.QR_REQUIRED;

  const segments = pathname.split("/").filter(Boolean);
  const isMission = segments[0] === "event" && segments[2] === "mission";

  return (
    <Header
      showBackButton={showBackButton}
      rightSlot={isMission ? <EventDetailButton /> : undefined}
    />
  );
};

export default LayoutHeader;
