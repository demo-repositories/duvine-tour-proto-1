# 01 — Decisions

## What's locked

Don't reopen these without checking with @allanwhite.

| # | Decision | Resolution |
|---|---|---|
| 1 | Starter template | `github.com/robotostudio/turbo-start-sanity` (Roboto Studio's Turborepo Next.js + Sanity starter). pnpm. |
| 2 | Sanity org | `o6LGneXO1` |
| 3 | Target repo | `demo-repositories/duvine-tour-proto-1` |
| 4 | Tour to demo | Colnago Tuscany Bike Tour (`duvine.com/tour/colnago-tuscany-bike-tour/`) |
| 5 | Bikes | Separate `bike` documents, referenced from tour |
| 6 | Itinerary days | Inline array of objects on tour document, not separate document type |
| 7 | Highlights / Eat / Drink | Polymorphic `highlightBlock` with category enum |
| 8 | Inclusions + Details | Flexible `detailSection[]` array |
| 9 | Dates and availability | External-system stub (`departureSchedule`), read-only in Studio, labeled "Source: Centaur" |
| 10 | Region modeling | Skip for demo |
| 11 | Localization | Skip for demo |
| 12 | Business logic to showcase | Cross-field validator, reference filter, conditional visibility, async featured cap |
| 13 | Pricing currency | USD only for demo |
| 14 | `itineraryDay.accommodation` | Free text for demo (production would reference Property doc) |
| 15 | Page builder on tour | Skip — tour is purely structured |
| 16 | Bike difficulty filter | Separate `suitableForDifficulty[]` field on bike (needed for picker filter) |
| 17 | Starter's other docs (homepage etc.) | Seed with light DuVine-flavored content; don't delete the starter's `page` doc |

## Open questions answered (calls I made)

These were left to the builder. My picks below — escalate only if they break something.

| Question | My answer | Why |
|---|---|---|
| Skip or wire any `page` doc changes? | Leave the starter's `page` doc untouched. Don't extend it. | The story is "`tour` is structured content, `page` is freeform composition." Both coexist. |
| How much shell content to author? | Minimal — homepage hero says "DuVine — Bicycle Tours, Reimagined," nav has Tour Finder + About + Contact stubs, footer has DuVine address. 30 min max. | The Studio shell needs to look like a DuVine site so the demo doesn't break immersion. |
| Where do the schema files live in the monorepo? | `apps/studio/schemaTypes/documents/tour.ts`, `bike.ts`, `departureSchedule.ts`. Objects in `apps/studio/schemaTypes/objects/itineraryDay.ts` etc. | Matches the starter's pattern. Don't invent a `tour/` subfolder. |
| Validation message tone | Editorial first, technical second. "The number of days you've added doesn't match the tour length above." not "Array length must equal field.value". | Gwen reads these. |
| Image handling | Hotspot on every image. Alt required at field level (not just options). Caption + credit optional but visible. | DuVine treats photography as content; the schema should too. |
| GROQ projection strategy | One query, dereferences bikes and departureSchedule inline. Slug-based fetch. | Avoid client-side waterfalls; one fetch per page render. |
| Component library | Tailwind + Shadcn (whatever the starter ships). Don't introduce new UI libs. | Stay close to the starter; ship faster. |
| Alternative Claude schema | Treat `plans/specs/duvine-tour-schema-spec-claude.md` as reference only. Do not replace the handoff schema with it. | It is more production-complete, but less intuitive for a fast Studio demo. The demo needs a small model that Gwen and Mia can understand quickly. |

## Hybrid content-model guidance

The Claude schema has good production instincts, but the first build should stay smaller.

**Borrow if time allows:**

- Add a `gallery` field on `tour` if the page needs more visual depth.
- Derive the displayed starting price from `departureSchedule.departures`.
- Store distance and elevation once, then derive alternate units in the front end.
- Add a lightweight bike relationship object only if tour-specific bike notes become important.

**Do not add for the first build:**

- `destination`, `level`, `collection`, or `accommodation` documents.
- Standalone editable `departure` documents.
- Weather inheritance, breadcrumb traversal, or collection/level page logic.

The Studio should stay organized around the editor's task: build and publish one tour page. Keep the top-level desk simple: Tours, Bikes, and Departure schedules from Centaur.

## Open questions for @allanwhite (still open)

These I cannot answer; they may matter for Phase 5.

1. **Vercel access** for the recipient. Without it, sandbox tunnel works but is fragile for demo day. If you can grant the recipient Vercel access on a DuVine-relevant team, Phase 5 is cleaner. Otherwise, the recipient should deploy to their own Vercel and the URL is whatever it is.
2. **Demo timing.** I'm working as if there's at least a week. If it's tighter, cut Phase 4 polish first (use the provided seed verbatim) and Phase 3 component polish second.
3. **Repo existence.** Does `demo-repositories/duvine-tour-proto-1` already exist as an empty repo, or should the recipient create it as part of scaffolding? Runbook 1 covers both paths; pick the right one.
4. **Recipient identity.** Once known, give them write access on the repo (or change the repo target to one they own).
