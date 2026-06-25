import { stegaClean } from "next-sanity";

import { RichText } from "@/components/elements/rich-text";
import { SanityImage } from "@/components/elements/sanity-image";
import type { TourItineraryDay } from "./types";

const MEAL_LABEL: Record<string, string> = {
  breakfast: "Breakfast",
  lunch: "Lunch",
  dinner: "Dinner",
  snack: "Snack",
};

function formatMeals(meals?: string[] | null) {
  if (!meals?.length) {
    return;
  }
  return meals
    .map((meal) => MEAL_LABEL[stegaClean(meal)] ?? stegaClean(meal))
    .join(", ");
}

function formatDistance(day: TourItineraryDay) {
  const kilometers = day.distance?.kilometers;
  const miles = day.distance?.miles;
  if (!(kilometers || miles)) {
    return;
  }
  if (kilometers && miles) {
    return `${kilometers} km / ${miles} mi`;
  }
  return kilometers ? `${kilometers} km` : `${miles} mi`;
}

function formatClimb(day: TourItineraryDay) {
  const meters = day.elevation?.meters;
  const feet = day.elevation?.feet;
  if (!(meters || feet)) {
    return;
  }
  if (meters && feet) {
    return `${meters} m / ${feet} ft climb`;
  }
  return meters ? `${meters} m climb` : `${feet} ft climb`;
}

export function TourItinerary({ days }: { days?: TourItineraryDay[] }) {
  if (!days?.length) {
    return null;
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 md:px-6" id="itinerary">
      <div className="max-w-2xl">
        <p className="font-medium text-[#007290] text-sm uppercase tracking-[0.14em]">
          Day by day
        </p>
        <h2 className="mt-2 font-serif text-4xl text-foreground">
          Itinerary
        </h2>
      </div>

      <ol className="mt-10 space-y-10">
        {days.map((day, index) => {
          const meals = formatMeals(day.meals);
          const distance = formatDistance(day);
          const climb = formatClimb(day);

          return (
            <li
              className="grid gap-6 border-border border-t pt-10 lg:grid-cols-[220px_1fr]"
              key={day._key}
            >
              <aside className="text-sm">
                <p className="font-serif text-3xl text-foreground">
                  Day {index + 1}
                </p>
                {day.locations ? (
                  <p className="mt-2 text-muted-foreground">
                    {day.locations}
                  </p>
                ) : null}
                <dl className="mt-5 space-y-3 text-muted-foreground">
                  {distance ? (
                    <div>
                      <dt className="sr-only">Distance</dt>
                      <dd>{distance}</dd>
                    </div>
                  ) : null}
                  {climb ? (
                    <div>
                      <dt className="sr-only">Climb</dt>
                      <dd>{climb}</dd>
                    </div>
                  ) : null}
                  {meals ? (
                    <div>
                      <dt className="sr-only">Meals</dt>
                      <dd>{meals}</dd>
                    </div>
                  ) : null}
                  {day.accommodation ? (
                    <div>
                      <dt className="sr-only">Accommodation</dt>
                      <dd>{day.accommodation}</dd>
                    </div>
                  ) : null}
                </dl>
              </aside>

              <div>
                <h3 className="font-serif text-3xl text-foreground">
                  {day.title}
                </h3>
                {day.image?.id ? (
                  <div className="mt-5 overflow-hidden rounded-md border border-border bg-muted">
                    <SanityImage
                      className="aspect-[16/9] h-full w-full rounded-none object-cover"
                      height={900}
                      image={day.image}
                      width={1600}
                    />
                  </div>
                ) : null}
                <RichText
                  className="mt-5 prose-p:leading-7"
                  richText={day.description ?? []}
                />
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
