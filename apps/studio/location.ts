import { defineDocuments, defineLocations } from "sanity/presentation";

import { getPresentationPreviewPath } from "@/utils/presentation-preview";

function getLocation({
  documentType,
  fallbackTitle,
  slug,
  title,
}: {
  documentType: string;
  fallbackTitle: string;
  slug?: string | null;
  title?: string | null;
}) {
  const href = getPresentationPreviewPath({ documentType, slug });
  if (!href) {
    return [];
  }

  return [
    {
      title: title || fallbackTitle,
      href,
    },
  ];
}

export const locations = {
  blog: defineLocations({
    select: {
      title: "title",
      slug: "slug.current",
    },
    resolve: (doc) => ({
      locations: [
        ...getLocation({
          documentType: "blog",
          fallbackTitle: "Untitled",
          slug: doc?.slug,
          title: doc?.title,
        }),
        {
          title: "Blog",
          href: "/blog",
        },
      ],
    }),
  }),
  home: defineLocations({
    select: {
      title: "title",
      slug: "slug.current",
    },
    resolve: () => ({
      locations: [
        {
          title: "Home",
          href: "/",
        },
      ],
    }),
  }),
  page: defineLocations({
    select: {
      title: "title",
      slug: "slug.current",
    },
    resolve: (doc) => ({
      locations: getLocation({
        documentType: "page",
        fallbackTitle: "Untitled",
        slug: doc?.slug,
        title: doc?.title,
      }),
    }),
  }),
  tour: defineLocations({
    select: {
      title: "title",
      slug: "slug.current",
    },
    resolve: (doc) => ({
      locations: getLocation({
        documentType: "tour",
        fallbackTitle: "Untitled tour",
        slug: doc?.slug,
        title: doc?.title,
      }),
    }),
  }),
};

export const mainDocuments = defineDocuments([
  {
    route: "/tours/:slug",
    resolve: ({ params }) => ({
      filter: '_type == "tour" && slug.current == $slug',
      params: { slug: params.slug },
    }),
  },
]);
