import { defineField, defineType } from "sanity";

/**
 * Itinerary day — inline object on tour.
 * Day number is derived from array position (not entered by the editor).
 */
export const itineraryDayType = defineType({
  name: "itineraryDay",
  title: "Day",
  type: "object",
  description: "One day of the tour.",
  fields: [
    defineField({
      name: "title",
      title: "Day headline",
      type: "string",
      description:
        "A short headline for this day. The day number is added automatically from the order in the itinerary — don't include it in the headline. Example — Through Chianti to Radda",
      validation: (Rule) => Rule.required().max(80),
    }),
    defineField({
      name: "locations",
      title: "Route summary",
      type: "string",
      description:
        "A one-line summary of where the day goes. Used in the route summary callout on the page. Example — Florence to Panzano via Radda",
      validation: (Rule) => Rule.max(120),
    }),
    defineField({
      name: "description",
      title: "What happens this day",
      type: "array",
      description:
        "The full narrative for this day — rich text with inline images. Write as you'd want a guest to read it the night before.",
      of: [
        {
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "Heading", value: "h3" },
            { title: "Quote", value: "blockquote" },
          ],
          lists: [{ title: "Bullet", value: "bullet" }],
          marks: {
            decorators: [
              { title: "Strong", value: "strong" },
              { title: "Emphasis", value: "em" },
            ],
            annotations: [
              {
                name: "link",
                type: "object",
                title: "Link",
                fields: [{ name: "href", type: "url", title: "URL" }],
              },
            ],
          },
        },
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            {
              name: "alt",
              type: "string",
              title: "Alt text",
              validation: (R) => R.required(),
            },
          ],
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: "image",
      title: "Lead photograph for this day",
      type: "image",
      description:
        "The featured image for this day's section. Landscape orientation works best.",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          type: "string",
          title: "Alt text",
          validation: (R) => R.required(),
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "distance",
      title: "Riding distance",
      type: "object",
      description:
        "How far guests ride this day. Enter kilometers; miles are calculated for guests on the website.",
      fields: [
        defineField({
          name: "kilometers",
          type: "number",
          title: "Kilometers",
          validation: (R) => R.min(0).max(250),
        }),
      ],
    }),
    defineField({
      name: "elevation",
      title: "Climbing",
      type: "object",
      description:
        "Optional. Total ascent for the day. Enter meters; feet are calculated for guests on the website.",
      fields: [
        defineField({ name: "meters", type: "number", title: "Meters" }),
      ],
    }),
    defineField({
      name: "meals",
      title: "Meals included today",
      type: "array",
      of: [{ type: "string" }],
      description: "Tap to add. Breakfast, Lunch, Dinner, or Snack.",
      options: {
        list: [
          { value: "breakfast", title: "Breakfast" },
          { value: "lunch", title: "Lunch" },
          { value: "dinner", title: "Dinner" },
          { value: "snack", title: "Snack" },
        ],
      },
    }),
    defineField({
      name: "accommodation",
      title: "Where guests stay tonight",
      type: "string",
      description:
        "The name of the hotel, villa, or property. Free text for the demo; in production this would reference a Property document type.",
    }),
  ],
  preview: {
    select: { title: "title", locations: "locations", media: "image" },
    prepare({ title, locations, media }) {
      return { title, subtitle: locations, media };
    },
  },
});
