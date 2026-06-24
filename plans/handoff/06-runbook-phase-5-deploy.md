# 06 — Phase 5: Deploy + dry-run

**Goal:** Studio reachable at a hosted URL. Front-end reachable at a hosted URL. Visual Editing works end-to-end across them. Demo path dry-run takes under 25 minutes from a focused operator.

**Time:** ~1 hour.

**Exit criteria:**
- Studio deployed via `sanity deploy` (URL: `<name>.sanity.studio` or app URL)
- Front-end deployed to Vercel (or alternative — see notes)
- CORS configured in Sanity Manage with prod URL + localhost
- Presentation tool works against the deployed front-end (not just localhost)
- A 25-minute dry-run of the demo path completes cleanly

## Steps

### 1. Deploy the Studio

The Studio app ID is already known: `gv1qmwsq`. Use that value for `SANITY_STUDIO_APP_ID`. Do not create a second Studio app unless Allan asks for a new one.

Run the Studio deploy from `apps/studio`:

```bash
cd apps/studio
pnpm sanity deploy
```

When prompted for a Studio hostname, pick something readable: `duvine-tour-proto` → `https://duvine-tour-proto.sanity.studio`.

For CI or GitHub secrets, set **SANITY_STUDIO_APP_ID** to `gv1qmwsq`.

### 2. Set up Vercel for the front-end

**If you have Vercel access:**

```bash
cd ../..
pnpm dlx vercel link
```

When asked for the framework / root, pick `apps/web` as the root directory. Vercel autodetects Next.js.

Set environment variables in the Vercel dashboard (Settings → Environment Variables):

| Key | Value |
|---|---|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | (from `apps/web/.env`) |
| `NEXT_PUBLIC_SANITY_DATASET` | `production` |
| `SANITY_API_READ_TOKEN` | create at `sanity.io/manage` → API → Tokens → Viewer |
| `NEXT_PUBLIC_SANITY_STUDIO_URL` | `https://duvine-tour-proto.sanity.studio` |

Deploy:

```bash
pnpm dlx vercel --prod
```

Note the production URL. Something like `duvine-tour-proto-1.vercel.app`.

**If you don't have Vercel access:**

Use a Miriad sandbox tunnel as a fallback. Less reliable for demo day; the URL changes when the sandbox restarts and the connection can hiccup. But it works:

```bash
# in a sandbox with the repo cloned and dev running
pnpm dev
# in another shell or via miriad__sandbox_tunnel
```

Get a tunnel to port 3000. Use that URL in CORS config below.

### 3. Configure CORS in Sanity Manage

Go to `https://www.sanity.io/manage/personal/project/<project-id>/api` → CORS Origins. Add (with "Allow credentials" ON for each):

- `http://localhost:3000`
- `https://duvine-tour-proto.sanity.studio` (or your Studio URL)
- `https://duvine-tour-proto-1.vercel.app` (or your front-end URL)
- Any preview/branch URLs you anticipate

"Allow credentials" is required for live preview / Visual Editing.

### 4. Update the Studio's Presentation URL

In `apps/studio/sanity.config.ts`, the Presentation tool's `previewUrl.origin` should point to your prod front-end:

```ts
presentationTool({
  previewUrl: {
    origin: process.env.SANITY_STUDIO_PRESENTATION_URL || 'http://localhost:3000',
    preview: '/',
  },
})
```

Set `SANITY_STUDIO_PRESENTATION_URL` in `apps/studio/.env` to your prod front-end URL, then redeploy:

```bash
pnpm sanity deploy
```

### 5. Smoke test the deployed setup

1. Open the deployed Studio. Sign in.
2. Open the Colnago Tuscany tour.
3. Open the Presentation tool. The right pane should load the deployed front-end.
4. Click a field on the left (Studio editor). The corresponding region on the right should highlight.
5. Edit the tour title in Studio. The right pane updates live (within ~1 sec).
6. Visit the deployed front-end directly: `https://<your-url>/tour/colnago-tuscany-bike-tour`. Should render the same content as Presentation showed.

If any of these fail, check:

- CORS origins (include both the Studio URL and the front-end URL)
- `SANITY_API_READ_TOKEN` set on Vercel
- `SANITY_STUDIO_PRESENTATION_URL` set on Studio deploy

### 6. Dry-run the demo path with a stopwatch

Open the deployed Studio fresh (incognito if you want to test the cold experience). Walk through the demo:

1. Open the Tour list. Open Colnago Tuscany. **(1 min)**
2. Walk through the editorial fields. Show field titles in DuVine's vocabulary. **(3 min)**
3. Trigger the **itinerary length validator**: delete one itinerary day, show the warning. Re-add. **(2 min)**
4. Trigger the **bike picker filter**: open the bikes field, show the active+moderate filter. Change difficulty to "challenging" and show the picker change. **(3 min)**
5. Trigger the **conditional visibility**: toggle "Private bookings only" on; show the note field appear. Toggle off. **(2 min)**
6. Trigger the **featured cap**: try to feature a 7th tour (you'll need 6 already featured — see Phase 2 verify step). Show the block-publish message. **(3 min)**
7. Open Presentation. Side-by-side edit. Change a field; show live update. **(4 min)**
8. **Build from blank**: create a new Tour. Fill the minimum to publish. Show the front-end render. **(7 min)**

Total: ~25 minutes. If you're over 30, cut step 8 (the build-from-blank) — keep step 7 (Presentation).

### 7. Commit any final config

```bash
git add apps/studio/sanity.config.ts apps/studio/.env.example
git commit -m "Wire Presentation URL for deployed front-end"
git push
```

## What you should NOT do in Phase 5

- Don't optimize for production traffic — this is a demo. Vercel free tier is plenty.
- Don't set up custom domains — the `*.vercel.app` URL is fine.
- Don't add monitoring / Sentry / etc.
- Don't enable any draft-mode bypass that exposes drafts on the public URL — keep drafts in the Presentation tool only.

## Output state — ready for demo

- Studio: `https://duvine-tour-proto.sanity.studio`
- Front-end: `https://duvine-tour-proto-1.vercel.app`
- CORS configured, Visual Editing works
- 25-minute demo path verified
- Repo on `main`, all commits pushed
