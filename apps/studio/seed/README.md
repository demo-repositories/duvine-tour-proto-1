# Studio seed

This folder has the M1 demo seed for the DuVine Studio:

- 1 tour: Colnago Tuscany Bike Tour
- 3 bikes
- 1 Kaptio-style departure schedule with 4 departures
- 1 blog listing page
- 1 author
- 1 blog post that references the Colnago Tuscany tour

Run from the repo root:

```sh
pnpm seed:studio
pnpm seed:studio:check
```

The import uses fixed document IDs and `--replace`, so it is safe to rerun when you want to reset the demo content.

Images are not included. After import, add the tour hero, six itinerary images, three bike photos, the blog hero image, and the author photo in Studio.
