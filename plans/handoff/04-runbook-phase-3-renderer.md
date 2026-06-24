# 04 — Phase 3: Build the tour page renderer

**Goal:** A working `/tour/[slug]` route in `apps/web` that fetches a tour by slug, dereferences bikes and the departure schedule, and renders the page sections in order. Visual Editing / Presentation tool works.

**Time:** ~3-4 hours.

**Exit criteria:**
- `localhost:3000/tour/colnago-tuscany-bike-tour` renders (once seed is loaded in Phase 4)
- All sections appear in correct order: hero → optional private notice → intro → highlights → itinerary → details → bikes → departures
- Visual Editing overlays appear when opened through the Presentation tool in Studio
- No client-side fetch waterfalls (single GROQ query)

## Source files (already written)

In `/handoff/code/web/`. Folder structure mirrors where they land in `apps/web/`:

| Source | Lands at |
|---|---|
| `sanity/queries/tour.ts` | `apps/web/sanity/queries/tour.ts` |
| `app/tour/[slug]/page.tsx` | `apps/web/app/tour/[slug]/page.tsx` |
| `components/tour/TourHero.tsx` | `apps/web/components/tour/TourHero.tsx` |
| `components/tour/TourIntroduction.tsx` | `apps/web/components/tour/TourIntroduction.tsx` |
| `components/tour/TourHighlights.tsx` | `apps/web/components/tour/TourHighlights.tsx` |
| `components/tour/TourItinerary.tsx` | `apps/web/components/tour/TourItinerary.tsx` |
| `components/tour/TourDetailSections.tsx` | `apps/web/components/tour/TourDetailSections.tsx` |
| `components/tour/TourBikes.tsx` | `apps/web/components/tour/TourBikes.tsx` |
| `components/tour/TourDepartures.tsx` | `apps/web/components/tour/TourDepartures.tsx` |
| `components/tour/TourPrivateNotice.tsx` | `apps/web/components/tour/TourPrivateNotice.tsx` |

## Steps

### 1. Inspect the starter's existing patterns

Before dropping files in, look at how the starter handles its existing routes. Specifically:

```bash
ls apps/web/app/
ls apps/web/sanity/
ls apps/web/components/
```

Pay attention to:

- **`apps/web/sanity/lib/live.ts`** (or similar) — exports `sanityFetch` for live preview. The page.tsx assumes this exists; the Roboto starter ships it. Confirm the import path.
- **`apps/web/sanity/lib/image.ts`** — exports `urlFor` builder. Confirm.
- **Path aliases in `apps/web/tsconfig.json`** — the code uses `@/` aliases. If the starter uses different aliases (`~/`, `@web/`), search-and-replace.

### 2. Drop in the files

Preserve folder structure. `mkdir -p` first where needed.

### 3. Adjust imports if necessary

The skeleton imports assume:

- `@/sanity/lib/live` exports `sanityFetch`
- `@/sanity/lib/image` exports `urlFor`
- `next-sanity` is already a dependency (it is in the starter)

If any of these paths differ in your starter version, fix the imports. They're at the top of each file — quick to grep:

```bash
grep -rn "@/sanity" apps/web/app/tour apps/web/components/tour
```

### 4. Regenerate TypeGen

The starter ships with Sanity TypeGen. After dropping in the new query:

```bash
cd apps/web
pnpm sanity typegen extract
pnpm sanity typegen generate
```

This regenerates `sanity.types.ts` with types for the new query. The page should now compile against real types (if the starter wires it that way; some starters just use `any`).

### 5. Run the dev server

```bash
pnpm dev
```

Navigate to `http://localhost:3000/tour/colnago-tuscany-bike-tour`. You'll get a 404 — that's expected (no seed loaded yet). The route is wired.

To verify the renderer without seed data: create a Tour document manually in Studio with at minimum a title, slug `test`, durationDays `2`, difficulty `moderate`, hero image (upload anything), intro (one paragraph), one highlight block, two itinerary days, three detail sections, one bike (also created manually), one departure schedule. Publish. Then visit `/tour/test`. Should render.

### 6. Wire Presentation / Visual Editing

The Roboto starter ships Presentation already configured. Two things to verify:

**a. `apps/studio/sanity.config.ts` has the Presentation tool wired:**

```ts
import {presentationTool} from 'sanity/presentation'

plugins: [
  presentationTool({
    previewUrl: {
      origin: process.env.SANITY_STUDIO_PRESENTATION_URL || 'http://localhost:3000',
      preview: '/',
    },
  }),
]
```

**b. `apps/web` has the live preview / draft-mode wiring:**

The starter ships routes like `apps/web/app/api/draft-mode/enable/route.ts`. They should work out of the box. If `sanityFetch` doesn't return draft content when called from Studio's Presentation iframe, check that `SANITY_API_READ_TOKEN` is set in `apps/web/.env`.

**Test it:** in Studio, open the Presentation tool (toolbar icon). Navigate to a tour. Click into a field on the right pane — it should highlight the corresponding region on the left preview.

### 7. Commit

```bash
git add apps/web
git commit -m "Add tour page renderer + GROQ query + section components"
git push
```

## Styling notes

- Stays close to the starter's Tailwind config. The components use `text-stone-*`, `prose prose-stone` — adjust if the starter has a different palette/typography preset.
- **Don't pixel-match `duvine.com`.** Clean, professional, vaguely DuVine-flavored is the bar. The story is "Sanity content rendered cleanly."
- The Shadcn components shipped with the starter (Accordion, etc.) can replace the `<details>` elements in `TourDetailSections` if you want a polished look. Not required.

## What you should NOT do in Phase 3

- Don't build a tour finder / index page — out of scope for the demo
- Don't add a CMS-driven nav or footer — the starter ships these; let them be
- Don't wire any analytics or other instrumentation
- Don't refactor the starter's existing routes

## Output state for Phase 4

- `/tour/[slug]` route renders for any tour document
- Visual Editing works in Presentation tool
- Type errors clean (`pnpm typecheck` if the starter ships one)
- Branch `main` is one commit ahead of Phase 2
