"use client";

import { useParams, usePathname } from "next/navigation";
import { getAdminRouteConfig } from "@/constants/adminRoutes";
import type { AdminEventListItem } from "@/types/models";
import { getAdminEventStatusLabel } from "@/utils/event-status";

type Props = {
  events: AdminEventListItem[];
  currentEvent?: AdminEventListItem;
};

const Header = ({ events, currentEvent }: Props) => {
  const pathname = usePathname();
  const { eventId } = useParams<{ eventId?: string }>();
  const route = getAdminRouteConfig(pathname);
  const selectedEvent =
    eventId && currentEvent && String(currentEvent.id) === eventId
      ? currentEvent
      : eventId
        ? events.find((event) => String(event.id) === eventId)
        : undefined;
  const eventTitle = eventId
    ? (selectedEvent?.title ?? `행사 ${eventId}`)
    : undefined;
  const eventStatusText = selectedEvent
    ? getAdminEventStatusLabel(selectedEvent.startDate, selectedEvent.endDate)
    : undefined;

  if (!route || !route.title) {
    return null;
  }

  return (
    <header className="flex flex-col pt-6 pr-4 pl-8">
      <h1 className="text-xl font-semibold text-gomin-black">{route.title}</h1>
      {route.description && (
        <p className="mt-2 text-sm text-gomin-neutral-600">
          {route.description.map((segment, index) => {
            if (segment.type === "eventStatusText") {
              return (
                <span
                  key={`${segment.type}-${index}`}
                  className="text-gomin-neutral-600"
                >
                  {eventStatusText}
                </span>
              );
            }

            if (segment.type === "eventTitle") {
              return (
                <strong
                  key={`${segment.type}-${index}`}
                  className="font-bold text-gomin-black"
                >
                  {eventTitle}
                </strong>
              );
            }

            return (
              <span
                key={`${segment.type}-${index}`}
                className="text-gomin-neutral-600"
              >
                {segment.text}
              </span>
            );
          })}
        </p>
      )}
    </header>
  );
};

export default Header;
