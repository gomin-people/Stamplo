import { unstable_cache } from "next/cache";
import { requestJson } from "@/features/shared/api/http";
import { getRequestOrigin } from "@/utils/server-url";

const getCachedEventPrimaryColor = unstable_cache(
  async (eventId: string, baseUrl: string) => {
    const data = await requestJson<{ primaryColor: string }>(
      `${baseUrl}/api/v1/participant/events/${eventId}/theme`
    );
    return data?.primaryColor ?? null;
  },
  ["event-primary-color"],
  { revalidate: 3600, tags: [`event-theme-${eventId}`] }
);

export const getEventPrimaryColor = async (
  eventId: string
): Promise<string | null> => {
  try {
    const baseUrl = await getRequestOrigin();
    return await getCachedEventPrimaryColor(eventId, baseUrl);
  } catch {
    return null;
  }
};
