import { spawnSync } from "node:child_process";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import dotenv from "dotenv";

const seedDir = path.dirname(fileURLToPath(import.meta.url));
const studioDir = path.resolve(seedDir, "..");
const repoRoot = path.resolve(studioDir, "../..");
const seedPath = path.join(seedDir, "colnago-tuscany.ndjson");

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
const token = process.env.SANITY_IMPORT_TOKEN;

if (!existsSync(seedPath)) {
  console.error(`Seed file not found: ${seedPath}`);
  process.exit(1);
}

if (!projectId) {
  console.error(
    "Missing SANITY_STUDIO_PROJECT_ID or SANITY_PROJECT_ID. Check .env.local."
  );
  process.exit(1);
}

const env = {
  ...process.env,
  ...(token ? { SANITY_IMPORT_TOKEN: token } : {}),
};

console.log(`Importing DuVine seed into project ${projectId}, dataset ${dataset}.`);

const result = spawnSync(
  "pnpm",
  [
    "exec",
    "sanity",
    "datasets",
    "import",
    seedPath,
    "--project-id",
    projectId,
    "--dataset",
    dataset,
    "--replace",
  ],
  {
    cwd: studioDir,
    env,
    stdio: "inherit",
  }
);

process.exit(result.status ?? 1);
