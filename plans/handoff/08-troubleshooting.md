# 08 — Troubleshooting

Things that have hurt me / others on this stack. Save time by checking here first.

## Scaffolding

**`pnpm create sanity@latest` hangs / no progress**
- Network. Especially on corporate VPN. Try a different network, or use `pnpm dlx create-sanity@latest` directly.

**Org `o6LGneXO1` doesn't show up in the CLI prompt**
- Your Sanity CLI account isn't a member. Ask @allanwhite to invite you (Manage → Members → Invite). Then `sanity logout && sanity login` to refresh.

**`.github` becomes `github` (no leading dot)**
- Known starter wart. `mv github .github` before pushing.

## Schema

**TypeScript error: "Property 'document' does not exist on type 'ValidationContext'"**
- You're on an older Sanity version. Update: `pnpm up sanity@latest -r`. The featured-cap validator uses `context.document`.

**"Cannot find name 'defineField'" / 'defineType'"**
- Missing import. Check the file's top imports. The handoff files include these.

**Bike picker filter not working — shows all bikes regardless of difficulty**
- `filterParams.tourDifficulty` value is `'^.difficulty'` (a string referencing parent path). Not `'^difficulty'`, not `'$difficulty'`. Easy to typo.

**Itinerary validator fires but says "context.document is undefined"**
- Old Sanity. Update as above.

**Featured cap validator: "Cannot read 'fetch' of undefined"**
- `context.getClient` requires Sanity 3.x. Update.

## Front-end

**`/tour/[slug]` returns 404 even though tour exists**
- Slug case-sensitivity, or the slug field has whitespace. Check `slug.current` in Vision (`pnpm sanity@latest vision` or Studio → Vision tool) with `*[_type == "tour"]{slug}`.

**Images don't render**
- `urlFor` requires a fully-formed image source with `asset._ref`. If you're getting raw image objects from GROQ without the asset resolved, your query is missing `asset->`.

**Visual Editing overlays don't appear**
- Three usual causes:
  1. CORS in Sanity Manage doesn't include the front-end origin with "Allow credentials" on
  2. `SANITY_API_READ_TOKEN` not set in `apps/web/.env` (or Vercel env)
  3. The starter's `sanityFetch` isn't wrapping responses for stega — check it imports from the live wrapper, not the raw client

**Type errors after TypeGen**
- TypeGen reads the deployed schema. If you haven't deployed since changing the schema, regenerate after deploying. Or use `pnpm sanity typegen extract` to read locally.

## Deploy

**`sanity deploy` says "studio app already deployed at <name>" — won't let you change**
- Studio name is global. Pick a unique one. `duvine-tour-proto`, `duvine-demo-prototype`, etc.

**Vercel build fails on missing env vars**
- Add ALL the env vars on Vercel BEFORE the first deploy, not after. Specifically `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET`, `SANITY_API_READ_TOKEN`.

**Presentation iframe shows "blocked by X-Frame-Options" or "refused to connect"**
- The Next.js front-end is blocking iframe embedding. Add `X-Frame-Options: ALLOWALL` or use `Content-Security-Policy: frame-ancestors` to allow the Studio origin. The starter usually has this configured; if not, check `next.config.js` or middleware.

## Demo-day

**Live preview lags 5+ seconds after each keystroke**
- Network or read-token throttling. Acceptable but worth noting. If catastrophic, fall back to `pnpm dev` locally and tunnel.

**A user-uploaded image looks blurry/pixelated**
- `urlFor(image).width(N)` defaults to a low width. For hero, use `.width(1600)`. The handoff renderer does this.

**Wordfence blocks scraping duvine.com**
- Use a normal User-Agent string: `-A "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36"`. Throttle requests with `sleep 2`. Don't hammer.
