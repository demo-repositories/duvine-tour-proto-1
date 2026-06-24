# DuVine Tour Proto

Sanity Studio prototype for the DuVine Cycling + Adventure Co. demo.

## M1 status

M1 is Studio-only. The repo now has the Roboto Studio Sanity starter plus a DuVine schema focused on one job: make a guided tour page easy to model and edit.

Implemented schema types:

- `tour`
- `bike`
- `departureSchedule`
- `itineraryDay`
- `highlightBlock`
- `detailSection`

The Studio sidebar is intentionally small:

- Tours
- Bikes
- Departure schedules from Centaur

## Local setup

Install dependencies:

```sh
pnpm install
```

Run both Studio and frontend:

```sh
pnpm dev
```

Run only the Studio:

```sh
pnpm dev:studio
```

Run only the frontend:

```sh
pnpm dev:web
```

Studio runs at `http://localhost:3333`. The frontend runs at `http://localhost:3000`.

## Checks

```sh
pnpm --filter studio check-types
pnpm --filter studio build
```

## Studio deploy

Deploy the Studio with the root script:

```sh
pnpm deploy:studio
```

Use `deploy:studio`, not `pnpm --filter studio deploy`. `deploy` is also a pnpm command, so the filtered version can call pnpm's own deploy command instead of Sanity's deploy script.

## Notes

- Do not commit `.env`, `.env.local`, or token values.
- `SANITY_STUDIO_APP_ID` is `pi3k2gs31ap8kre2gjok6cvq`.
- M2 will handle the front end, tour page rendering, Visual Editing, and polished seed content.
