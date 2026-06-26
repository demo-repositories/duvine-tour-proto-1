import { Badge } from "@workspace/ui/components/badge";
import { cn } from "@workspace/ui/lib/utils";
import { ArrowRight, CalendarDays, Gauge } from "lucide-react";
import Link from "next/link";

import type { SanityImageProps } from "@/types";
import { SanityImage } from "./elements/sanity-image";

export type RelatedTour = {
  title?: string | null;
  subtitle?: string | null;
  slug?: string | null;
  heroImage?: (SanityImageProps & { caption?: string | null }) | null;
  durationDays?: number | null;
  difficulty?: string | null;
};

type RelatedTourCardProps = {
  tour?: RelatedTour | null;
  className?: string;
};

function formatDifficulty(difficulty?: string | null) {
  if (!difficulty) {
    return null;
  }

  return difficulty.charAt(0).toUpperCase() + difficulty.slice(1);
}

export function RelatedTourCard({ tour, className }: RelatedTourCardProps) {
  if (!tour?.slug || !tour.title) {
    return null;
  }

  const href = `/tours/${tour.slug}`;
  const difficulty = formatDifficulty(tour.difficulty);

  return (
    <aside
      aria-label="Related tour"
      className={cn(
        "overflow-hidden rounded-lg border bg-background shadow-sm",
        className
      )}
    >
      <Link className="group block" href={href}>
        {tour.heroImage?.id ? (
          <SanityImage
            alt={tour.heroImage.alt ?? tour.title}
            className="aspect-4/3 w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
            height={420}
            image={tour.heroImage}
            width={560}
          />
        ) : (
          <div className="flex aspect-4/3 w-full items-end bg-stone-100 p-4 text-stone-700">
            <span className="font-medium text-sm">DuVine featured tour</span>
          </div>
        )}

        <div className="space-y-4 p-5">
          <div className="space-y-2">
            <Badge className="rounded-md" variant="secondary">
              Related tour
            </Badge>
            <h2 className="font-serif text-xl leading-snug group-hover:underline group-hover:decoration-dotted group-hover:underline-offset-4">
              {tour.title}
            </h2>
            {tour.subtitle ? (
              <p className="text-muted-foreground text-sm leading-6">
                {tour.subtitle}
              </p>
            ) : null}
          </div>

          <dl className="grid gap-2 text-sm">
            {tour.durationDays ? (
              <div className="flex items-center gap-2 text-muted-foreground">
                <CalendarDays aria-hidden="true" className="size-4" />
                <dt className="sr-only">Duration</dt>
                <dd>{tour.durationDays} days</dd>
              </div>
            ) : null}
            {difficulty ? (
              <div className="flex items-center gap-2 text-muted-foreground">
                <Gauge aria-hidden="true" className="size-4" />
                <dt className="sr-only">Difficulty</dt>
                <dd>{difficulty}</dd>
              </div>
            ) : null}
          </dl>

          <span className="inline-flex items-center gap-2 font-medium text-sm">
            View tour
            <ArrowRight
              aria-hidden="true"
              className="size-4 transition-transform group-hover:translate-x-0.5"
            />
          </span>
        </div>
      </Link>
    </aside>
  );
}
