# 09 — Handoff checklist

Pre-demo verification. Walk this top to bottom 24 hours before the demo.

## Code

- [ ] Repo `demo-repositories/duvine-tour-proto-1` exists, default branch `main`
- [ ] Latest `main` includes: scaffolded starter + 6 schema files + 10 web component files + seed NDJSON
- [ ] `pnpm install` clean from a fresh clone
- [ ] `pnpm typecheck` (or `pnpm build`) passes with no errors
- [ ] No leaked secrets in committed files (`grep -ri "sk-" "sk_" "token" --include="*.env" --include="*.ts"` returns nothing surprising)

## Studio

- [ ] Studio loads at deployed URL
- [ ] Tour, Bike, Departure schedule visible in sidebar
- [ ] **Demo Moment 1** — itinerary length validator fires correctly
- [ ] **Demo Moment 2** — bike picker filter responds to difficulty changes
- [ ] **Demo Moment 3** — privateOnlyDetails appears/hides correctly
- [ ] **Demo Moment 4** — featured cap blocks publish (6 other featured tours pre-staged)
- [ ] Six other featured tours pre-staged for Moment 4 (otherwise the moment doesn't work)
- [ ] Colnago Tuscany tour fully populated, all images uploaded, alt text on all images

## Front-end

- [ ] `/tour/colnago-tuscany-bike-tour` renders at deployed URL
- [ ] All 8 sections render in order
- [ ] Hero image loads with no layout shift
- [ ] Itinerary day 1 has photo, route summary, distance, meals, accommodation
- [ ] All 3 bikes render
- [ ] All 4 departures render
- [ ] Private notice does NOT appear on this tour (privateOnly is false)

## Visual Editing

- [ ] Presentation tool opens in Studio
- [ ] Side-by-side view loads the front-end in the right pane
- [ ] Click-to-field works (clicking a region on the right highlights the field on the left)
- [ ] Live edits propagate within ~1 second

## CORS

- [ ] Sanity Manage → API → CORS Origins includes:
  - `http://localhost:3000` (Allow credentials ON)
  - Deployed Studio URL (Allow credentials ON)
  - Deployed front-end URL (Allow credentials ON)

## Demo-day mechanics

- [ ] Browser tabs pre-opened: Studio + deployed front-end (in case Visual Editing flakes)
- [ ] Screen recording of demo moments 1-4 as backup (insurance against live failure)
- [ ] Stable internet on the presenter's machine
- [ ] Coffee
