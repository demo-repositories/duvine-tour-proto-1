import { Logger } from "@workspace/logger";
import {
  type DynamicFetchOptions,
  getDynamicFetchOptions,
  sanityFetch,
  sanityFetchMetadata,
  sanityFetchStaticParams,
} from "@workspace/sanity/live";
import { queryTourBySlug, queryTourPaths } from "@workspace/sanity/query";
import { draftMode } from "next/headers";
import { notFound } from "next/navigation";
import { Suspense } from "react";

import { TourPageContent } from "@/components/tour/TourPageContent";
import { getSEOMetadata } from "@/lib/seo";

const logger = new Logger("TourPage");
const PLACEHOLDER_SLUG = "__placeholder__";

type TourParams = { slug: string };

export async function generateStaticParams() {
  try {
    const { data: slugs } = await sanityFetchStaticParams({
      query: queryTourPaths,
    });

    if (!Array.isArray(slugs) || slugs.length === 0) {
      return [{ slug: PLACEHOLDER_SLUG }];
    }

    return slugs.filter(Boolean).map((slug) => ({ slug }));
  } catch (error) {
    logger.error("Error fetching tour paths", error);
    return [{ slug: PLACEHOLDER_SLUG }];
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<TourParams>;
}) {
  const [{ slug }, { perspective }] = await Promise.all([
    params,
    getDynamicFetchOptions(),
  ]);
  const { data: tour } = await sanityFetchMetadata({
    query: queryTourBySlug,
    params: { slug },
    perspective,
  });

  return getSEOMetadata({
    title: tour?.seo?.metaTitle ?? tour?.title,
    description: tour?.seo?.metaDescription ?? tour?.subtitle ?? undefined,
    slug: `/tour/${slug}`,
    contentId: tour?._id,
    contentType: tour?._type,
  });
}

export default async function TourPage({
  params,
}: {
  params: Promise<TourParams>;
}) {
  const { isEnabled: isDraftMode } = await draftMode();
  if (isDraftMode) {
    return (
      <Suspense fallback={<TourFallback />}>
        <DynamicTourPage params={params} />
      </Suspense>
    );
  }

  const { slug } = await params;
  const tour = await getCachedTourPage({
    slug,
    perspective: "published",
    stega: false,
  });
  if (!tour) {
    notFound();
  }
  return <TourPageContent tour={tour} />;
}

async function DynamicTourPage({ params }: { params: Promise<TourParams> }) {
  const [{ slug }, { perspective, stega }] = await Promise.all([
    params,
    getDynamicFetchOptions(),
  ]);
  const tour = await getCachedTourPage({ slug, perspective, stega });
  if (!tour) {
    notFound();
  }
  return <TourPageContent tour={tour} />;
}

async function getCachedTourPage({
  slug,
  perspective,
  stega,
}: TourParams & DynamicFetchOptions) {
  "use cache";
  const { data: tour } = await sanityFetch({
    query: queryTourBySlug,
    params: { slug },
    perspective,
    stega,
  });
  return tour;
}

function TourFallback() {
  return <div className="min-h-[50vh]" />;
}
