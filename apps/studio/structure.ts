import {
  Bike,
  CalendarDays,
  FileText,
  Newspaper,
  Route,
  User,
} from "lucide-react";
import type { StructureBuilder } from "sanity/structure";

export const structure = (S: StructureBuilder) =>
  S.list()
    .title("DuVine Studio")
    .items([
      S.documentTypeListItem("tour").title("Tours").icon(Route),
      S.documentTypeListItem("bike").title("Bikes").icon(Bike),
      S.documentTypeListItem("departureSchedule")
        .title("Departure schedules from Kaptio")
        .icon(CalendarDays),
      S.divider(),
      S.documentTypeListItem("blog").title("Blog posts").icon(Newspaper),
      S.documentTypeListItem("author").title("Authors").icon(User),
      S.listItem()
        .title("Blog listing page")
        .icon(FileText)
        .child(
          S.document()
            .schemaType("blogIndex")
            .documentId("blogIndex")
            .title("Blog listing page")
        ),
    ]);
