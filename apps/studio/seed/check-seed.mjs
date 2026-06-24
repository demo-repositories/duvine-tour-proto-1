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

console.log("Seed check passed.");
console.log(`- Bikes: ${result.bikes.length}`);
console.log(`- Departures: ${result.schedule.departureCount}`);
console.log(
  `- Tour: ${result.tour.title} (${result.tour.itineraryCount} days, ${result.tour.bikeCount} bikes)`
);
if (missingBikeImages || missingTourImages) {
  console.log(
    `- Images still needed: ${missingTourImages} tour/itinerary, ${missingBikeImages} bike`
  );
}
