import { RichText } from "@/components/elements/rich-text";
import type { TourPageData } from "./types";

export function TourIntroduction({
  blocks,
}: {
  blocks?: TourPageData["introduction"];
}) {
  if (!blocks?.length) {
    return null;
  }

  return (
    <section className="mx-auto max-w-3xl px-4 py-14 md:px-6">
      <RichText
        className="prose-p:text-lg prose-p:leading-8"
        richText={blocks}
      />
    </section>
  );
}
