import Image from 'next/image'
import {PortableText, type PortableTextBlock} from 'next-sanity'
import {urlFor} from '@/sanity/lib/image'
import type {SanityImageSource} from '@sanity/image-url/lib/types/types'

type Bike = {
  _id: string
  name: string
  manufacturer: string
  model?: string
  heroImage?: SanityImageSource & {alt?: string; lqip?: string}
  description: PortableTextBlock[]
}

export function TourBikes({bikes}: {bikes?: Bike[]}) {
  if (!bikes?.length) return null
  return (
    <section className="mb-12">
      <h2 className="mb-6 text-2xl font-medium text-stone-900">Bikes on this tour</h2>
      <div className="grid gap-6 md:grid-cols-3">
        {bikes.map((bike) => (
          <div key={bike._id} className="rounded-lg border border-stone-200 p-4">
            {bike.heroImage ? (
              <div className="relative aspect-[4/3] overflow-hidden rounded">
                <Image
                  src={urlFor(bike.heroImage).width(600).url()}
                  alt={bike.heroImage.alt ?? bike.name}
                  placeholder={bike.heroImage.lqip ? 'blur' : 'empty'}
                  blurDataURL={bike.heroImage.lqip}
                  fill
                  className="object-cover"
                  sizes="(min-width: 768px) 400px, 100vw"
                />
              </div>
            ) : null}
            <h3 className="mt-3 font-medium text-stone-900">{bike.name}</h3>
            <p className="text-sm text-stone-500">
              {bike.manufacturer}
              {bike.model ? ` · ${bike.model}` : null}
            </p>
            <div className="prose prose-sm prose-stone mt-2 max-w-none">
              <PortableText value={bike.description} />
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
