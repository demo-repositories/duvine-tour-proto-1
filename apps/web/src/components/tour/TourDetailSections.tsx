import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@workspace/ui/components/accordion";

import { RichText } from "@/components/elements/rich-text";
import type { TourDetailSection } from "./types";

export function TourDetailSections({
  sections,
}: {
  sections?: TourDetailSection[];
}) {
  if (!sections?.length) {
    return null;
  }

  const orderedSections = [...sections].sort((a, b) => {
    if (a.pinToTop && !b.pinToTop) {
      return -1;
    }
    if (!a.pinToTop && b.pinToTop) {
      return 1;
    }
    return 0;
  });

  return (
    <section className="bg-muted/30">
      <div className="mx-auto max-w-4xl px-4 py-16 md:px-6">
        <p className="font-medium text-[#007290] text-sm uppercase tracking-[0.14em]">
          Details
        </p>
        <h2 className="mt-2 font-serif text-4xl text-foreground">
          Inclusions and details
        </h2>

        <Accordion className="mt-8 border-border border-t" type="multiple">
          {orderedSections.map((section) => (
            <AccordionItem key={section._key} value={section._key}>
              <AccordionTrigger className="py-5 text-base hover:no-underline">
                {section.heading}
              </AccordionTrigger>
              <AccordionContent>
                <RichText
                  className="max-w-none prose-p:leading-7"
                  richText={section.body ?? []}
                />
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
