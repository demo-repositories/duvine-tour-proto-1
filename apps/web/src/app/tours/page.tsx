import type { SanityImageData } from "@workspace/sanity/image";
import {
  type DynamicFetchOptions,
  getDynamicFetchOptions,
  sanityFetch,
} from "@workspace/sanity/live";
import { queryTourIndex } from "@workspace/sanity/query";
import { Button } from "@workspace/ui/components/button";
import { ArrowRight, CalendarDays, Route } from "lucide-react";
import Link from "next/link";
import { stegaClean } from "next-sanity";
import { Suspense } from "react";

import { SanityImage } from "@/components/elements/sanity-image";
import { getSEOMetadata } from "@/lib/seo";

type TourIndexItem = {
  _id: string;
  title?: string | null;
  subtitle?: string | null;
  slug?: string | null;
  heroImage?:
    | (SanityImageData & {
        caption?: string | null;
        credit?: string | null;
      })
    | null;
  durationDays?: number | null;
  difficulty?: string | null;
  featured?: boolean | null;
};

const DIFFICULTY_LABEL: Record<string, string> = {
  leisurely: "Leisurely",
  moderate: "Moderate",
  challenging: "Challenging",
  extreme: "Extreme",
};

export async function generateMetadata() {
  return getSEOMetadata({
    title: "Tours",
    description: "Browse DuVine cycling tours.",
    slug: "/tours",
  });
}

export default function ToursIndexPage() {
  return (
    <Suspense fallback={<ToursFallback />}>
      <DynamicToursIndex />
    </Suspense>
  );
}

async function DynamicToursIndex() {
  const { perspective, stega } = await getDynamicFetchOptions();
  const tours = await getCachedTours({ perspective, stega });
  return <ToursPageContent tours={tours} />;
}

async function getCachedTours({ perspective, stega }: DynamicFetchOptions) {
  "use cache";
  const { data } = await sanityFetch({
    query: queryTourIndex,
    perspective,
    stega,
  });
  return Array.isArray(data) ? (data as TourIndexItem[]) : [];
}

function getDifficultyLabel(difficulty?: string | null) {
  const cleanDifficulty = stegaClean(difficulty ?? "");
  return DIFFICULTY_LABEL[cleanDifficulty] ?? cleanDifficulty;
}

function ToursPageContent({ tours }: { tours: TourIndexItem[] }) {
  return (
    <main className="bg-white">
      <section className="mx-auto max-w-7xl px-4 py-10 md:px-6 lg:py-14">
        <div className="max-w-3xl">
          <p className="font-medium text-[#007290] text-sm uppercase tracking-[0.14em]">
            DuVine tours
          </p>
          <h1 className="mt-3 text-balance font-serif text-4xl text-foreground md:text-6xl">
            Tours
          </h1>
          <p className="mt-4 text-lg text-muted-foreground leading-8">
            Browse the current cycling trips in the demo catalog.
          </p>
        </div>
      </section>

      <section className="border-border border-t">
        <div className="mx-auto max-w-7xl px-4 py-8 md:px-6 lg:py-12">
          {tours.length > 0 ? (
            <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
              {tours.map((tour) => (
                <TourCard key={tour._id} tour={tour} />
              ))}
            </div>
          ) : (
            <div className="rounded-md border border-border p-8 text-center">
              <p className="text-muted-foreground">
                No tours are available right now.
              </p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

function TourCard({ tour }: { tour: TourIndexItem }) {
  const href = tour.slug ? `/tours/${tour.slug}` : "/tours";
  const difficulty = getDifficultyLabel(tour.difficulty);

  return (
    <article className="overflow-hidden rounded-md border border-border bg-white">
      <Link className="group flex h-full flex-col" href={href}>
        <div className="aspect-[4/3] w-full overflow-hidden bg-muted">
          {tour.heroImage?.id ? (
            <SanityImage
              className="block !h-full w-full rounded-none object-cover transition duration-300 group-hover:scale-[1.02]"
              height={700}
              image={tour.heroImage}
              width={900}
            />
          ) : (
            <div className="h-full bg-muted" aria-hidden />
          )}
        </div>

        <div className="flex flex-1 flex-col p-5">
          <div className="flex flex-wrap gap-2 text-muted-foreground text-xs">
            {tour.durationDays ? (
              <span className="inline-flex items-center gap-1 rounded-md border border-border px-2 py-1">
                <CalendarDays aria-hidden className="size-3.5" />
                {tour.durationDays} days
              </span>
            ) : null}
            {difficulty ? (
              <span className="inline-flex items-center gap-1 rounded-md border border-border px-2 py-1">
                <Route aria-hidden className="size-3.5" />
                {difficulty}
              </span>
            ) : null}
          </div>

          <h2 className="mt-4 text-balance font-serif text-3xl text-foreground leading-tight">
            {tour.title}
          </h2>
          {tour.subtitle ? (
            <p className="mt-3 line-clamp-3 text-muted-foreground leading-7">
              {tour.subtitle}
            </p>
          ) : null}

          <div className="mt-auto pt-6">
            <Button
              asChild
              className="rounded-md bg-[#007290] text-white hover:bg-[#00647e]"
            >
              <span>
                View tour
                <ArrowRight aria-hidden className="size-4" />
              </span>
            </Button>
          </div>
        </div>
      </Link>
    </article>
  );
}

function ToursFallback() {
  return <div className="min-h-[50vh]" />;
}
