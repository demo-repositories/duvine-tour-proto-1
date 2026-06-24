# Seed instructions

## What's here

`colnago-tuscany.ndjson` — one Colnago Tuscany tour, three bikes (Colnago C68, BMC Roadmachine, Pinarello Dogma F), one departure schedule with 4 plausible 2026/2027 departures. All references resolve internally.

**Images are NOT in the seed.** You'll upload these manually in Studio after import(see "Adding images" below).

## Loading the seed

From the project root:

```bash
cd apps/studio
pnpm sanity dataset import path/to/colnago-tuscany.ndjson production
```

If the command asks "Replace existing documents with the same ID?" answer **y**.

## Verify

Open Studio (`http://localhost:3333`). You should see:

- 3 Bike documents in the Bike list
- 1 "Centaur schedule — DVN-COLNAGO-TUSCANY-2026" in the departureSchedule list
- 1 Tour "Colnago Tuscany Bike Tour" in the Tour list

Open the Tour. Verify:

- Itinerary has 6 days (matches durationDays = 6, so the cross-field validator is happy)
- Highlights / Eat / Drink blocks present
- Bikes picker shows the 3 bikes (filter: active + suitableForDifficulty includes "moderate")
- Departure schedule references the schedule doc, read-only

## Adding images

Hero photos make the demo feel real. Minimum: tour hero + 6 itinerary day photos + 3 bike photos = 10 images.

Two approaches:

**(a) Use stock photos.** Unsplash has Tuscany / cycling / vineyard photos that read DuVine-ish. Search: "tuscany cycling", "chianti landscape", "italian villa", "road bike studio shot". Upload via the Studio's image picker on each field.

**(b) Scrape from `duvine.com` (Allan OK'd this for fidelity).** The page `https://www.duvine.com/tour/colnago-tuscany-bike-tour/` has real photos. Be gentle: Wordfence is active. `curl -A "Mozilla/5.0 ..." -L <url> -o <file>` with throttle. The `duvine-survey` sandbox in the channel had `/tmp/colnago.html` cached — refetch if expired.

If you scrape: don't ship any image without a credit line in the `credit` field. The schema already has the field; use it.

## If you don't load the seed

The renderer handles missing data gracefully. You can create a Tour manually instead — but you lose the demo polish. The seed is there so demo-day content reads as DuVine's voice, not as filler.

## Resetting

If you need to wipe and reload:

```bash
pnpm sanity dataset delete production
pnpm sanity dataset create production
pnpm sanity dataset import path/to/colnago-tuscany.ndjson production
```

(Note: deleting the dataset also nukes any images you've uploaded. Reupload after re-import.)
