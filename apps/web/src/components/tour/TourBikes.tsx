import { RichText } from "@/components/elements/rich-text";
import { SanityImage } from "@/components/elements/sanity-image";
import type { TourBike } from "./types";

export function TourBikes({ bikes }: { bikes?: TourBike[] }) {
  if (!bikes?.length) {
    return null;
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 md:px-6">
      <div className="max-w-2xl">
        <p className="font-medium text-[#007290] text-sm uppercase tracking-[0.14em]">
          Ride
        </p>
        <h2 className="mt-2 font-serif text-4xl text-foreground">
          Bikes on this tour
        </h2>
      </div>

      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {bikes.map((bike) => (
          <article
            className="rounded-md border border-border bg-white p-4"
            key={bike._id}
          >
            <div className="overflow-hidden rounded-md border border-border bg-muted">
              {bike.heroImage?.id ? (
                <SanityImage
                  className="aspect-[4/3] h-full w-full rounded-none object-cover"
                  height={900}
                  image={bike.heroImage}
                  width={1200}
                />
              ) : (
                <div className="aspect-[4/3] bg-muted" aria-hidden />
              )}
            </div>
            <h3 className="mt-4 font-medium text-foreground text-lg">
              {bike.name}
            </h3>
            <p className="mt-1 text-muted-foreground text-sm">
              {[bike.manufacturer, bike.model].filter(Boolean).join(" ")}
            </p>
            <RichText
              className="mt-3 prose-p:text-sm prose-p:leading-6"
              richText={bike.description ?? []}
            />
          </article>
        ))}
      </div>
    </section>
  );
}
