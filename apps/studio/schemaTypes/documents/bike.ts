import { defineField, defineType } from "sanity";

/**
 * Bike document — reusable fleet bikes referenced by tours.
 * Status + suitableForDifficulty[] power the tour bike picker filter.
 */
export const bikeType = defineType({
  name: "bike",
  title: "Bike",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Bike name",
      type: "string",
      description:
        "How DuVine refers to this bike internally and on the page. Example — Colnago C68",
      validation: (Rule) => Rule.required().max(80),
    }),
    defineField({
      name: "manufacturer",
      title: "Manufacturer",
      type: "string",
      description: "Example — Colnago, BMC, Pinarello, Cannondale.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "model",
      title: "Model designation",
      type: "string",
      description: "Example — C68, Roadmachine, Dogma F.",
    }),
    defineField({
      name: "heroImage",
      title: "Photograph",
      type: "image",
      description:
        "A clean shot of the bike — usually side-on, on a neutral background.",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Alt text",
          type: "string",
          validation: (Rule) => Rule.required(),
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "array",
      of: [{ type: "block" }],
      description:
        "A short paragraph about the bike — frame material, key features, what kind of rider it suits. Appears in the bike block on tour pages.",
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: "suitableForDifficulty",
      title: "Suitable for tour difficulty",
      type: "array",
      of: [{ type: "string" }],
      description:
        "Which tour difficulty levels can use this bike. Used by the tour bike picker to filter out incompatible bikes.",
      options: {
        list: [
          { value: "leisurely", title: "Leisurely" },
          { value: "moderate", title: "Moderate" },
          { value: "challenging", title: "Challenging" },
          { value: "extreme", title: "Extreme" },
        ],
      },
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      description:
        "Active bikes appear in the tour bike picker. Retired bikes are hidden but preserved for historical tour pages.",
      options: {
        list: [
          { value: "active", title: "Active" },
          { value: "retired", title: "Retired" },
        ],
        layout: "radio",
      },
      initialValue: "active",
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "manufacturer",
      media: "heroImage",
      status: "status",
    },
    prepare({ title, subtitle, media, status }) {
      return {
        title,
        subtitle: status === "retired" ? `${subtitle} · Retired` : subtitle,
        media,
      };
    },
  },
});
