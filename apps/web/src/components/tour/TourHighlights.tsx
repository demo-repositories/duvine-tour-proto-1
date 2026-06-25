import { stegaClean } from "next-sanity";

import type { TourHighlight } from "./types";

const CATEGORY_LABEL: Record<string, string> = {
  highlights: "Highlights",
  eat: "Eat",
  drink: "Drink",
  sleep: "Sleep",
  stay: "Stay",
  experience: "Experience",
};

function getCategoryLabel(category?: string | null) {
  const cleanCategory = stegaClean(category ?? "");
  return CATEGORY_LABEL[cleanCategory] ?? cleanCategory;
}

export function TourHighlights({ blocks }: { blocks?: TourHighlight[] }) {
  if (!blocks?.length) {
    return null;
  }

  return (
    <section className="border-border border-y bg-muted/30">
      <div className="mx-auto grid max-w-7xl gap-4 px-4 py-12 md:grid-cols-3 md:px-6">
        {blocks.map((block) => (
          <section
            className="rounded-md border border-border bg-white p-5"
            key={block._key}
          >
            <h2 className="font-medium text-[#007290] text-sm uppercase tracking-[0.14em]">
              {getCategoryLabel(block.category)}
            </h2>
            {block.items?.length ? (
              <ul className="mt-4 space-y-3 text-foreground text-sm leading-6">
                {block.items.map((item) => (
                  <li className="border-border border-t pt-3" key={item}>
                    {item}
                  </li>
                ))}
              </ul>
            ) : null}
          </section>
        ))}
      </div>
    </section>
  );
}
