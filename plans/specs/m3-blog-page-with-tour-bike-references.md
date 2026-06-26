# M3 - Blog page with sidebar tour reference

## Goal

Add a small blog demo that shows how editorial content can point to structured tour content without changing the main tour model.

## Scope

- Use the starter blog system already in the repo.
- Add one optional `relatedTour` field to blog posts.
- Render that tour as a card in the blog sidebar on desktop.
- Render the same card below the hero image on mobile.
- Seed one blog listing page, one author, and one blog post that points to the Colnago Tuscany tour.

## Out of scope

- No inline Portable Text tour cards.
- No tags, categories, author pages, bike references, or blog search changes.
- No new blog layout system.

## Acceptance checks

- `/blog` loads and shows the seeded post.
- `/blog/colnago-tuscany-bike-tour-guide` loads and shows the related tour card.
- The related tour card links to `/tours/colnago-tuscany-bike-tour`.
- `pnpm seed:studio:check` confirms the blog, author, blog index, and related tour reference.
