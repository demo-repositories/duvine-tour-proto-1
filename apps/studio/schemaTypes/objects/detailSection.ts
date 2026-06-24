import { defineField, defineType } from "sanity";

/**
 * Detail section — one entry in the Inclusions + Details accordion.
 * Optional pinToTop for legally required or seasonal content.
 */
export const detailSectionType = defineType({
  name: "detailSection",
  title: "Details section",
  type: "object",
  fields: [
    defineField({
      name: "heading",
      title: "Section heading",
      type: "string",
      description:
        "The accordion heading guests see. Pick a heading that tells them what's inside before they expand it. Examples — What's Included; Accommodations; Terrain and Difficulty; Cancellation Policy.",
      validation: (Rule) => Rule.required().max(80),
    }),
    defineField({
      name: "body",
      title: "Section content",
      type: "array",
      of: [
        { type: "block" },
        {
          type: "image",
          options: { hotspot: true },
          fields: [{ name: "alt", type: "string", title: "Alt text" }],
        },
      ],
      description: "Rich text. Bullet lists and inline images work well here.",
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: "pinToTop",
      title: "Pin this section to the top",
      type: "boolean",
      description:
        "Optional. When on, this section appears before the other detail sections regardless of its order in the list. Useful for legally required content or seasonal notices.",
      initialValue: false,
    }),
  ],
  preview: {
    select: { title: "heading", pinned: "pinToTop" },
    prepare({ title, pinned }) {
      return {
        title,
        subtitle: pinned ? "📌 Pinned to top" : undefined,
      };
    },
  },
});
