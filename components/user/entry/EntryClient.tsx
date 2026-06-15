"use client";

import Link from "next/link";
import EventPoster from "@/components/user/common/EventPoster";
import ThemedButton from "@/components/user/common/ThemedButton";

type EntryClientProps = {
  eventId: string;
  posterImageUrl: string;
  hasBrochure: boolean;
};

const EntryClient = ({
  eventId,
  posterImageUrl,
  hasBrochure,
}: EntryClientProps) => {
  const destination = `/event/${eventId}/${hasBrochure ? "brochure" : "mission"}`;

  return (
    <main className="h-full overflow-hidden bg-white flex justify-center">
      <div className="w-full max-w-100.5 h-full flex flex-col items-center justify-center px-12 pb-10 pt-14 min-h-0">
        <div className="animate-fade-up min-h-0 w-full flex justify-center">
          <EventPoster
            src={posterImageUrl}
            width={300}
            height={440}
            maxHeight="min(440px, calc(100vh - 136px))"
          />
        </div>

        <div className="mt-5.5 w-full max-w-76 animate-fade-up-delay-1">
          <Link href={destination}>
            <ThemedButton className="w-full active:scale-97 transition-transform">
              시작하기
            </ThemedButton>
          </Link>
        </div>

        <p className="font-sans text-sm font-bold leading-normal text-gomin-neutral-500 whitespace-nowrap pt-2.5 animate-fade-up-delay-2">
          powered by stamplo
        </p>
      </div>
    </main>
  );
};

export default EntryClient;
