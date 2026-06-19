"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Header from "@/components/user/header/Header";
import BrochureButton from "@/components/user/mission/BrochureButton";
import EventDetailModal from "@/components/user/event/EventDetailModal";

export default function MissionHeader() {
  const { eventId } = useParams<{ eventId: string }>();
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  return (
    <>
      <Header
        showBackButton={true}
        rightSlot={<BrochureButton onClick={() => setIsDetailOpen(true)} />}
      />
      <EventDetailModal
        eventId={eventId}
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
      />
    </>
  );
}
