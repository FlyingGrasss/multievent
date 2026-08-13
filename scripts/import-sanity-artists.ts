import { config } from "dotenv";
import { readFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { put } from "@vercel/blob";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client";

config({ path: ".env.local" });
config();

type ExportedArtist = {
  _id: string;
  id: number;
  name: string;
  link?: string;
  imageUrl: string;
};

const scriptArgs = process.argv.slice(2);
const sourcePath = path.resolve(scriptArgs.find((argument) => !argument.startsWith("--")) || "sanity-export/artists.json");
const dryRun = scriptArgs.includes("--dry-run");
const assetDirectory = path.resolve(path.dirname(sourcePath), "assets");

function repairMojibake(value: string) {
  if (!/[ÃÄÅÂâ�]/.test(value)) return value;
  try {
    return Buffer.from(value, "latin1").toString("utf8");
  } catch {
    return value;
  }
}

function extensionFor(url: string) {
  const extension = path.extname(new URL(url).pathname).toLowerCase();
  return extension === ".png" ? ".png" : ".jpg";
}

function contentTypeFor(extension: string) {
  return extension === ".png" ? "image/png" : "image/jpeg";
}

async function main() {
  const parsed = JSON.parse(await readFile(sourcePath, "utf8")) as { result?: ExportedArtist[] };
  const artists = parsed.result || [];
  if (artists.length === 0) throw new Error(`No artists found in ${sourcePath}`);
  console.log(`Found ${artists.length} Sanity artists.`);

  if (dryRun) {
    console.log("Dry run only; no Blob uploads or database writes performed.");
    return;
  }
  if (!process.env.BLOB_READ_WRITE_TOKEN) throw new Error("BLOB_READ_WRITE_TOKEN is required for the image migration.");
  if (!process.env.DATABASE_URL) throw new Error("DATABASE_URL is required for the image migration.");

  const pool = new Pool({ connectionString: process.env.DATABASE_URL, max: 3, connectionTimeoutMillis: 5_000 });
  const prisma = new PrismaClient({ adapter: new PrismaPg(pool) });

  try {
    for (const [index, artist] of artists.entries()) {
      const extension = extensionFor(artist.imageUrl);
      const localAsset = path.join(assetDirectory, `${artist._id}${extension}`);
      const body = existsSync(localAsset)
        ? await readFile(localAsset)
        : await (await fetch(artist.imageUrl)).arrayBuffer();
      const blob = await put(`artists/${artist._id}${extension}`, new Blob([body]), {
        access: "public",
        addRandomSuffix: true,
        contentType: contentTypeFor(extension),
        cacheControlMaxAge: 31536000,
      });
      const name = repairMojibake(artist.name).trim();
      await prisma.artist.upsert({
        where: { id: artist._id },
        update: { nameTr: name, nameEn: name, imageUrl: blob.url, link: artist.link || null, sortOrder: index, active: true },
        create: { id: artist._id, nameTr: name, nameEn: name, imageUrl: blob.url, link: artist.link || null, sortOrder: index, active: true },
      });
      console.log(`${index + 1}/${artists.length} ${name}`);
    }
  } finally {
    await prisma.$disconnect();
    await pool.end();
  }
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
