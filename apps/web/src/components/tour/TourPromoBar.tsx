import { stegaClean } from "next-sanity";

import type { TourDepartureSchedule } from "./types";

type Departure = NonNullable<
  NonNullable<TourDepartureSchedule>["departures"]
>[number];

function parseDate(date: string) {
  const [year, month, day] = date.split("-").map(Number);
  if (!(year && month && day)) {
    return new Date(date);
  }
  return new Date(year, month - 1, day);
}

function formatPromoDate(date?: string | null) {
  const cleanDate = stegaClean(date ?? "");
  if (!cleanDate) {
    return "This departure";
  }
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(parseDate(cleanDate));
}

function findWaitlistDeparture(schedule?: TourDepartureSchedule) {
  return schedule?.departures?.find(
    (departure: Departure) => stegaClean(departure.status ?? "") === "waitlist"
  );
}

export function TourPromoBar({
  schedule,
}: {
  schedule?: TourDepartureSchedule;
}) {
  const departure = findWaitlistDeparture(schedule);
  if (!departure) {
    return null;
  }

  return (
    <a
      className="flex min-h-8 items-center justify-center bg-[#dbe035] px-4 py-1.5 font-sans font-medium text-sm text-zinc-950 leading-tight hover:bg-[#dbe035]/90"
      href="#departures"
    >
      {formatPromoDate(departure.startDate)} is going fast! Join the waitlist
      now.
    </a>
  );
}
