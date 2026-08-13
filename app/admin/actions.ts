"use server";

import { revalidatePath } from "next/cache";
import { del } from "@vercel/blob";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/admin";

function required(value: FormDataEntryValue | null, label: string) {
  const text = String(value || "").trim();
  if (!text) throw new Error(`${label} is required.`);
  return text;
}

function optionalUrl(value: FormDataEntryValue | null) {
  const text = String(value || "").trim();
  if (!text) return null;
  const url = new URL(text);
  if (!['http:', 'https:'].includes(url.protocol)) throw new Error("Only http and https links are allowed.");
  return url.toString();
}

function imageUrl(value: FormDataEntryValue | null) {
  const text = required(value, "Image URL");
  if (text.startsWith("/")) return text;
  const url = new URL(text);
  if (url.protocol !== "https:") throw new Error("Images must use https or a local path.");
  return url.toString();
}

async function removeBlobIfOwned(url: string | null | undefined) {
  if (!url || !process.env.BLOB_READ_WRITE_TOKEN) return;
  try {
    const parsed = new URL(url);
    if (parsed.protocol === "https:" && parsed.hostname.endsWith(".public.blob.vercel-storage.com")) {
      await del(url);
    }
  } catch (error) {
    console.warn("Unable to remove old artist image from Blob storage", error);
  }
}

export async function saveArtist(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") || "").trim();
  const data = {
    nameTr: required(formData.get("nameTr"), "Turkish name"),
    nameEn: required(formData.get("nameEn"), "English name"),
    imageUrl: imageUrl(formData.get("imageUrl")),
    link: optionalUrl(formData.get("link")),
    active: formData.get("active") !== "false",
  };
  if (id) {
    const previous = await prisma.artist.findUnique({ where: { id }, select: { imageUrl: true } });
    await prisma.artist.update({ where: { id }, data });
    if (previous?.imageUrl !== data.imageUrl) await removeBlobIfOwned(previous?.imageUrl);
  }
  else {
    const last = await prisma.artist.findFirst({ orderBy: { sortOrder: "desc" }, select: { sortOrder: true } });
    await prisma.artist.create({ data: { ...data, sortOrder: (last?.sortOrder ?? -1) + 1 } });
  }
  revalidatePath("/");
  revalidatePath("/team");
  revalidatePath("/admin");
}

export async function deleteArtist(id: string) {
  await requireAdmin();
  const artist = await prisma.artist.findUnique({ where: { id }, select: { imageUrl: true } });
  await prisma.artist.delete({ where: { id } });
  await removeBlobIfOwned(artist?.imageUrl);
  revalidatePath("/");
  revalidatePath("/team");
  revalidatePath("/admin");
}

export async function reorderArtists(ids: string[]) {
  await requireAdmin();
  if (!Array.isArray(ids) || ids.length === 0 || ids.some((id) => typeof id !== "string")) throw new Error("Invalid artist order.");
  await prisma.$transaction(ids.map((id, index) => prisma.artist.update({ where: { id }, data: { sortOrder: index } })));
  revalidatePath("/");
  revalidatePath("/team");
  revalidatePath("/admin");
}

export async function saveService(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") || "").trim();
  const data = {
    titleTr: required(formData.get("titleTr"), "Turkish title"),
    titleEn: required(formData.get("titleEn"), "English title"),
    descriptionTr: String(formData.get("descriptionTr") || "").trim() || null,
    descriptionEn: String(formData.get("descriptionEn") || "").trim() || null,
    icon: String(formData.get("icon") || "").trim() || null,
    active: formData.get("active") !== "false",
  };
  if (id) await prisma.service.update({ where: { id }, data });
  else {
    const last = await prisma.service.findFirst({ orderBy: { sortOrder: "desc" }, select: { sortOrder: true } });
    await prisma.service.create({ data: { ...data, sortOrder: (last?.sortOrder ?? -1) + 1 } });
  }
  revalidatePath("/services");
  revalidatePath("/admin");
}

export async function deleteService(id: string) {
  await requireAdmin();
  await prisma.service.delete({ where: { id } });
  revalidatePath("/services");
  revalidatePath("/admin");
}

export async function reorderServices(ids: string[]) {
  await requireAdmin();
  if (!Array.isArray(ids) || ids.length === 0 || ids.some((id) => typeof id !== "string")) throw new Error("Invalid service order.");
  await prisma.$transaction(ids.map((id, index) => prisma.service.update({ where: { id }, data: { sortOrder: index } })));
  revalidatePath("/services");
  revalidatePath("/admin");
}
