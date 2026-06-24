# Build brief — DuVine demo Studio + Next.js site

**For:** @architecton
**From:** @presailor (handoff per @allanwhite, 2026-06-23)
**Purpose:** Build a Sanity-powered Studio + Next.js front-end for the DuVine demo. The end product is a working Studio that Nancy (or whoever runs the call) drives during the demo for Gwen and Mia, plus a minimal front-end that renders one tour page (the Colnago Tuscany page) for the "Studio side-by-side live page" moment.

This brief covers: target outcome, scope, what's already decided, what's not, what I (presailor) hit when I tried to do the GitHub side of this work, and a recommended sequencing.

## Target outcome

A working demo with these properties on demo day:

1. A Sanity Studio that **feels designed for a creative team at a small luxury tour operator.** Field titles, descriptions, and validation messages match how DuVine talks about their product on the live site.
2. A Studio that demonstrates **schema-in-code expressiveness** through 3-4 specific business-logic moments that a UI-configured schema editor (read: Contentful) cannot match.
3. A working **end-to-end "build a tour page from blank to published"** flow: blank document → fill in fields → reference bikes → publish → see it on a rendered front-end page.
4. The **Visual Editing / Presentation tool** side-by-side moment — Studio on the left, live tour page preview on the right, edits reflecting in real time.
5. **The Colnago Tuscany tour page** fully seeded as a realistic example, with one tour, three bikes, and one departure schedule populated.

Demo audience: Gwen Kidera (DuVine Creative Director + Photographer) and Mia. Non-technical. The demo is the centerpiece of a 60-minute call. The Studio is what they're evaluating Sanity on.

Full prospect context — buying committee, deal stage, competitive dynamics, what's been shown, what hasn't — at `/outputs/prospect-context-duvine.md` and `/outputs/duvine-prospect-brief.md`. Worth reading before the build, especially the "Risks and considerations" and "Sanity angle" sections. Tech-side context (sitemap, stack, REST API gap) is at `/outputs/duvine-tech-brief.md`.

## What's locked

The following decisions are made. Don't reopen them without checking with @allanwhite.

| Decision | Resolution |
|---|---|
| Starter template | `https://github.com/robotostudio/turbo-start-sanity` (Roboto Studio's Turborepo Next.js + Sanity starter). pnpm monorepo. Visual Editing + Presentation tool already wired. |
| Sanity org | `o6LGneXO1` (Allan's org — `https://www.sanity.io/organizations/o6LGneXO1`) |
| GitHub repo | `demo-repositories/duvine-tour-proto-1` |
| Page to demo | The Colnago Tuscany Bike Tour: `https://www.duvine.com/tour/colnago-tuscany-bike-tour/` |
| Schema spec | `/specs/duvine-demo-schema.md` on this channel — full field-by-field definition |
| Schema philosophy | Editorial-first descriptions written for Gwen and Mia (storytelling tone, not technical). Five document/object types. |
| Bikes | Separate `bike` documents, referenced from tour |
| Itinerary days | Inline array of objects on the tour document |
| Highlights / Eat / Drink | Polymorphic `highlightBlock` with category enum |
| Inclusions + Details | Flexible `detailSection[]` array |
| Dates and availability | External-system stub (`departureSchedule` doc), read-only in Studio, labeled as sourced from Centaur |
| Region modeling | Skip for demo, mentioned in a sentence only |
| Localization | Skip for demo, mentioned as separate future demo |
| Business logic to showcase | Cross-field validator (itinerary length must equal `durationDays`), reference filter (bike picker filtered by tour difficulty + active status), conditional visibility (`privateOnlyDetails` only when `privateOnly` is on), async validator (homepage featured cap of 6) |

## What's open / your call

These I'd recommend you pick rather than pause to ask. If any of them feel like real decisions back to @allanwhite, escalate; otherwise pick the path and proceed.

| Open question | My recommendation |
|---|---|
| `departureSchedule.priceUSD` — single currency or multi (USD/EUR/GBP)? | Single (USD) for the demo. Multi noted as "production extension." |
| `itineraryDay.accommodation` — free text, or reference to a future `property` doc? | Free text for demo, with a description note that production would reference a `property` document. |
| Whether to include a `pageBuilder` array on the `tour` document for free-form sections below the structured fields | Skip for demo. Tour is purely structured. The starter's `page` document keeps the page-builder pattern for non-tour content. |
| Whether to ship the `bike` document with `suitableForDifficulty[]` as a separate filter, or wire the filter inline on the tour's `bikes` field only | Separate field on `bike` — needed for the reference filter to work, and it's a small addition. |
| Whether to seed the rest of the starter's shipped docs (homepage, navbar, footer, settings) with DuVine-flavored content or leave them stock | DuVine-flavored stub content. The shell should look like a DuVine site even if marketing pages aren't fully built out. Maybe 30 minutes of light content authoring at most. |

## What I tried to do and why it stalled

@allanwhite asked me to brief you because the GitHub side of this work isn't working from #prospect-devine. Specifics so you don't repeat my work:

1. **GitHub credentials are not configured for this channel.** I confirmed: `GH_TOKEN` and `GITHUB_TOKEN` are both empty in the sandbox environment. `gh auth status` reports "not logged into any GitHub hosts." `gh repo view demo-repositories/duvine-tour-proto-1` fails with auth error.
2. **`gh` CLI is installed in sandbox `duvine-survey`.** I did the apt install (~10 sec) before discovering the missing credentials. That work is preserved — you can reuse the same sandbox or spin a fresh one (your call; see notes below).
3. **What needs to happen before push:** GitHub credentials configured for the channel via the Environment pane in Miriad — either the Miriad GitHub OAuth App (scoped, recommended) or a PAT (full access). Once set, `GH_TOKEN` injects automatically. **Sandbox must be recreated after credentials are set** — restart alone may not be enough per the miriad-core docs.
4. **Repo existence is unconfirmed.** `demo-repositories/duvine-tour-proto-1` may or may not exist already. If empty/uninitialized, first push is `git push -u origin main` to that remote. If it doesn't exist, `gh repo create demo-repositories/duvine-tour-proto-1 --private --source=. --remote=origin --push` handles it as part of the initial push.

If your `#architecton` setup has independent GitHub access, you may be able to bypass the channel-credential issue entirely. If you also have to wait on Allan to configure creds — same blocker.

## Suggested sequencing

I'd attack this in five phases. Each ends in something demonstrable.

**Phase 1 — Scaffold and push (≤30 min).** Once GH creds are live:
```
npm create sanity@latest -- --template robotostudio/turbo-start-sanity
```
in a sandbox, give it a project name (suggest `duvine-tour-proto`), pick the org `o6LGneXO1`, dataset `production`. The CLI scaffolds the Turborepo, initializes git, runs `pnpm install`. Then `gh repo create demo-repositories/duvine-tour-proto-1 --private --source=. --remote=origin --push` to publish.

Known wart from the starter README: the `.github/` workflow directory may come through as `github/` without the dot. Rename if needed before pushing.

**Phase 2 — Translate the schema spec into TypeScript (~2-3 hours).** The schema at `/specs/duvine-demo-schema.md` is YAML-flavored prose. Convert each document/object to a TypeScript `defineType` / `defineField` file following the starter's `apps/studio/schemaTypes/documents/` and `apps/studio/schemaTypes/blocks/` (or define a new subdir `apps/studio/schemaTypes/tour/`) patterns. Register in `apps/studio/schemaTypes/documents/index.ts`. Five new types: `tour` (document), `bike` (document), `departureSchedule` (document), `itineraryDay` (object), `highlightBlock` (object), `detailSection` (object).

Pay specific attention to the four business-logic moments from the spec — they're the demo beats. The cross-field validator on `itinerary.length === durationDays`, the reference filter on `bikes` keyed off the tour's `difficulty` field, the `hidden` function on `privateOnlyDetails`, and the async validator on `featured`. Get these working before seeding content. They're the moments where the demo lives or dies.

**Phase 3 — Build the tour page renderer in `apps/web` (~3-4 hours).** Add a Next.js App Router route at `apps/web/app/tour/[slug]/page.tsx` that fetches a tour by slug (GROQ), pulls the referenced bikes, dereferences the departure schedule, and renders the page layout — hero, intro, highlight blocks, itinerary days, detail sections, bikes, departures. Mirror the live duvine.com page's section order so Gwen recognizes her own page coming together.

The starter ships Shadcn + Tailwind. Use them for the layout. Don't try to match DuVine's bespoke design exactly — a clean, professional, reasonably DuVine-flavored layout is the bar. The story is "Sanity content rendered cleanly," not "we pixel-matched their site."

Visual Editing wiring should mostly come along from the starter. Verify it works on the tour route — that's the demo moment.

**Phase 4 — Seed content (~1-2 hours).** Populate one full Colnago Tuscany tour:
- Pull the live page content from `https://www.duvine.com/tour/colnago-tuscany-bike-tour/` (Allan is OK with scraping for content fidelity — see "Inputs" below). I scraped the page structure during the survey; sandbox `duvine-survey` has `/tmp/colnago.html` (may need to refetch). 6 itinerary days, 11 highlight blocks (Highlights/Eat/Drink), 15 detail sections, 3 bikes.
- Hand-translate as much real DuVine copy as is reasonable for the demo. Where the live page is thin or you want demo polish, synthetic content is fine — Allan's instruction was scrape + synthetic.
- Create 3 bike documents: Colnago C68, plus two plausible alternates (e.g., BMC Roadmachine, Pinarello Dogma F). Real-ish specs.
- Create 1 departureSchedule document with 3-4 plausible future departures, status mix (available / waitlist / sold-out), priced in USD only.
- Seed the starter's homepage, navbar, footer with DuVine-flavored stub content. Doesn't need to be exhaustive.

**Phase 5 — Deploy + dry-run (~1 hour).** Per the starter:
- Run `npx sanity deploy` locally once from `apps/studio` to register the Studio app and get a `SANITY_STUDIO_APP_ID` — this can't be done by CI non-interactively.
- Add required secrets to GitHub: `SANITY_DEPLOY_TOKEN`, `SANITY_STUDIO_PROJECT_ID`, `SANITY_STUDIO_DATASET`, `SANITY_STUDIO_TITLE`, `SANITY_STUDIO_PRESENTATION_URL`, `SANITY_STUDIO_APP_ID`.
- Deploy the front-end to Vercel (link the repo, set root to `apps/web`, configure env vars). If Vercel access isn't set up, sandbox tunnel via `miriad__sandbox_tunnel` is a viable fallback for demo day — but Vercel is more reliable and the URL is stable.
- Configure CORS in Sanity Manage: production URL + custom domain + `http://localhost:3000` with "Allow credentials" on (needed for live preview / Visual Editing).
- Dry-run the demo path: open Studio, create new tour, fill it in, publish, see it render. Then with the seeded Colnago tour, run the "build from blank" path. Time it. Should be under 25 min from a focused operator.

## Inputs available on the board

- `/specs/duvine-demo-schema.md` — the full schema spec, version 0.1, drafted by me
- `/outputs/prospect-context-duvine.md` — structured prospect context v0.5
- `/outputs/duvine-prospect-brief.md` — human-readable prospect brief v0.5
- `/outputs/duvine-tech-brief.md` — UXR's tech teardown
- `/inputs/` — Gong company overview, Evan Howe's deal review, Apr 3 call outline, the held-lightly business case + ROI model (see `/inputs/INDEX.md` for what's there)

## Notes on doing this well

A few things I'd want a builder to know going in.

- **The schema's editor-facing language matters.** Spec descriptions are written in the voice of someone briefing a creative editor, not a developer. Translate them through to TypeScript verbatim where possible. They're the demo.
- **Don't add fields not in the spec.** I've already overshot what's strictly needed for the demo; resist the urge to add more. Tour is at the right size now.
- **The four business-logic moments are non-negotiable.** They're the differentiator from Contentful. The demo can survive a missing field; it can't survive the bike picker not filtering by difficulty when Gwen changes the difficulty dropdown.
- **The starter's `page` document is useful, don't delete it.** It keeps the page-builder pattern alive for the marketing pages DuVine would author later. The `tour` document is the structured-content example; `page` is the freeform-composition example. Both stories coexist.
- **Don't pixel-match duvine.com.** That's a rabbit hole. A clean Tailwind layout that respects the section order is plenty.
- **If you scrape the live page**, the WP REST API does NOT expose `tour`, `bike`, `region`, `tour_collection` — you'll need to scrape from the rendered HTML. Wordfence is active on the site so be gentle with request rates. Sandbox `duvine-survey` already has `/tmp/colnago.html` cached from when I inspected it.

## Open questions for me (presailor) or Allan

Flag any of these back to me or @allanwhite if they become blockers:

1. **Vercel access** — needed for Phase 5. If absent, sandbox tunnel works but is fragile for demo day.
2. **Demo data realism** — is the Colnago Tuscany copy on the live site good enough to use verbatim (modulo legal/copy concerns)? Allan said scrape + synthetic, so I'd interpret as "fine to use, embellish as needed." But if there's any concern about lifting marketing copy verbatim into a Sanity dataset that lives in their account, ask Allan.
3. **Timing** — when is the demo call? I've been working as if there's a week or so; check with Allan if the actual horizon is tighter.

## What I'll do once you're up and running

- Review the Studio in dev as you build it; flag editorial-language issues
- Author seed content for the Colnago page (Phase 4) if that helps offload from you — I have the page structure and can produce realistic copy
- Build out the demo agenda once the Studio is far enough along to know what's solid and what's not
- Coordinate with @allanwhite on demo prep

Ping me with questions or blockers. I'll keep working on the demo-day artifacts (agenda, leave-behind, talking-point notes for the SE) in parallel.

— @presailor