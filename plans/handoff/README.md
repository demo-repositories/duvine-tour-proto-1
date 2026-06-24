# DuVine demo build — handoff package

**For:** A builder with working GitHub write access to `demo-repositories/duvine-tour-proto-1` (or another target repo)
**From:** @architecton, #prospect-devine
**Date:** 2026-06-24
**Status:** Ready for execution. All sources, schemas, code, content, and runbooks included.

## Why this exists

The build was specced by @presailor and assigned to me (@architecton) to execute. The Miriad GitHub integration in this channel authenticates as user `allanwhite`, who is not a collaborator on `demo-repositories/duvine-tour-proto-1` — so pushes return 403. Rather than block on infra, the work is captured here as a complete handoff package: a recipient with normal Git access can execute it end to end without rediscovering decisions.

If channel GitHub access is later resolved, the same package is what I would have executed myself. Nothing here is provisional.

## Read order

1. **`/handoff/README.md`** — this file. Orient.
2. **`/handoff/00-context.md`** — what this is, who it's for, deal context in two paragraphs. Skim.
3. **`/handoff/01-decisions.md`** — what's locked, what's open with picks made. Read.
4. **`/handoff/02-runbook-phase-1-scaffold.md`** through **`06-runbook-phase-5-deploy.md`** — five phases, sequential. Each ends in something demo-able.
5. **`/handoff/07-demo-day.md`** — operator notes for whoever drives the call.

## What the recipient gets

Everything needed to go from zero to a working Sanity Studio + Next.js front-end deployed somewhere reachable, with one tour populated end to end.

### Source specs (input, do not edit)

- `/specs/duvine-demo-build-brief.md` — the spec from @presailor (read this first)
- `/specs/duvine-demo-schema.md` — the schema spec @presailor wrote (the source of truth for the TypeScript files)
- `/specs/duvine-tour-schema-spec-claude.md` — alternative reference-forward model. Use for optional ideas only; do not replace the handoff schema with it.

### Runbooks (sequential)

- `/handoff/02-runbook-phase-1-scaffold.md` — scaffold the Turborepo, push to GitHub (~30 min)
- `/handoff/03-runbook-phase-2-schema.md` — drop in schema files, register them, verify (~30 min, code is already written)
- `/handoff/04-runbook-phase-3-renderer.md` — wire the tour route in `apps/web` (~3-4 hours, skeletons provided)
- `/handoff/05-runbook-phase-4-seed.md` — load the Colnago Tuscany seed dataset (~30 min, NDJSON provided)
- `/handoff/06-runbook-phase-5-deploy.md` — Studio + Vercel deploy + dry-run (~1 hour)

### Code drops (ready to commit)

- `/handoff/code/studio/schemaTypes/` — TypeScript schema files for all six types
- `/handoff/code/web/app/tour/[slug]/` — Next.js route skeletons + GROQ queries
- `/handoff/code/web/components/` — section components for the tour page
- `/handoff/code/seed/colnago-tuscany.ndjson` — seed content (one tour, three bikes, one schedule)
- `/handoff/code/seed/seed-instructions.md` — how to load it

### Reference

- `/handoff/07-demo-day.md` — talking points + demo agenda for the SE driving the call
- `/handoff/08-troubleshooting.md` — known issues, gotchas, fixes
- `/handoff/09-handoff-checklist.md` — pre-demo verification checklist

## Locked targets

| What | Value |
|---|---|
| Starter | `github.com/robotostudio/turbo-start-sanity` (pnpm Turborepo, Next.js + Sanity, Visual Editing wired) |
| Sanity org | `o6LGneXO1` (Allan's) |
| Sanity Studio app ID | `gv1qmwsq` |
| Target repo | `demo-repositories/duvine-tour-proto-1` |
| Demo page | `https://www.duvine.com/tour/colnago-tuscany-bike-tour/` |
| Schema | Six types: `tour`, `bike`, `departureSchedule` (documents); `itineraryDay`, `highlightBlock`, `detailSection` (objects) |
| Front-end scope | One tour page renderer at `/tour/[slug]` |
| Seed | One Colnago Tuscany tour, three bikes, one departure schedule |

## Non-negotiable demo moments (the four business-logic beats)

Skip none of these. They're the differentiation from Contentful:

1. **`itinerary.length === durationDays` cross-field validator** — warns inline when out of sync
2. **`bikes` reference filter** by tour's `difficulty` + bike's `status: active`
3. **`privateOnlyDetails` conditional visibility** — only when `privateOnly` is on
4. **`featured` async cap** — blocks publish when 6 other tours already featured

All four are implemented in the schema code at `/handoff/code/studio/schemaTypes/`. Don't reinvent them; verify they work.

## What's been done vs. not done

**Done (in this package):**

- All schema files translated to TypeScript, ready to drop into the starter
- GROQ query for tour by slug, with bike + schedule dereferences
- React component skeletons for each tour-page section
- Seed dataset (one full Colnago Tuscany tour)
- Step-by-step runbooks for all five phases
- Demo-day operator notes

**Not done (recipient executes):**

- Scaffolding the starter (`create sanity@latest` + `gh repo create` + initial push)
- Running `pnpm install`, `pnpm dev`
- Hand-validating each business-logic moment in the running Studio
- Loading the seed dataset via `sanity dataset import`
- Vercel deploy + Studio deploy
- CORS config in Sanity Manage
- Dry-running the demo path with a stopwatch

The runbooks cover all of these step by step.

## If you hit a blocker

1. Check `/handoff/08-troubleshooting.md` first.
2. Read the referenced section of `/specs/duvine-demo-build-brief.md` or `/specs/duvine-demo-schema.md`.
3. If still stuck, post to #prospect-devine and tag @presailor (spec questions) or @allanwhite (decision changes).

## Time budget

If executed in sequence by a competent builder: **8-10 working hours** end to end. Roughly:

- Phase 1 — scaffold and push — 30 min
- Phase 2 — drop in schema, verify in Studio — 30 min
- Phase 3 — front-end renderer — 3-4 hours
- Phase 4 — seed content — 30 min (NDJSON ready) or 1-2 hours (if writing from scratch)
- Phase 5 — deploy + dry-run — 1 hour
- Buffer — 1-2 hours for the inevitable

— @architecton
