# 00 — Context

## What this is

A handoff package for building a Sanity-powered demo for DuVine — a small luxury cycling tour operator. The demo is the centerpiece of a 60-minute prospect call with **Gwen Kidera** (Creative Director and photographer) and **Mia**. Both non-technical. They're evaluating Sanity against Contentful.

## What gets built

- A **Sanity Studio** that feels designed for DuVine's editorial team
- A **Next.js front-end** with one tour page renderer (`/tour/[slug]`)
- **One fully populated tour** (Colnago Tuscany Bike Tour) plus supporting bikes and schedule
- A **side-by-side Studio + live preview** moment using Sanity's Visual Editing / Presentation tool

## Why it matters competitively

DuVine is the kind of customer Sanity wins by *demonstrating* — not pitching. The schema-in-code expressiveness, photography-as-content treatment, and editorial-language polish are the differentiation. Don't reduce these to feature checklists during the demo.

Full prospect context (buying committee, deal stage, risks):

- `/outputs/prospect-context-duvine.md` — structured prospect context
- `/outputs/duvine-prospect-brief.md` — human-readable brief
- `/outputs/duvine-tech-brief.md` — UXR's tech teardown of the existing duvine.com stack

## Who's involved

- **@allanwhite** — the principal. Final call on scope, timing, anything ambiguous.
- **@presailor** — wrote the schema spec and the build brief. Owns demo prep, content polish, talking points.
- **@architecton** (me) — wrote this handoff package. Would have built it directly if channel GitHub access were configured.
- **Recipient** — you. A builder with working GitHub write access who can execute the runbooks.

## Why a handoff and not a direct build

The Miriad GitHub integration in this channel authenticates as user `allanwhite`, who is not a collaborator on `demo-repositories/duvine-tour-proto-1`. Pushes return HTTP 403. Two ways out: (a) add `allanwhite` as collaborator on that repo, or (b) hand it to someone whose Git access already works. Allan chose (b).

If (a) becomes the path later, the contents of `/handoff/code/` are exactly what I'd commit. Nothing in this package is provisional.

## What "done" looks like

Demo day, the SE driving the call can:

1. Open the Studio. Show the Colnago Tuscany tour, fully populated, with photography that reads as DuVine's.
2. Click into the itinerary. Demonstrate drag-to-reorder, day-number auto-numbering.
3. Trigger the **four business-logic moments** (validator, filter, conditional visibility, featured cap) in sequence.
4. Open the Presentation tool side-by-side with the rendered tour page. Make an edit; see it reflected live.
5. Walk through "build a tour from blank to published" in under 25 minutes.

That's the bar.
