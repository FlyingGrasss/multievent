import { cache } from "react";
import type { Prisma } from "@/generated/prisma/client";
import { prisma } from "@/lib/db";
import { forteFestivalContent } from "@/lib/forte-festival";

export type ForteFestivalContent = typeof forteFestivalContent;

const FESTIVAL_PAGE_ID = "forte";
const MAX_CONTENT_BYTES = 500 * 1024;

export class FestivalContentValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "FestivalContentValidationError";
  }
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function defaultContent(): ForteFestivalContent {
  return structuredClone(forteFestivalContent) as ForteFestivalContent;
}

/**
 * Merges stored JSON over the code defaults.
 * - Objects merge recursively.
 * - Arrays replace the default array entirely, so items can be added or removed.
 * - Primitives are kept only when their type matches the default.
 * - `slug` is not editable and always falls back to the source-of-truth value.
 */
function mergeContent(defaultValue: unknown, storedValue: unknown, key?: string): unknown {
  if (key === "slug") return defaultValue;

  if (Array.isArray(defaultValue)) {
    return Array.isArray(storedValue) ? storedValue : defaultValue;
  }

  if (isPlainObject(defaultValue)) {
    if (!isPlainObject(storedValue)) return defaultValue;
    const merged: Record<string, unknown> = {};
    for (const [childKey, childDefault] of Object.entries(defaultValue)) {
      merged[childKey] = mergeContent(childDefault, storedValue[childKey], childKey);
    }
    return merged;
  }

  return typeof storedValue === typeof defaultValue ? storedValue : defaultValue;
}

function normalizeContent(content: unknown): ForteFestivalContent {
  return mergeContent(forteFestivalContent, content) as ForteFestivalContent;
}

export const getForteFestivalContent = cache(async (): Promise<ForteFestivalContent> => {
  if (!process.env.DATABASE_URL) return defaultContent();

  try {
    const row = await prisma.festivalPage.findUnique({
      where: { id: FESTIVAL_PAGE_ID },
      select: { content: true },
    });
    if (!row) return defaultContent();
    return normalizeContent(row.content);
  } catch (error) {
    console.error("Unable to load festival content", error instanceof Error ? error.name : "unknown");
    return defaultContent();
  }
});

export async function saveForteFestivalContent(content: unknown): Promise<ForteFestivalContent> {
  if (!isPlainObject(content)) {
    throw new FestivalContentValidationError("Festival içeriği geçersiz.");
  }

  let serialized: string | undefined;
  try {
    serialized = JSON.stringify(content);
  } catch {
    throw new FestivalContentValidationError("Festival içeriği okunamadı.");
  }

  if (!serialized || Buffer.byteLength(serialized, "utf8") > MAX_CONTENT_BYTES) {
    throw new FestivalContentValidationError("Festival içeriği 500 KB sınırını aşıyor.");
  }

  const normalized = normalizeContent(content);
  const json = normalized as unknown as Prisma.InputJsonValue;

  const row = await prisma.festivalPage.upsert({
    where: { id: FESTIVAL_PAGE_ID },
    update: { content: json },
    create: { id: FESTIVAL_PAGE_ID, content: json },
    select: { content: true },
  });

  return normalizeContent(row.content);
}

export async function resetForteFestivalContent(): Promise<ForteFestivalContent> {
  await prisma.festivalPage.deleteMany({ where: { id: FESTIVAL_PAGE_ID } });
  return defaultContent();
}
