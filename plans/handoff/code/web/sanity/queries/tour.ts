import {defineQuery} from 'next-sanity'

/**
 * Single GROQ query for a tour page. Dereferences bikes and departureSchedule
 * inline so the page render is one fetch — no client-side waterfalls.
 *
 * Use `defineQuery` for TypeGen support. After adding new queries, run:
 *   pnpm sanity typegen generate
 */
export const TOUR_BY_SLUG_QUERY = defineQuery(`
  *[_type == "tour" && slug.current == $slug][0] {
    _id,
    _type,
    title,
    subtitle,
    "slug": slug.current,
    heroImage {
      ...,
      asset->,
      "lqip": asset->metadata.lqip
    },
    durationDays,
    difficulty,
    introduction,
    highlightBlocks[] {
      _key,
      _type,
      category,
      items
    },
    itinerary[] {
      _key,
      _type,
      title,
      locations,
      description[]{
        ...,
        _type == "image" => {
          ...,
          asset->,
          "lqip": asset->metadata.lqip
        }
      },
      image {
        ...,
        asset->,
        "lqip": asset->metadata.lqip
      },
      distance,
      elevation,
      meals,
      accommodation
    },
    detailSections[] {
      _key,
      _type,
      heading,
      body,
      pinToTop
    },
    bikes[]-> {
      _id,
      name,
      manufacturer,
      model,
      heroImage {
        ...,
        asset->,
        "lqip": asset->metadata.lqip
      },
      description,
      suitableForDifficulty,
      status
    },
    departureSchedule-> {
      _id,
      tourReference,
      departures[] {
        startDate,
        endDate,
        priceUSD,
        status,
        notes
      },
      lastSyncedAt
    },
    privateOnly,
    privateOnlyDetails,
    featured,
    seo
  }
`)

export const TOUR_SLUGS_QUERY = defineQuery(`
  *[_type == "tour" && defined(slug.current)]{ "slug": slug.current }
`)
