import Image from 'next/image'
import {PortableText, type PortableTextBlock} from 'next-sanity'
import {urlFor} from '@/sanity/lib/image'
import type {SanityImageSource} from '@sanity/image-url/lib/types/types'

type Day = {
  _key: string
  title: string
  locations?: string
  description: PortableTextBlock[]
  image?: SanityImageSource & {alt?: string; lqip?: string}
  distance?: {kilometers?: number; miles?: number}
  elevation?: {meters?: number; feet?: number}
  meals?: string[]
  accommodation?: string
}

const MEAL_LABEL: Record<string, string> = {
  breakfast: 'Breakfast',
  lunch: 'Lunch',
  dinner: 'Dinner',
  snack: 'Snack',
}

export function TourItinerary({days}: {days?: Day[]}) {
  if (!days?.length) return null
  return (
    <section className="mb-12">
      <h2 className="mb-6 text-2xl font-medium text-stone-900">Itinerary</h2>
      <ol className="space-y-12">
        {days.map((day, i) => (
          <li key={day._key} className="grid gap-6 md:grid-cols-[200px_1fr]">
            <div className="text-sm text-stone-500">
              <div className="text-3xl font-light text-stone-900">Day {i + 1}</div>
              {day.locations ? <div className="mt-1">{day.locations}</div> : null}
              {day.distance?.kilometers != null ? (
                <div className="mt-3">
                  {day.distance.kilometers} km
                  {day.distance.miles != null ? ` / ${day.distance.miles} mi` : null}
                </div>
              ) : null}
              {day.elevation?.meters != null ? (
                <div className="mt-1">↑ {day.elevation.meters} m</div>
              ) : null}
              {day.meals?.length ? (
                <div className="mt-3">
                  Meals: {day.meals.map((m) => MEAL_LABEL[m] ?? m).join(', ')}
                </div>
              ) : null}
              {day.accommodation ? (
                <div className="mt-3 italic">{day.accommodation}</div>
              ) : null}
            </div>
            <div>
              <h3 className="text-xl font-medium text-stone-900">{day.title}</h3>
              {day.image ? (
                <div className="relative mt-3 aspect-[16/9] overflow-hidden rounded-lg">
                  <Image
                    src={urlFor(day.image).width(1000).url()}
                    alt={day.image.alt ?? day.title}
                    placeholder={day.image.lqip ? 'blur' : 'empty'}
                    blurDataURL={day.image.lqip}
                    fill
                    className="object-cover"
                    sizes="(min-width: 768px) 800px, 100vw"
                  />
                </div>
              ) : null}
              <div className="prose prose-stone mt-4 max-w-none">
                <PortableText value={day.description} />
              </div>
            </div>
          </li>
        ))}
      </ol>
    </section>
  )
}
