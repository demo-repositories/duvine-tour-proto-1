import { Badge } from "@workspace/ui/components/badge";
import { stegaClean } from "next-sanity";

import type { TourDepartureSchedule } from "./types";

type Departure = NonNullable<
  NonNullable<TourDepartureSchedule>["departures"]
>[number];

const STATUS_LABEL: Record<string, string> = {
  available: "Available",
  waitlist: "Waitlist",
  "sold-out": "Sold out",
  cancelled: "Cancelled",
};

function parseDate(date: string) {
  const [year, month, day] = date.split("-").map(Number);
  if (!(year && month && day)) {
    return new Date(date);
  }
  return new Date(year, month - 1, day);
}

function formatDate(date?: string | null) {
  const cleanDate = stegaClean(date ?? "");
  if (!cleanDate) {
    return "";
  }
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(parseDate(cleanDate));
}

function formatDateRange(departure: Departure) {
  const startDate = formatDate(departure.startDate);
  const endDate = formatDate(departure.endDate);
  if (startDate && endDate) {
    return `${startDate} to ${endDate}`;
  }
  return startDate || endDate || "Dates coming soon";
}

function formatPrice(price?: number | null) {
  if (!price) {
    return "Price coming soon";
  }
  return new Intl.NumberFormat("en-US", {
    currency: "USD",
    maximumFractionDigits: 0,
    style: "currency",
  }).format(price);
}

function statusLabel(status?: string | null) {
  const cleanStatus = stegaClean(status ?? "");
  return STATUS_LABEL[cleanStatus] ?? cleanStatus;
}

export function TourDepartures({
  schedule,
}: {
  schedule?: TourDepartureSchedule;
}) {
  if (!schedule?.departures?.length) {
    return null;
  }

  return (
    <section className="border-border border-t bg-white" id="departures">
      <div className="mx-auto max-w-7xl px-4 py-16 md:px-6">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="font-medium text-[#007290] text-sm uppercase tracking-[0.14em]">
              Dates and pricing
            </p>
            <h2 className="mt-2 font-serif text-4xl text-foreground">
              Departures
            </h2>
          </div>
          <p className="text-muted-foreground text-sm">
            Source: Kaptio
            {schedule.lastSyncedAt
              ? `, synced ${new Date(
                  stegaClean(schedule.lastSyncedAt)
                ).toLocaleDateString()}`
              : null}
          </p>
        </div>

        <div className="mt-8 overflow-hidden rounded-md border border-border">
          <div className="hidden grid-cols-[1.4fr_0.7fr_0.7fr] bg-muted/50 px-4 py-3 font-medium text-muted-foreground text-xs uppercase tracking-[0.14em] md:grid">
            <span>Dates</span>
            <span>Status</span>
            <span className="text-right">From</span>
          </div>

          {schedule.departures.map((departure) => (
            <article
              className="grid gap-3 border-border border-t p-4 first:border-t-0 md:grid-cols-[1.4fr_0.7fr_0.7fr] md:items-center"
              key={departure._key}
            >
              <div>
                <p className="font-medium text-foreground">
                  {formatDateRange(departure)}
                </p>
                {departure.notes ? (
                  <p className="mt-1 text-muted-foreground text-sm">
                    {departure.notes}
                  </p>
                ) : null}
              </div>
              <div>
                <Badge
                  className="border-[#007290]/20 bg-[#007290]/10 text-[#007290]"
                  variant="outline"
                >
                  {statusLabel(departure.status)}
                </Badge>
              </div>
              <p className="font-medium text-foreground md:text-right">
                {formatPrice(departure.priceUSD)}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
