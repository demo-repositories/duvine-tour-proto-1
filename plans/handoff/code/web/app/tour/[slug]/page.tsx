import {notFound} from 'next/navigation'
import {sanityFetch} from '@/sanity/lib/live'
import {TOUR_BY_SLUG_QUERY, TOUR_SLUGS_QUERY} from '@/sanity/queries/tour'
import {TourHero} from '@/components/tour/TourHero'
import {TourIntroduction} from '@/components/tour/TourIntroduction'
import {TourHighlights} from '@/components/tour/TourHighlights'
import {TourItinerary} from '@/components/tour/TourItinerary'
import {TourDetailSections} from '@/components/tour/TourDetailSections'
import {TourBikes} from '@/components/tour/TourBikes'
import {TourDepartures} from '@/components/tour/TourDepartures'
import {TourPrivateNotice} from '@/components/tour/TourPrivateNotice'
import type {Metadata} from 'next'

type Props = {
  params: Promise<{slug: string}>
}

/**
 * Generate static params for known tours at build time.
 * New tours surface on revalidation or via on-demand revalidation webhook.
 */
export async function generateStaticParams() {
  const {data} = await sanityFetch({
    query: TOUR_SLUGS_QUERY,
    perspective: 'published',
    stega: false,
  })
  return (data ?? []).map(({slug}: {slug: string}) => ({slug}))
}

export async function generateMetadata({params}: Props): Promise<Metadata> {
  const {slug} = await params
  const {data: tour} = await sanityFetch({
    query: TOUR_BY_SLUG_QUERY,
    params: {slug},
    perspective: 'published',
    stega: false,
  })
  if (!tour) return {}
  return {
    title: tour.seo?.metaTitle || tour.title,
    description: tour.seo?.metaDescription || tour.subtitle,
    openGraph: {
      title: tour.seo?.metaTitle || tour.title,
      description: tour.seo?.metaDescription || tour.subtitle,
    },
  }
}

export default async function TourPage({params}: Props) {
  const {slug} = await params
  const {data: tour} = await sanityFetch({
    query: TOUR_BY_SLUG_QUERY,
    params: {slug},
  })

  if (!tour) notFound()

  return (
    <article className="mx-auto max-w-5xl px-4 py-8">
      <TourHero tour={tour} />
      {tour.privateOnly && tour.privateOnlyDetails ? (
        <TourPrivateNotice note={tour.privateOnlyDetails} />
      ) : null}
      <TourIntroduction blocks={tour.introduction} />
      <TourHighlights blocks={tour.highlightBlocks} />
      <TourItinerary days={tour.itinerary} />
      <TourDetailSections sections={tour.detailSections} />
      <TourBikes bikes={tour.bikes} />
      <TourDepartures schedule={tour.departureSchedule} />
    </article>
  )
}
