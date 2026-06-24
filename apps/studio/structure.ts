import { Bike, CalendarDays, Route } from "lucide-react";
import type { StructureBuilder } from "sanity/structure";

export const structure = (S: StructureBuilder) =>
  S.list()
    .title("DuVine Studio")
    .items([
      S.documentTypeListItem("tour").title("Tours").icon(Route),
      S.documentTypeListItem("bike").title("Bikes").icon(Bike),
      S.documentTypeListItem("departureSchedule")
        .title("Departure schedules from Centaur")
        .icon(CalendarDays),
    ]);
