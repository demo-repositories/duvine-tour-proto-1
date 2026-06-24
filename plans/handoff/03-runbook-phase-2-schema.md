# 03 — Phase 2: Drop in the schema

**Goal:** Six new schema types registered, Studio reloads, all four business-logic moments work in a fresh empty document.

**Time:** ~30 minutes.

**Exit criteria:**
- Schema files copied into `apps/studio/schemaTypes/`
- Schema registered in `apps/studio/sanity.config.ts` (or wherever the starter aggregates)
- Studio reloads without TypeScript errors
- New "Tour" doc type visible in Studio sidebar
- Creating a Tour doc, all four demo moments behave correctly (verify in step 6)

## Source files (already written)

The TypeScript files in `/handoff/code/studio/schemaTypes/` are ready to drop in. Six files total:

| File | Type kind |
|---|---|
| `documents/tour.ts` | document |
| `documents/bike.ts` | document |
| `documents/departureSchedule.ts` | document |
| `objects/itineraryDay.ts` | object (inline) |
| `objects/highlightBlock.ts` | object (inline) |
| `objects/detailSection.ts` | object (inline) |
| `duvine.ts` | aggregator (exports `duvineSchemaTypes`) |

## Steps

### 1. Download the files

From the channel board, download `/handoff/code/studio/schemaTypes/` directory contents. Preserve the folder structure: `documents/` and `objects/` subfolders.

### 2. Drop them in

```bash
cd ~/work/duvine-tour-proto-1
mkdir -p apps/studio/schemaTypes/documents apps/studio/schemaTypes/objects
# copy the six files into those paths plus duvine.ts at apps/studio/schemaTypes/duvine.ts
```

Final layout under `apps/studio/schemaTypes/`:

```
schemaTypes/
├── documents/
│   ├── tour.ts
│   ├── bike.ts
│   └── departureSchedule.ts
├── objects/
│   ├── itineraryDay.ts
│   ├── highlightBlock.ts
│   └── detailSection.ts
├── duvine.ts            ← aggregator
└── ... (existing starter files)
```

### 3. Register the types

Open `apps/studio/sanity.config.ts` (or the starter's equivalent). Find the existing `schema: { types: [...] }` declaration. Add the DuVine types:

```ts
import {duvineSchemaTypes} from './schemaTypes/duvine'

// in defineConfig:
schema: {
  types: [
    ...existingTypes,
    ...duvineSchemaTypes,
  ],
},
```

**Note:** the starter aggregates differently across versions. If it has an `apps/studio/schemaTypes/index.ts` that exports `schemaTypes`, append `duvineSchemaTypes` there instead:

```ts
// in apps/studio/schemaTypes/index.ts
import {duvineSchemaTypes} from './duvine'

export const schemaTypes = [
  ...existingTypes,
  ...duvineSchemaTypes,
]
```

### 4. Restart and check for compile errors

```bash
pnpm dev
```

If TypeScript errors appear, fix them before continuing. Common issues:
- Missing import of `defineField` / `defineType` — already in the files, but check
- Conflict with existing schema type names — none expected, but rename if so
- Starter using an older Sanity v2 API — these files assume v3+; the starter is v3, but if anything errors with "defineField is not a function," update Sanity packages

### 5. Verify in Studio

Navigate to `http://localhost:3333`. In the sidebar / structure tool, you should see:

- **Tour** (new)
- **Bike** (new)
- **Departure schedule (from Centaur)** (new)
- ... (starter's existing types)

Click **Tour** → **Create** → empty Tour document opens.

### 6. Verify the four demo moments

This is the keystone check. Don't ship to Phase 3 without all four passing.

**Moment 1 — itinerary length validator:**

1. Set "Tour length (days)" to `6`.
2. Add 3 itinerary days.
3. Try to publish. You should see a warning: "You've added 3 days but the tour length above is set to 6. Add or remove days so they match."
4. Add 3 more days (6 total). Warning disappears.

**Moment 2 — bike picker filter:**

1. Create a `Bike` doc: name "Test Bike A", status `active`, suitableForDifficulty `[leisurely, moderate]`.
2. Create another: "Test Bike B", status `active`, suitableForDifficulty `[challenging, extreme]`.
3. Create a third: "Test Bike C", status `retired`, suitableForDifficulty `[moderate]`.
4. Back in your Tour, difficulty `moderate`, open the Bikes picker. You should see ONLY "Test Bike A" (active + moderate). B is wrong difficulty; C is retired.
5. Change tour difficulty to `challenging`. Open Bikes picker. Should now see only B.

**Moment 3 — conditional visibility:**

1. On the Tour, scroll to "Visibility and Status" group.
2. "Note about private bookings" field is hidden.
3. Toggle "Private bookings only" ON. The note field appears.
4. Toggle OFF. Note field disappears.

**Moment 4 — featured cap:**

This is async and queries the dataset. Hardest to test in isolation. To verify:

1. Create 6 Tour documents, all minimal but with `featured: true`. Publish each. (You'll need to bypass the itinerary validator by setting durationDays=2 and adding 2 days minimum each — quick and dirty.)
2. Create a 7th Tour. Try to feature it. Publish should fail with: "The homepage featured grid already has 6 tours: ..., ..., .... Unfeature one before featuring this tour."

If you've only got time to verify one of these, do Moment 2 — the bike filter is the most visible/visceral demo beat.

### 7. Commit

```bash
git add apps/studio/schemaTypes apps/studio/sanity.config.ts
git commit -m "Add DuVine demo schema (tour, bike, departureSchedule, itineraryDay, highlightBlock, detailSection)"
git push
```

## What you should NOT do in Phase 2

- Don't modify the starter's existing `page` document type — it stays as the freeform-composition example for the demo narrative
- Don't add fields beyond what's in the spec — Tour is sized right; resist scope creep
- Don't change validation messages — they're editorial-tone for the demo audience

## Output state for Phase 3

- Six new types live in Studio
- Four demo moments verified
- Branch `main` is one commit ahead of Phase 1 baseline
