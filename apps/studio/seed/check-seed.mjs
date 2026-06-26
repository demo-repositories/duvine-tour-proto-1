import { createClient } from "@sanity/client";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import dotenv from "dotenv";

const seedDir = path.dirname(fileURLToPath(import.meta.url));
const studioDir = path.resolve(seedDir, "..");
const repoRoot = path.resolve(studioDir, "../..");

for (const envFile of [
  path.join(repoRoot, ".env.local"),
  path.join(studioDir, ".env"),
]) {
  if (existsSync(envFile)) {
    dotenv.config({ path: envFile, override: false, quiet: true });
  }
}

const projectId =
  process.env.SANITY_STUDIO_PROJECT_ID || process.env.SANITY_PROJECT_ID;
const dataset =
  process.env.SANITY_STUDIO_DATASET || process.env.SANITY_DATASET || "production";
const genericTokenProjectId = process.env.SANITY_PROJECT_ID;
const shouldUseGenericToken =
  genericTokenProjectId && genericTokenProjectId === projectId;
const token =
  process.env.SANITY_IMPORT_TOKEN ||
  (shouldUseGenericToken
    ? process.env.SANITY_API_READ_TOKEN ||
      process.env.SANITY_API_WRITE_TOKEN ||
      process.env.SANITY_WRITE_TOKEN
    : undefined);
const envApiVersion =
  process.env.SANITY_STUDIO_API_VERSION || process.env.SANITY_API_VERSION;
const apiVersion = /^\d{4}-\d{2}-\d{2}$/.test(envApiVersion ?? "")
  ? envApiVersion
  : "2024-10-01";

if (!projectId) {
  console.error(
    "Missing SANITY_STUDIO_PROJECT_ID or SANITY_PROJECT_ID. Check .env.local."
  );
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion,
  token,
  useCdn: false,
});

let result;

try {
  result = await client.fetch(`{
    "bikes": *[_type == "bike" && _id in [
      "bike-colnago-c68",
      "bike-bmc-roadmachine",
      "bike-pinarello-dogma-f"
    ]] | order(name asc) {
      _id,
      name,
      status,
      suitableForDifficulty,
      "hasImage": defined(heroImage.asset)
    },
    "schedule": *[_id == "schedule-colnago-tuscany"][0] {
      tourReference,
      "departureCount": count(departures[])
    },
    "tour": *[_id == "tour-colnago-tuscany"][0] {
      title,
      "slug": slug.current,
      durationDays,
      "itineraryCount": count(itinerary[]),
      "bikeCount": count(bikes[]),
      "detailCount": count(detailSections[]),
      "highlightCount": count(highlightBlocks[]),
      "hasHeroImage": defined(heroImage.asset),
      "missingItineraryImages": count(itinerary[!defined(image.asset)])
    },
    "blogIndex": *[_id == "blogIndex"][0] {
      title,
      "slug": slug.current
    },
    "author": *[_id == "author-duvine-guides"][0] {
      name,
      "hasImage": defined(image.asset)
    },
    "blog": *[_id == "blog-colnago-tuscany-guide"][0] {
      title,
      "slug": slug.current,
      "authorCount": count(authors[]),
      "relatedTourRef": relatedTour._ref,
      "bodyCount": count(richText[]),
      "hasImage": defined(image.asset)
    }
  }`);
} catch (error) {
  console.error(
    `Seed check could not query Sanity project ${projectId}, dataset ${dataset}.`
  );
  console.error(error.message);
  process.exit(1);
}

const failures = [];

if (result.bikes.length !== 3) {
  failures.push(`Expected 3 bikes, found ${result.bikes.length}.`);
}
if (!result.schedule) {
  failures.push("Missing schedule-colnago-tuscany.");
} else if (result.schedule.departureCount !== 4) {
  failures.push(
    `Expected 4 departures, found ${result.schedule.departureCount}.`
  );
}
if (!result.tour) {
  failures.push("Missing tour-colnago-tuscany.");
} else {
  if (result.tour.slug !== "colnago-tuscany-bike-tour") {
    failures.push(`Unexpected tour slug: ${result.tour.slug}.`);
  }
  if (result.tour.itineraryCount !== result.tour.durationDays) {
    failures.push(
      `Itinerary has ${result.tour.itineraryCount} days, duration is ${result.tour.durationDays}.`
    );
  }
  if (result.tour.bikeCount !== 3) {
    failures.push(`Expected 3 bike references, found ${result.tour.bikeCount}.`);
  }
  if (result.tour.detailCount < 3) {
    failures.push(`Expected at least 3 detail sections, found ${result.tour.detailCount}.`);
  }
}
if (!result.blogIndex) {
  failures.push("Missing blogIndex.");
} else if (result.blogIndex.slug !== "/blog") {
  failures.push(`Unexpected blog index slug: ${result.blogIndex.slug}.`);
}
if (!result.author) {
  failures.push("Missing author-duvine-guides.");
}
if (!result.blog) {
  failures.push("Missing blog-colnago-tuscany-guide.");
} else {
  if (result.blog.slug !== "/blog/colnago-tuscany-bike-tour-guide") {
    failures.push(`Unexpected blog slug: ${result.blog.slug}.`);
  }
  if (result.blog.authorCount !== 1) {
    failures.push(`Expected 1 blog author, found ${result.blog.authorCount}.`);
  }
  if (result.blog.relatedTourRef !== "tour-colnago-tuscany") {
    failures.push(
      `Expected blog relatedTour to reference tour-colnago-tuscany, found ${result.blog.relatedTourRef}.`
    );
  }
  if (result.blog.bodyCount < 3) {
    failures.push(`Expected at least 3 blog body blocks, found ${result.blog.bodyCount}.`);
  }
}

if (failures.length > 0) {
  console.error("Seed check failed:");
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

const missingBikeImages = result.bikes.filter((bike) => !bike.hasImage).length;
const missingTourImages =
  (result.tour?.hasHeroImage ? 0 : 1) +
  (result.tour?.missingItineraryImages ?? 0);
const missingBlogImages =
  (result.blog?.hasImage ? 0 : 1) + (result.author?.hasImage ? 0 : 1);

console.log("Seed check passed.");
console.log(`- Bikes: ${result.bikes.length}`);
console.log(`- Departures: ${result.schedule.departureCount}`);
console.log(
  `- Tour: ${result.tour.title} (${result.tour.itineraryCount} days, ${result.tour.bikeCount} bikes)`
);
console.log(`- Blog: ${result.blog.title} (${result.blog.slug})`);
if (missingBikeImages || missingTourImages) {
  console.log(
    `- Images still needed: ${missingTourImages} tour/itinerary, ${missingBikeImages} bike`
  );
}
if (missingBlogImages) {
  console.log(`- Blog images still needed: ${missingBlogImages}`);
}
