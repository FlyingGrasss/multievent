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

type SubmittedEventMedia = { url: string; type: "image" | "video" };

function eventMedia(value: FormDataEntryValue | null): SubmittedEventMedia[] {
  const parsed = JSON.parse(String(value || "[]")) as unknown;
  if (!Array.isArray(parsed) || parsed.length === 0) throw new Error("At least one event photo or video is required.");
  return parsed.map((item) => {
    if (!item || typeof item !== "object") throw new Error("Invalid event media.");
    const candidate = item as { url?: unknown; type?: unknown };
    if (candidate.type !== "image" && candidate.type !== "video") throw new Error("Invalid event media type.");
    const url = new URL(String(candidate.url || ""));
    if (url.protocol !== "https:" || !url.hostname.endsWith(".public.blob.vercel-storage.com")) throw new Error("Event media must use Vercel Blob.");
    return { url: url.toString(), type: candidate.type };
  });
}

function slugify(value: string) {
  return value
    .toLocaleLowerCase("tr-TR")
    .replaceAll("ı", "i")
    .replaceAll("ş", "s")
    .replaceAll("ğ", "g")
    .replaceAll("ü", "u")
    .replaceAll("ö", "o")
    .replaceAll("ç", "c")
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "") || "etkinlik";
}

async function uniqueEventSlug(title: string) {
  const base = slugify(title);
  let slug = base;
  let suffix = 2;
  while (await prisma.event.findUnique({ where: { slug }, select: { id: true } })) slug = `${base}-${suffix++}`;
  return slug;
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
    active: formData.get("active") === "true",
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
    active: formData.get("active") === "true",
  };
  if (id) await prisma.service.update({ where: { id }, data });
  else {
    const last = await prisma.service.findFirst({ orderBy: { sortOrder: "desc" }, select: { sortOrder: true } });
    await prisma.service.create({ data: { ...data, sortOrder: (last?.sortOrder ?? -1) + 1 } });
  }
  revalidatePath("/services");
  revalidatePath("/tr");
  revalidatePath("/en");
  revalidatePath("/tr/services");
  revalidatePath("/en/services");
  revalidatePath("/admin");
}

export async function deleteService(id: string) {
  await requireAdmin();
  await prisma.service.delete({ where: { id } });
  revalidatePath("/services");
  revalidatePath("/tr");
  revalidatePath("/en");
  revalidatePath("/tr/services");
  revalidatePath("/en/services");
  revalidatePath("/admin");
}

export async function reorderServices(ids: string[]) {
  await requireAdmin();
  if (!Array.isArray(ids) || ids.length === 0 || ids.some((id) => typeof id !== "string")) throw new Error("Invalid service order.");
  await prisma.$transaction(ids.map((id, index) => prisma.service.update({ where: { id }, data: { sortOrder: index } })));
  revalidatePath("/services");
  revalidatePath("/tr");
  revalidatePath("/en");
  revalidatePath("/tr/services");
  revalidatePath("/en/services");
  revalidatePath("/admin");
}

export async function saveEvent(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") || "").trim();
  const titleTr = required(formData.get("titleTr"), "Turkish title");
  const media = eventMedia(formData.get("media"));
  const dateValue = String(formData.get("eventDate") || "").trim();
  const data = {
    titleTr,
    titleEn: required(formData.get("titleEn"), "English title"),
    descriptionTr: required(formData.get("descriptionTr"), "Turkish description"),
    descriptionEn: required(formData.get("descriptionEn"), "English description"),
    venueTr: String(formData.get("venueTr") || "").trim() || null,
    venueEn: String(formData.get("venueEn") || "").trim() || null,
    eventDate: dateValue ? new Date(`${dateValue}T12:00:00.000Z`) : null,
    active: formData.get("active") === "true",
  };
  if (data.eventDate && Number.isNaN(data.eventDate.getTime())) throw new Error("Invalid event date.");

  let removedUrls: string[] = [];
  if (id) {
    const previous = await prisma.event.findUnique({ where: { id }, include: { media: true } });
    if (!previous) throw new Error("Event not found.");
    removedUrls = previous.media.filter((item) => !media.some((next) => next.url === item.url)).map((item) => item.url);
    await prisma.event.update({
      where: { id },
      data: {
        ...data,
        media: { deleteMany: {}, create: media.map((item, index) => ({ ...item, sortOrder: index })) },
      },
    });
  } else {
    const last = await prisma.event.findFirst({ orderBy: { sortOrder: "desc" }, select: { sortOrder: true } });
    await prisma.event.create({
      data: {
        ...data,
        slug: await uniqueEventSlug(titleTr),
        sortOrder: (last?.sortOrder ?? -1) + 1,
        media: { create: media.map((item, index) => ({ ...item, sortOrder: index })) },
      },
    });
  }
  if (removedUrls.length > 0 && process.env.BLOB_READ_WRITE_TOKEN) await del(removedUrls).catch((error) => console.warn("Unable to remove event media", error));
  revalidatePath("/events");
  revalidatePath("/tr/events");
  revalidatePath("/en/events");
  revalidatePath("/sitemap.xml");
  revalidatePath("/admin");
}

export async function deleteEvent(id: string) {
  await requireAdmin();
  const event = await prisma.event.findUnique({ where: { id }, include: { media: true } });
  if (!event) return;
  await prisma.event.delete({ where: { id } });
  if (event.media.length > 0 && process.env.BLOB_READ_WRITE_TOKEN) await del(event.media.map((item) => item.url)).catch((error) => console.warn("Unable to remove event media", error));
  revalidatePath("/events");
  revalidatePath("/tr/events");
  revalidatePath("/en/events");
  revalidatePath("/sitemap.xml");
  revalidatePath("/admin");
}

export async function reorderEvents(ids: string[]) {
  await requireAdmin();
  if (!Array.isArray(ids) || ids.length === 0 || ids.some((id) => typeof id !== "string")) throw new Error("Invalid event order.");
  await prisma.$transaction(ids.map((id, index) => prisma.event.update({ where: { id }, data: { sortOrder: index } })));
  revalidatePath("/events");
  revalidatePath("/tr/events");
  revalidatePath("/en/events");
  revalidatePath("/admin");
}

const TODO_PRIORITIES = ["P1", "P2", "P3", "P4"] as const;

function todoDate(value: FormDataEntryValue | null) {
  const text = String(value || "").trim();
  if (!text) return new Date();
  const date = new Date(`${text}T12:00:00.000Z`);
  if (Number.isNaN(date.getTime())) throw new Error("Invalid todo date.");
  return date;
}

export async function saveTodo(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") || "").trim();
  const priority = String(formData.get("priority") || "P3").trim();
  if (!TODO_PRIORITIES.includes(priority as typeof TODO_PRIORITIES[number])) throw new Error("Invalid todo priority.");
  const title = required(formData.get("title"), "Todo title");
  const notes = String(formData.get("notes") || "").trim() || null;
  const dueDate = todoDate(formData.get("dueDate"));

  if (id) {
    await prisma.todo.update({ where: { id }, data: { title, notes, priority, dueDate } });
  } else {
    await prisma.todo.create({ data: { title, notes, priority, dueDate } });
  }
  revalidatePath("/admin");
}

export async function toggleTodo(id: string, completed: boolean) {
  await requireAdmin();
  if (typeof id !== "string" || typeof completed !== "boolean") throw new Error("Invalid todo update.");
  await prisma.todo.update({ where: { id }, data: { completed, completedAt: completed ? new Date() : null } });
  revalidatePath("/admin");
}

export async function deleteTodo(id: string) {
  await requireAdmin();
  await prisma.todo.delete({ where: { id } });
  revalidatePath("/admin");
}
