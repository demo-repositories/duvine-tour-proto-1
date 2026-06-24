# 02 — Phase 1: Scaffold and push

**Goal:** A fresh Turborepo from `robotostudio/turbo-start-sanity`, initialized as a Sanity project under org `o6LGneXO1`, pushed to `demo-repositories/duvine-tour-proto-1`.

**Time:** ~30 minutes.

**Exit criteria:**
- Repo cloned locally, `pnpm install` clean
- `pnpm dev` brings up Studio (3333) and web (3000) on localhost
- First commit is in the target GitHub repo on `main`
- A Sanity project exists under org `o6LGneXO1` with dataset `production`

## Prerequisites

- Node 20+, pnpm 9+
- `gh` CLI authenticated (`gh auth status` returns OK)
- Sanity CLI: `pnpm dlx sanity@latest login` once, authenticated to an account with access to org `o6LGneXO1`
- Write access to `demo-repositories` org on GitHub

## Steps

### 1. Scaffold the starter

```bash
mkdir -p ~/work && cd ~/work
pnpm create sanity@latest -- \
  --template robotostudio/turbo-start-sanity \
  --project-id "" \
  --dataset production \
  --output-path duvine-tour-proto-1
```

When the interactive prompts run:
- **Organization:** `o6LGneXO1` (Allan's). If your CLI account isn't a member, ask Allan to invite first.
- **Project name:** `duvine-tour-proto`
- **Dataset name:** `production`
- **Initialize git:** yes
- **Install dependencies:** yes (will run `pnpm install`)

### 2. Verify the local install

```bash
cd duvine-tour-proto-1
pnpm dev
```

Both apps should start. Studio at `http://localhost:3333`, web at `http://localhost:3000`. Make sure both load without errors. Hit `Ctrl-C` once you've confirmed.

### 3. Fix the .github directory (if needed)

A known wart: `.github/` workflows can land as `github/` without the leading dot in some shells. Check:

```bash
ls -la | grep -i github
```

If you see `github/` without the dot:

```bash
mv github .github
```

### 4. Create the GitHub repo and push

If the repo `demo-repositories/duvine-tour-proto-1` does not exist:

```bash
gh repo create demo-repositories/duvine-tour-proto-1 \
  --private \
  --source=. \
  --remote=origin \
  --push \
  --description "DuVine demo — Sanity Studio + Next.js"
```

If the repo already exists empty:

```bash
git remote add origin git@github.com:demo-repositories/duvine-tour-proto-1.git
# or https://... if you prefer
git branch -M main
git push -u origin main
```

### 5. Verify on GitHub

```bash
gh repo view demo-repositories/duvine-tour-proto-1 --web
```

You should see the Turborepo tree on `main`.

## What you should NOT do in Phase 1

- Don't touch any schema files yet — Phase 2 handles all schema changes
- Don't `pnpm sanity deploy` yet — that comes in Phase 5
- Don't add Vercel / any deploy config — Phase 5

## If something goes wrong

- **`sanity` CLI says "no org with that ID":** your CLI account isn't a member of `o6LGneXO1`. Ask Allan to invite you (Manage → Members), then `sanity login --logout && sanity login`.
- **`gh repo create` returns 422 "name already exists":** the repo's already there. Use the "already exists" branch in step 4.
- **`pnpm dev` fails on missing env vars:** the starter writes `.env` files during scaffold. If they're missing, re-run `pnpm create sanity@latest` and check `apps/studio/.env` and `apps/web/.env` exist with `SANITY_PROJECT_ID` and `SANITY_DATASET`.

## Output state for Phase 2

- Working directory: `~/work/duvine-tour-proto-1`
- Branch: `main`, pushed to `demo-repositories/duvine-tour-proto-1`
- Sanity project ID written into both `apps/studio/.env` and `apps/web/.env` (note this ID — you'll need it later)
- Dataset: `production`, empty
