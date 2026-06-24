import {PortableText, type PortableTextBlock} from 'next-sanity'

type Props = {blocks?: PortableTextBlock[]}

export function TourIntroduction({blocks}: Props) {
  if (!blocks?.length) return null
  return (
    <section className="prose prose-stone max-w-none mb-12">
      <PortableText value={blocks} />
    </section>
  )
}
