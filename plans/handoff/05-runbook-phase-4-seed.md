# 05 — Phase 4: Seed content

**Goal:** Studio has one fully populated Colnago Tuscany tour, three bikes, one departure schedule. All fields filled with realistic DuVine-voice copy. Renderer at `/tour/colnago-tuscany-bike-tour` shows it all.

**Time:** ~30 minutes (NDJSON provided) + 30-60 minutes uploading images.

**Exit criteria:**
- Seed NDJSON loaded into `production` dataset
- Hero image + 6 day images + 3 bike images uploaded
- Visiting `localhost:3000/tour/colnago-tuscany-bike-tour` shows a fully styled, image-rich tour page
- The four demo moments work on this real document, not just a test doc

## Source files

- `/handoff/code/seed/colnago-tuscany.ndjson` — the seed
- `/handoff/code/seed/seed-instructions.md` — how to load and verify

## Steps

### 1. Load the seed

Follow `seed-instructions.md`. Short version:

```bash
cd apps/studio
pnpm sanity dataset import path/to/colnago-tuscany.ndjson production
```

### 2. Upload images

The seed ships without images. Upload at minimum:

| Document | Field | Suggested source |
|---|---|---|
| Tour: Colnago Tuscany | heroImage | Tuscany landscape with road riders, landscape orientation |
| Each of 6 itinerary days | image | Vineyard, hilltop village, gelato stop, riders cresting a climb, etc. |
| Bike: Colnago C68 | heroImage | Side-on studio shot |
| Bike: BMC Roadmachine | heroImage | Side-on studio shot |
| Bike: Pinarello Dogma F | heroImage | Side-on studio shot |

For each image:

- Drop in the alt text (required by validation)
- Use the **hotspot** tool to center the focal point
- Add a credit if you know the photographer / source
- Caption optional

The Studio's image input has an "AI alt text" suggestion in some Sanity versions; otherwise hand-write 1-sentence alt.

### 3. Tweak copy if needed

The seed content is written in DuVine's voice (editorial, tasteful, no breathless marketing). But if anything reads off — pricing too high/low, an itinerary detail that contradicts the real DuVine page, etc. — fix it in Studio. The content is yours once loaded.

If you'd rather rewrite from scratch using the live page as reference, the `duvine-survey` sandbox in the #prospect-devine channel has `/tmp/colnago.html` cached.

### 4. Seed the shell content (light)

The starter ships with a homepage, navbar, footer, settings. None of them are DuVine-flavored. 30 minutes of light work:

- **Homepage hero** — "DuVine — Bicycle Tours, Reimagined" or similar tagline. The starter probably has a hero block; fill it.
- **Nav items** — Tour Finder, About, Contact (stubs are fine; they don't need to go anywhere)
- **Footer** — DuVine address (their HQ is in Massachusetts; real address on duvine.com)
- **Site title / settings** — "DuVine"

This isn't critical, but it stops the demo from looking like a Sanity starter with DuVine content shoved in. If time is tight, skip.

### 5. Verify on the front-end

```bash
pnpm dev
```

Visit `http://localhost:3000/tour/colnago-tuscany-bike-tour`. The page should render with:

- Hero image at the top
- Title and subtitle
- 6 days, 6 in days/difficulty meta
- Intro paragraphs
- Highlights, Eat, Drink callouts
- 6 itinerary days, with photos and ride distances
- 4 detail sections
- 3 bikes with photos and descriptions
- 4 departures with prices and statuses

If something doesn't render, check the GROQ query and component imports. Hard-refresh + check the network tab for the GROQ response shape.

### 6. Commit

The dataset content lives in Sanity, not git. But the seed NDJSON should be checked in so future re-seeds are reproducible:

```bash
mkdir -p apps/studio/seed
cp /path/to/colnago-tuscany.ndjson apps/studio/seed/
git add apps/studio/seed/
git commit -m "Add Colnago Tuscany seed dataset"
git push
```

## What you should NOT do in Phase 4

- Don't seed competitor tours (DuVine's competitors should not exist in this Studio — defeats immersion)
- Don't write fake testimonials or guest names that could be confused for real customers
- Don't include any DuVine internal content that wasn't on the public site (would be inappropriate for a seed)
- Don't add SEO meta if you don't have it — defaults are fine

## Output state for Phase 5

- Production dataset populated with Colnago Tuscany tour + 3 bikes + 1 schedule + images
- Renderer shows it all locally
- Branch `main` two commits ahead of Phase 3 (one for code, one for seed)
