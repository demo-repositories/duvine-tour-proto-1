import { sanityFetchStaticParams } from "@workspace/sanity/live";
import { queryTourPaths } from "@workspace/sanity/query";
import { redirect } from "next/navigation";

type LegacyTourParams = { slug: string };

export async function generateStaticParams() {
  const { data: slugs } = await sanityFetchStaticParams({
    query: queryTourPaths,
  });

  if (!Array.isArray(slugs)) {
    return [];
  }

  return slugs.filter(Boolean).map((slug) => ({ slug }));
}

export default async function LegacyTourRedirect({
  params,
}: {
  params: Promise<LegacyTourParams>;
}) {
  const { slug } = await params;
  redirect(`/tours/${slug}`);
}
