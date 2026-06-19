import Header from "@/components/user/header/Header";
import EventDetailButton from "@/components/user/event/EventDetailButton";

export default function MissionHeader() {
  return <Header showBackButton={true} rightSlot={<EventDetailButton />} />;
}
