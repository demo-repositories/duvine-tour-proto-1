import { Logger } from "@workspace/logger";
import {
  type DynamicFetchOptions,
  getDynamicFetchOptions,
  sanityFetch,
  sanityFetchMetadata,
  sanityFetchStaticParams,
} from "@workspace/sanity/live";
import { queryBlogPaths, queryBlogSlugPageData } from "@workspace/sanity/query";
import { draftMode } from "next/headers";
import { notFound } from "next/navigation";
import { Suspense } from "react";

import { RichText } from "@/components/elements/rich-text";
import { SanityImage } from "@/components/elements/sanity-image";
import { TableOfContent } from "@/components/elements/table-of-content";
import { ArticleJsonLd } from "@/components/json-ld";
import {
  RelatedTourCard,
  type RelatedTour,
} from "@/components/related-tour-card";
import { getSEOMetadata } from "@/lib/seo";

const logger = new Logger("BlogSlug");

const PLACEHOLDER_SLUG = "__placeholder__";

type BlogParams = { slug: string };

type BlogAuthor = {
  name?: string | null;
  position?: string | null;
  image?: {
    id?: string | null;
    alt?: string | null;
  } | null;
};

export async function generateStaticParams() {
  try {
    const { data: slugs } = await sanityFetchStaticParams({
      query: queryBlogPaths,
    });

    if (!Array.isArray(slugs) || slugs.length === 0) {
      return [{ slug: PLACEHOLDER_SLUG }];
    }

    const paths: BlogParams[] = [];
    for (const slug of slugs) {
      if (!slug) {
        continue;
      }
      const [, , path] = slug.split("/");
      if (path) {
        paths.push({ slug: path });
      }
    }
    return paths;
  } catch (error) {
    logger.error("Error fetching blog paths", error);
    return [{ slug: PLACEHOLDER_SLUG }];
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<BlogParams>;
}) {
  const [{ slug }, { perspective }] = await Promise.all([
    params,
    getDynamicFetchOptions(),
  ]);
  const slugString = `/blog/${slug}`;
  const { data } = await sanityFetchMetadata({
    query: queryBlogSlugPageData,
    params: { slug: slugString },
    perspective,
  });
  return getSEOMetadata({
    title: data?.title ?? data?.seoTitle,
    description: data?.description ?? data?.seoDescription,
    slug: slugString,
    contentId: data?._id,
    contentType: data?._type,
    pageType: "article",
  });
}

export default async function BlogSlugPage({
  params,
}: {
  params: Promise<BlogParams>;
}) {
  const { isEnabled: isDraftMode } = await draftMode();
  if (isDraftMode) {
    return (
      <Suspense fallback={<BlogFallback />}>
        <DynamicBlogPage params={params} />
      </Suspense>
    );
  }
  const { slug } = await params;
  const data = await getCachedBlogPage({
    slug,
    perspective: "published",
    stega: false,
  });
  if (!data) {
    notFound();
  }
  return <BlogPageContent data={data} />;
}

async function DynamicBlogPage({ params }: { params: Promise<BlogParams> }) {
  const [{ slug }, { perspective, stega }] = await Promise.all([
    params,
    getDynamicFetchOptions(),
  ]);
  const data = await getCachedBlogPage({ slug, perspective, stega });
  if (!data) {
    notFound();
  }
  return <BlogPageContent data={data} />;
}

// notFound() stays in the non-cached callers above — never inside `'use cache'`.
async function getCachedBlogPage({
  slug,
  perspective,
  stega,
}: BlogParams & DynamicFetchOptions) {
  "use cache";
  const slugString = `/blog/${slug}`;
  const { data } = await sanityFetch({
    query: queryBlogSlugPageData,
    params: { slug: slugString },
    perspective,
    stega,
  });
  return data;
}

function BlogPageContent({
  data,
}: {
  data: NonNullable<Awaited<ReturnType<typeof getCachedBlogPage>>>;
}) {
  const { title, description, image, richText, publishedAt } = data ?? {};
  const author = (data as { authors?: BlogAuthor | null }).authors ?? null;
  const relatedTour =
    (data as { relatedTour?: RelatedTour | null }).relatedTour ?? null;

  return (
    <div className="container mx-auto my-16 px-4 md:px-6">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_300px]">
        <main>
          <ArticleJsonLd article={data} />
          <BlogHeroImage image={image} title={title} />
          <header className="mb-8">
            <h1 className="mt-8 text-balance font-serif text-5xl leading-tight">
              {title}
            </h1>
            <BlogArticleMeta author={author} publishedAt={publishedAt} />
            <p className="mt-4 text-lg text-muted-foreground">{description}</p>
          </header>
          {relatedTour ? (
            <RelatedTourCard className="mb-12 lg:hidden" tour={relatedTour} />
          ) : null}
          <RichText richText={richText} />
        </main>

        <div className="hidden lg:block">
          <div className="sticky top-4 space-y-6 rounded-lg">
            <TableOfContent richText={richText ?? []} />
            <RelatedTourCard tour={relatedTour} />
          </div>
        </div>
      </div>
    </div>
  );
}

function BlogHeroImage({
  image,
  title,
}: {
  image: Parameters<typeof SanityImage>[0]["image"] | null | undefined;
  title?: string | null;
}) {
  return (
    <div className="mb-10 overflow-hidden rounded-lg bg-muted">
      {image?.id ? (
        <SanityImage
          alt={title ?? "Blog post image"}
          className="aspect-[16/7] w-full object-cover"
          height={700}
          image={image}
          loading="eager"
          width={1600}
        />
      ) : (
        <div className="flex aspect-[16/7] w-full items-end bg-stone-100 p-6 text-stone-700">
          <span className="font-medium text-sm">Featured image</span>
        </div>
      )}
    </div>
  );
}

function BlogArticleMeta({
  author,
  publishedAt,
}: {
  author?: BlogAuthor | null;
  publishedAt?: string | null;
}) {
  if (!(author?.name || publishedAt)) {
    return null;
  }

  const formattedDate = publishedAt
    ? new Date(`${publishedAt}T00:00:00`).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null;

  return (
    <div className="mt-5 flex flex-wrap items-center gap-4 text-sm">
      {author?.name ? (
        <div className="flex items-center gap-3">
          {author.image?.id ? (
            <SanityImage
              alt={author.image.alt ?? author.name}
              className="size-10 rounded-full object-cover"
              height={80}
              image={author.image}
              width={80}
            />
          ) : (
            <div className="flex size-10 items-center justify-center rounded-full bg-muted font-medium text-muted-foreground text-sm">
              {author.name
                .split(" ")
                .filter(Boolean)
                .slice(0, 2)
                .map((part) => part[0])
                .join("")}
            </div>
          )}
          <div>
            <p className="font-medium text-foreground">{author.name}</p>
            {author.position ? (
              <p className="text-muted-foreground">{author.position}</p>
            ) : null}
          </div>
        </div>
      ) : null}
      {formattedDate ? (
        <time className="text-muted-foreground" dateTime={publishedAt ?? ""}>
          {formattedDate}
        </time>
      ) : null}
    </div>
  );
}

function BlogFallback() {
  return <div className="min-h-[50vh]" />;
}
