import { sanityFetchMetadata } from "@workspace/sanity/live";
import { querySitemapData } from "@workspace/sanity/query";
import type { MetadataRoute } from "next";

import { getBaseUrl } from "@/utils";

type SitemapPage = {
  slug?: string | null;
  lastModified?: string | null;
};

const baseUrl = getBaseUrl();

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { data } = await sanityFetchMetadata({
    query: querySitemapData,
    perspective: "published",
  });
  const { slugPages, blogPages, tourPages } = data ?? {
    slugPages: [],
    blogPages: [],
    tourPages: [],
  };
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    ...slugPages.map((page: SitemapPage) => ({
      url: `${baseUrl}${page.slug}`,
      lastModified: new Date(page.lastModified ?? new Date()),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
    ...blogPages.map((page: SitemapPage) => ({
      url: `${baseUrl}${page.slug}`,
      lastModified: new Date(page.lastModified ?? new Date()),
      changeFrequency: "weekly" as const,
      priority: 0.5,
    })),
    ...tourPages.map((page: SitemapPage) => ({
      url: `${baseUrl}/tour/${page.slug}`,
      lastModified: new Date(page.lastModified ?? new Date()),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
  ];
}
