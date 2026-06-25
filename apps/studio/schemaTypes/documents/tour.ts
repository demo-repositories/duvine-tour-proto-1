import { defineField, defineType, defineArrayMember } from "sanity";

/**
 * Tour document — the primary editorial surface for a DuVine guided cycling tour.
 *
 * Demo moments implemented here:
 *   1. Cross-field validator — itinerary.length must equal durationDays
 *   2. Reference filter on bikes — active + difficulty-appropriate only
 *   3. Conditional visibility — privateOnlyDetails hidden unless privateOnly is on
 *   4. Async validator — featured cap of 6 across the dataset
 *
 * Editorial language conventions (audience: Gwen Kidera, Mia — non-technical):
 *   - Field titles use DuVine's own vocabulary from duvine.com
 *   - Descriptions read as if briefing an editor, not a developer
 *   - Validation messages are explanations, not error codes
 */
export const tourType = defineType({
  name: "tour",
  title: "Tour",
  type: "document",
  description:
    "A guided cycling tour offering. This is what a guest sees when they land on a tour page.",

  groups: [
    { name: "editorial", title: "Editorial", default: true },
    { name: "itinerary", title: "Itinerary" },
    { name: "practical", title: "Practical Details" },
    { name: "bookings", title: "Dates and Bookings" },
    { name: "visibility", title: "Visibility and Status" },
  ],

  fields: [
    defineField({
      name: "title",
      title: "Tour name",
      type: "string",
      description:
        "The headline name guests see at the top of the page and across the site. Keep it under 60 characters so it reads cleanly in search results. Example — Colnago Tuscany Bike Tour",
      group: "editorial",
      validation: (Rule) =>
        Rule.required()
          .max(60)
          .warning("Long tour names get truncated in search results."),
    }),

    defineField({
      name: "slug",
      title: "URL slug",
      type: "slug",
      description:
        "The address of the tour page. Auto-generated from the tour name; edit only if you have a specific URL in mind.",
      options: { source: "title", maxLength: 80 },
      group: "editorial",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "subtitle",
      title: "Subtitle",
      type: "string",
      description:
        "A short tagline that appears under the tour name. One sentence; sets the tone. Example — An immersive cycling tour through the place we know best.",
      group: "editorial",
      validation: (Rule) => Rule.max(120),
    }),

    defineField({
      name: "heroImage",
      title: "Hero photograph",
      type: "image",
      description:
        "The first image guests see on the tour page. Choose a landscape-orientation photograph that captures the spirit of the trip. Also used in social shares and the tour finder grid.",
      options: { hotspot: true },
      group: "editorial",
      fields: [
        defineField({
          name: "alt",
          title: "Alt text",
          type: "string",
          description:
            "Describe what's in the photograph for guests who can't see it and for search engines. One sentence, 100-150 characters.",
          validation: (Rule) => Rule.required().max(200),
        }),
        defineField({
          name: "caption",
          title: "Caption",
          type: "string",
          description: "Optional. Appears below the image on the page.",
        }),
        defineField({
          name: "credit",
          title: "Photographer credit",
          type: "string",
          description: "Optional. Photographer name or agency.",
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "durationDays",
      title: "Tour length (days)",
      type: "number",
      description:
        "How many days the tour runs, including arrival and departure days. Used in tour finder filters, search snippets, and itinerary validation.",
      group: "editorial",
      validation: (Rule) =>
        Rule.required()
          .min(2)
          .max(21)
          .integer()
          .error("Tour length must be a whole number between 2 and 21 days."),
    }),

    defineField({
      name: "difficulty",
      title: "Difficulty",
      type: "string",
      description:
        "How challenging this tour is, in DuVine's own words. Appears on the tour page and powers the tour finder filter.",
      options: {
        list: [
          { value: "leisurely", title: "Leisurely" },
          { value: "moderate", title: "Moderate" },
          { value: "challenging", title: "Challenging" },
          { value: "extreme", title: "Extreme" },
        ],
        layout: "radio",
      },
      group: "editorial",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "introduction",
      title: "Introduction",
      type: "array",
      of: [{ type: "block" }],
      description:
        "The opening 2-3 paragraphs that sit below the hero image. Tell guests what makes this tour special and what kind of guest will love it.",
      group: "editorial",
      validation: (Rule) => Rule.required().min(1),
    }),

    defineField({
      name: "highlightBlocks",
      title: "Highlights, Eat, Drink, and other quick callouts",
      type: "array",
      of: [{ type: "highlightBlock" }],
      description:
        "Short bulleted callouts that appear in the page header. Add a Highlights block for the tour's signature moments; an Eat block for memorable meals; a Drink block for wines and tastings. Drag to reorder.",
      group: "editorial",
      validation: (Rule) => Rule.min(1).max(6),
    }),

    // ITINERARY ─────────────────────────────────────────────────────────────

    defineField({
      name: "itinerary",
      title: "Day-by-day itinerary",
      type: "array",
      of: [{ type: "itineraryDay" }],
      description:
        "One entry per day. Drag days to reorder — day numbers update automatically from the order.",
      group: "itinerary",
      /**
       * DEMO MOMENT #1 — cross-field validator.
       * Itinerary length must equal durationDays. Warns inline as the editor types.
       */
      validation: (Rule) =>
        Rule.required()
          .min(2)
          .custom((itinerary, context) => {
            const duration = (
              context.document as { durationDays?: number } | undefined
            )?.durationDays;
            if (!itinerary || !Array.isArray(itinerary) || duration == null)
              return true;
            if (itinerary.length !== duration) {
              return `You've added ${itinerary.length} ${
                itinerary.length === 1 ? "day" : "days"
              } but the tour length above is set to ${duration}. Add or remove days so they match.`;
            }
            return true;
          }),
    }),

    // PRACTICAL DETAILS ─────────────────────────────────────────────────────

    defineField({
      name: "detailSections",
      title: "Inclusions and details",
      type: "array",
      of: [{ type: "detailSection" }],
      description:
        "The accordion sections below the itinerary — what's included, accommodations, terrain, what to bring, cancellation policy, anything else specific to this tour. Reorder by dragging.",
      group: "practical",
      validation: (Rule) =>
        Rule.min(3).error("Add at least three detail sections."),
    }),

    /**
     * DEMO MOMENT #2 — reference filter.
     * Bike picker shows only active bikes whose suitableForDifficulty[]
     * includes the tour's current difficulty value.
     */
    defineField({
      name: "bikes",
      title: "Bikes on this tour",
      type: "array",
      description:
        "The bikes guests will ride on this tour. The picker only shows bikes that are currently active and rated for this tour's difficulty level. Reorder to control display order on the page.",
      group: "practical",
      of: [
        defineArrayMember({
          type: "reference",
          to: [{ type: "bike" }],
          options: {
            filter: ({ document }) => {
              const difficulty = (
                document as { difficulty?: string } | undefined
              )?.difficulty;

              if (!difficulty) {
                return {
                  filter: 'status == "active"',
                };
              }

              return {
                filter:
                  'status == "active" && $tourDifficulty in suitableForDifficulty',
                params: { tourDifficulty: difficulty },
              };
            },
          },
        }),
      ],
      validation: (Rule) =>
        Rule.required()
          .min(1)
          .max(5)
          .error("Select between one and five bikes."),
    }),

    // DATES AND BOOKINGS (EXTERNAL) ────────────────────────────────────────

    defineField({
      name: "departureSchedule",
      title: "Departure schedule",
      type: "reference",
      to: [{ type: "departureSchedule" }],
      description:
        "The live dates and prices for this tour. Departure data comes from Kaptio — DuVine's reservation system — so the Studio shows it read-only. To change dates or pricing, update them in Kaptio and they'll refresh here within a few minutes.",
      group: "bookings",
      validation: (Rule) => Rule.required(),
    }),

    // VISIBILITY AND STATUS ────────────────────────────────────────────────

    defineField({
      name: "privateOnly",
      title: "Private bookings only",
      type: "boolean",
      description:
        "Turn on if this tour is offered only as a private departure. When on, the tour is hidden from the tour finder and public listings but remains accessible by direct URL.",
      initialValue: false,
      group: "visibility",
    }),

    /**
     * DEMO MOMENT #3 — conditional visibility.
     * Hidden unless privateOnly is true.
     */
    defineField({
      name: "privateOnlyDetails",
      title: "Note about private bookings",
      type: "text",
      description:
        "Optional. A short message shown to guests who reach this tour by direct URL — explaining how to inquire about a private booking.",
      group: "visibility",
      hidden: ({ parent }) => !parent?.privateOnly,
      validation: (Rule) =>
        Rule.max(280).error(
          "Keep the private-booking note short — under 280 characters."
        ),
    }),

    /**
     * DEMO MOMENT #4 — async featured cap of 6.
     * When set to true, count other featured tours; block publish if cap is reached.
     */
    defineField({
      name: "featured",
      title: "Feature on the homepage",
      type: "boolean",
      description:
        "Turn on to surface this tour in the homepage featured grid. Up to six tours can be featured at a time.",
      initialValue: false,
      group: "visibility",
      validation: (Rule) =>
        Rule.custom(async (featured, context) => {
          if (!featured) return true;
          const { getClient, document } = context;
          if (!getClient) return true;
          const client = getClient({ apiVersion: "2024-10-01" });
          const currentId = document?._id?.replace(/^drafts\./, "");
          const others = await client.fetch<{ _id: string; title: string }[]>(
            `*[_type == "tour" && featured == true && !(_id in [$id, $draftId])]{_id, title}`,
            { id: currentId, draftId: `drafts.${currentId}` }
          );
          if (others.length >= 6) {
            const names = others
              .map((o) => o.title)
              .filter(Boolean)
              .join(", ");
            return `The homepage featured grid already has 6 tours: ${names}. Unfeature one before featuring this tour.`;
          }
          return true;
        }),
    }),

    defineField({
      name: "seo",
      title: "Search and social",
      type: "object",
      description:
        "How this tour appears in Google search results and on Facebook/Instagram when shared. Optional — sensible defaults are derived from the tour name, subtitle, and hero image.",
      group: "editorial",
      fields: [
        defineField({
          name: "metaTitle",
          title: "Meta title",
          type: "string",
          description:
            "Optional override of the title shown in search results.",
          validation: (Rule) => Rule.max(60),
        }),
        defineField({
          name: "metaDescription",
          title: "Meta description",
          type: "text",
          description:
            "One- to two-sentence description for search results. About 155 characters.",
          validation: (Rule) => Rule.max(160),
        }),
        defineField({
          name: "ogImage",
          title: "Social-share image",
          type: "image",
          description:
            "Optional override of the social-share image. Defaults to the hero photograph.",
          options: { hotspot: true },
        }),
      ],
    }),
  ],

  preview: {
    select: {
      title: "title",
      subtitle: "subtitle",
      media: "heroImage",
      duration: "durationDays",
      difficulty: "difficulty",
    },
    prepare({ title, media, duration, difficulty }) {
      const subtitleParts: string[] = [];
      if (duration) subtitleParts.push(`${duration} days`);
      if (difficulty) subtitleParts.push(String(difficulty));
      return {
        title: title || "Untitled tour",
        subtitle: subtitleParts.join(" · "),
        media,
      };
    },
  },
});
