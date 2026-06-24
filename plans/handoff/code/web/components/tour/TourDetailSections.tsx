import {PortableText, type PortableTextBlock} from 'next-sanity'

type Section = {
  _key: string
  heading: string
  body: PortableTextBlock[]
  pinToTop?: boolean
}

export function TourDetailSections({sections}: {sections?: Section[]}) {
  if (!sections?.length) return null
  // Pinned sections first, otherwise array order
  const ordered = [...sections].sort((a, b) => {
    if (a.pinToTop && !b.pinToTop) return -1
    if (!a.pinToTop && b.pinToTop) return 1
    return 0
  })
  return (
    <section className="mb-12">
      <h2 className="mb-6 text-2xl font-medium text-stone-900">Inclusions and Details</h2>
      <div className="space-y-2">
        {ordered.map((section) => (
          <details
            key={section._key}
            className="group rounded-lg border border-stone-200 px-4 py-3 open:bg-stone-50"
          >
            <summary className="cursor-pointer list-none font-medium text-stone-900">
              <span className="inline-block w-4 transition-transform group-open:rotate-90">›</span>
              <span className="ml-2">{section.heading}</span>
              {section.pinToTop ? (
                <span className="ml-2 text-xs text-stone-500">📌</span>
              ) : null}
            </summary>
            <div className="prose prose-stone mt-3 max-w-none">
              <PortableText value={section.body} />
            </div>
          </details>
        ))}
      </div>
    </section>
  )
}
