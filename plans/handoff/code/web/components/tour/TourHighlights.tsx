type Block = {
  _key: string
  category: string
  items: string[]
}

const CATEGORY_LABEL: Record<string, string> = {
  highlights: 'Tour Highlights',
  eat: 'Eat',
  drink: 'Drink',
  sleep: 'Sleep',
  stay: 'Stay',
  experience: 'Experience',
}

export function TourHighlights({blocks}: {blocks?: Block[]}) {
  if (!blocks?.length) return null
  return (
    <section className="mb-12 grid gap-6 md:grid-cols-3">
      {blocks.map((block) => (
        <div key={block._key} className="rounded-lg border border-stone-200 p-4">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-stone-500">
            {CATEGORY_LABEL[block.category] ?? block.category}
          </h2>
          <ul className="mt-3 space-y-2 text-sm text-stone-800">
            {block.items.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>
      ))}
    </section>
  )
}
