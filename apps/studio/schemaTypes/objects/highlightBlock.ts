import { defineField, defineType } from "sanity";

const CATEGORY_LABELS: Record<string, string> = {
  highlights: "Tour Highlights",
  eat: "Eat",
  drink: "Drink",
  sleep: "Sleep",
  stay: "Stay",
  experience: "Experience",
};

/**
 * Polymorphic highlight block — Highlights / Eat / Drink / Sleep / etc.
 * Adding a category is a one-line code change; existing content keeps working.
 */
export const highlightBlockType = defineType({
  name: "highlightBlock",
  title: "Highlight block",
  type: "object",
  fields: [
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      description:
        "What kind of callouts these are. New categories can be added in code without breaking existing content.",
      options: {
        list: Object.entries(CATEGORY_LABELS).map(([value, title]) => ({
          value,
          title,
        })),
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "items",
      title: "Items",
      type: "array",
      of: [{ type: "string" }],
      description:
        "Short bulleted entries — one per line. Each item is a single sentence or phrase. Example for Eat — Truffle hunting and tasting in Chianti",
      validation: (Rule) => Rule.required().min(1).max(8),
    }),
  ],
  preview: {
    select: { category: "category", items: "items" },
    prepare({ category, items }) {
      const label = CATEGORY_LABELS[category] || category || "Highlight block";
      const count = Array.isArray(items) ? items.length : 0;
      return {
        title: label,
        subtitle: `${count} ${count === 1 ? "item" : "items"}`,
      };
    },
  },
});
