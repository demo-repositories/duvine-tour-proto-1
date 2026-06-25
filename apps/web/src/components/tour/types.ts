import type { QueryTourBySlugResult } from "@workspace/sanity/types";

export type TourPageData = NonNullable<QueryTourBySlugResult>;
export type TourHighlight = NonNullable<TourPageData["highlightBlocks"]>[number];
export type TourItineraryDay = NonNullable<TourPageData["itinerary"]>[number];
export type TourDetailSection = NonNullable<
  TourPageData["detailSections"]
>[number];
export type TourBike = NonNullable<TourPageData["bikes"]>[number];
export type TourDepartureSchedule = TourPageData["departureSchedule"];
