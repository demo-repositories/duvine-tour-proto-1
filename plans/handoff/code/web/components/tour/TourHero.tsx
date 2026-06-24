import Image from 'next/image'
import {urlFor} from '@/sanity/lib/image'
import type {SanityImageSource} from '@sanity/image-url/lib/types/types'

type Props = {
  tour: {
    title: string
    subtitle?: string
    heroImage?: SanityImageSource & {alt?: string; caption?: string; credit?: string; lqip?: string}
    durationDays: number
    difficulty: string
  }
}

const DIFFICULTY_LABEL: Record<string, string> = {
  leisurely: 'Leisurely',
  moderate: 'Moderate',
  challenging: 'Challenging',
  extreme: 'Extreme',
}

export function TourHero({tour}: Props) {
  return (
    <header className="mb-12">
      {tour.heroImage ? (
        <div className="relative aspect-[16/9] w-full overflow-hidden rounded-lg">
          <Image
            src={urlFor(tour.heroImage).width(1600).quality(85).url()}
            alt={tour.heroImage.alt ?? tour.title}
            placeholder={tour.heroImage.lqip ? 'blur' : 'empty'}
            blurDataURL={tour.heroImage.lqip}
            fill
            priority
            className="object-cover"
            sizes="(min-width: 1024px) 1024px, 100vw"
          />
        </div>
      ) : (
        <div className="aspect-[16/9] w-full rounded-lg bg-stone-200" aria-hidden />
      )}
      <h1 className="mt-6 text-4xl font-medium tracking-tight text-stone-900">{tour.title}</h1>
      {tour.subtitle ? (
        <p className="mt-2 text-lg text-stone-600">{tour.subtitle}</p>
      ) : null}
      <dl className="mt-4 flex gap-6 text-sm text-stone-700">
        <div>
          <dt className="sr-only">Duration</dt>
          <dd>{tour.durationDays} days</dd>
        </div>
        <div>
          <dt className="sr-only">Difficulty</dt>
          <dd>{DIFFICULTY_LABEL[tour.difficulty] ?? tour.difficulty}</dd>
        </div>
      </dl>
      {tour.heroImage?.credit ? (
        <p className="mt-2 text-xs text-stone-500">Photograph: {tour.heroImage.credit}</p>
      ) : null}
    </header>
  )
}
