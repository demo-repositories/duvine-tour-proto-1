import { Button } from "@workspace/ui/components/button";
import { CalendarDays, Route } from "lucide-react";
import Link from "next/link";
import { stegaClean } from "next-sanity";

import { SanityImage } from "@/components/elements/sanity-image";
import type { TourPageData } from "./types";

const DIFFICULTY_LABEL: Record<string, string> = {
  leisurely: "Leisurely",
  moderate: "Moderate",
  challenging: "Challenging",
  extreme: "Extreme",
};

function getDifficultyLabel(difficulty?: string | null) {
  const cleanDifficulty = stegaClean(difficulty ?? "");
  return DIFFICULTY_LABEL[cleanDifficulty] ?? cleanDifficulty;
}

export function TourHero({ tour }: { tour: TourPageData }) {
  const heroImage = tour.heroImage;
  const difficulty = getDifficultyLabel(tour.difficulty);

  return (
    <header className="border-border border-b bg-white">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-8 md:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-end lg:py-12">
        <div className="overflow-hidden rounded-md border border-border bg-muted">
          {heroImage?.id ? (
            <SanityImage
              className="aspect-[16/10] h-full w-full rounded-none object-cover"
              height={1200}
              image={heroImage}
              width={1920}
            />
          ) : (
            <div className="aspect-[16/10] bg-muted" aria-hidden />
          )}
        </div>

        <div className="lg:pb-2">
          <p className="font-medium text-[#007290] text-sm uppercase tracking-[0.14em]">
            DuVine cycling tour
          </p>
          <h1 className="mt-3 text-balance font-serif text-4xl text-foreground leading-tight md:text-6xl">
            {tour.title}
          </h1>
          {tour.subtitle ? (
            <p className="mt-4 max-w-xl text-lg text-muted-foreground leading-8">
              {tour.subtitle}
            </p>
          ) : null}

          <dl className="mt-6 grid grid-cols-2 gap-3 text-sm sm:max-w-md">
            {tour.durationDays ? (
              <div className="rounded-md border border-border px-4 py-3">
                <dt className="text-muted-foreground">Duration</dt>
                <dd className="mt-1 font-medium text-foreground">
                  {tour.durationDays} days
                </dd>
              </div>
            ) : null}
            {difficulty ? (
              <div className="rounded-md border border-border px-4 py-3">
                <dt className="text-muted-foreground">Difficulty</dt>
                <dd className="mt-1 font-medium text-foreground">
                  {difficulty}
                </dd>
              </div>
            ) : null}
          </dl>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Button
              asChild
              className="rounded-md bg-[#007290] text-white hover:bg-[#00647e]"
              size="lg"
            >
              <Link href="#departures">
                <CalendarDays aria-hidden className="size-4" />
                Request dates
              </Link>
            </Button>
            <Button
              asChild
              className="rounded-md border-[#007290]/30 text-[#007290] hover:bg-[#007290]/5"
              size="lg"
              variant="outline"
            >
              <Link href="#itinerary">
                <Route aria-hidden className="size-4" />
                View itinerary
              </Link>
            </Button>
          </div>

          {heroImage?.credit ? (
            <p className="mt-4 text-muted-foreground text-xs">
              Photograph: {heroImage.credit}
            </p>
          ) : null}
        </div>
      </div>
    </header>
  );
}
