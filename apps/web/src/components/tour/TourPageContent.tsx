import type { TourPageData } from "./types";
import { TourBikes } from "./TourBikes";
import { TourDepartures } from "./TourDepartures";
import { TourDetailSections } from "./TourDetailSections";
import { TourHero } from "./TourHero";
import { TourHighlights } from "./TourHighlights";
import { TourIntroduction } from "./TourIntroduction";
import { TourItinerary } from "./TourItinerary";
import { TourPrivateNotice } from "./TourPrivateNotice";
import { TourPromoBar } from "./TourPromoBar";

export function TourPageContent({ tour }: { tour: TourPageData }) {
  return (
    <main>
      <TourPromoBar schedule={tour.departureSchedule} />
      <TourHero tour={tour} />
      {tour.privateOnly && tour.privateOnlyDetails ? (
        <TourPrivateNotice note={tour.privateOnlyDetails} />
      ) : null}
      <TourIntroduction blocks={tour.introduction} />
      <TourHighlights blocks={tour.highlightBlocks ?? []} />
      <TourItinerary days={tour.itinerary ?? []} />
      <TourDetailSections sections={tour.detailSections ?? []} />
      <TourBikes bikes={tour.bikes ?? []} />
      <TourDepartures schedule={tour.departureSchedule} />
    </main>
  );
}
