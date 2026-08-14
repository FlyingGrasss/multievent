import { prisma } from "@/lib/db";
import type { ArtistType, EventMediaType, EventType, ServiceType, TodoPriority, TodoType } from "@/types";

function normalizeEvent<T extends Omit<EventType, "media"> & { media: Array<Omit<EventMediaType, "type"> & { type: string }> }>(event: T): EventType {
  return {
    ...event,
    media: event.media.map((item) => ({
      ...item,
      type: item.type === "video" ? "video" : "image",
    })),
  };
}

export const defaultArtists: ArtistType[] = [
  {
    id: "demo-1",
    nameTr: "Canlı Müzik",
    nameEn: "Live Music",
    imageUrl: "/logo.jpeg",
    link: null,
    sortOrder: 0,
    active: true,
  },
];

export const defaultServices: ServiceType[] = [
  { id: "service-1", titleTr: "Düğün Organizasyonu", titleEn: "Wedding Organizations", descriptionTr: "Hayalinizdeki düğünü baştan sona planlıyoruz.", descriptionEn: "We plan your dream wedding from start to finish.", icon: "🎤", sortOrder: 0, active: true },
  { id: "service-2", titleTr: "Canlı Müzik Performansları", titleEn: "Live Music Performances", descriptionTr: "Etkinliğinize özel sanatçı ve grup seçimi.", descriptionEn: "Artists and bands selected for your event.", icon: "🎶", sortOrder: 1, active: true },
  { id: "service-3", titleTr: "Kurumsal Etkinlik Planlama", titleEn: "Corporate Event Planning", descriptionTr: "Markanız için kusursuz kurumsal etkinlikler.", descriptionEn: "Seamless corporate events for your brand.", icon: "🎭", sortOrder: 2, active: true },
  { id: "service-4", titleTr: "Ses Sistemi Kiralama", titleEn: "Sound System Rentals", descriptionTr: "Profesyonel ses ve teknik prodüksiyon.", descriptionEn: "Professional sound and technical production.", icon: "🎧", sortOrder: 3, active: true },
  { id: "service-5", titleTr: "Işık ve Sahne Tasarımı", titleEn: "Lighting & Stage Design", descriptionTr: "Mekânınızı etkileyici bir sahneye dönüştürüyoruz.", descriptionEn: "We turn your venue into an unforgettable stage.", icon: "💡", sortOrder: 4, active: true },
  { id: "service-6", titleTr: "Etkinlik Markalama ve Pazarlama", titleEn: "Event Branding & Marketing", descriptionTr: "Etkinliğinize güçlü ve tutarlı bir marka dili.", descriptionEn: "A strong, consistent brand language for your event.", icon: "🎨", sortOrder: 5, active: true },
  { id: "service-7", titleTr: "VIP Ağırlama Hizmetleri", titleEn: "VIP Hospitality Services", descriptionTr: "Misafirleriniz için özenli ve özel bir deneyim.", descriptionEn: "A thoughtful, premium experience for your guests.", icon: "🍾", sortOrder: 6, active: true },
];

export async function getArtists(): Promise<ArtistType[]> {
  if (!process.env.DATABASE_URL) return defaultArtists;
  try {
    const artists = await prisma.artist.findMany({
      where: { active: true },
      orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
    });
    return artists.length > 0 ? artists : defaultArtists;
  } catch (error) {
    console.error("Unable to load artists", error);
    return defaultArtists;
  }
}

export async function getAllArtists(): Promise<ArtistType[]> {
  const artists = await prisma.artist.findMany({
    orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
  });
  return artists;
}

export async function getServices(): Promise<ServiceType[]> {
  if (!process.env.DATABASE_URL) return defaultServices;
  try {
    const services = await prisma.service.findMany({
      where: { active: true },
      orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
    });
    return services.length > 0 ? services : defaultServices;
  } catch (error) {
    console.error("Unable to load services", error);
    return defaultServices;
  }
}

export async function getAllServices(): Promise<ServiceType[]> {
  return prisma.service.findMany({
    orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
  });
}

export async function getEvents(): Promise<EventType[]> {
  if (!process.env.DATABASE_URL) return [];
  try {
    const events = await prisma.event.findMany({
      where: { active: true },
      include: { media: { orderBy: { sortOrder: "asc" } } },
      orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
    });
    return events.map(normalizeEvent);
  } catch (error) {
    console.error("Unable to load events", error);
    return [];
  }
}

export async function getEventBySlug(slug: string): Promise<EventType | null> {
  if (!process.env.DATABASE_URL) return null;
  try {
    const event = await prisma.event.findFirst({
      where: { slug, active: true },
      include: { media: { orderBy: { sortOrder: "asc" } } },
    });
    return event ? normalizeEvent(event) : null;
  } catch (error) {
    console.error("Unable to load event", error);
    return null;
  }
}

export async function getAllEvents(): Promise<EventType[]> {
  const events = await prisma.event.findMany({
    include: { media: { orderBy: { sortOrder: "asc" } } },
    orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
  });
  return events.map(normalizeEvent);
}

function normalizeTodo<T extends Omit<TodoType, "priority"> & { priority: string }>(todo: T): TodoType {
  return { ...todo, priority: ["P1", "P2", "P3", "P4"].includes(todo.priority) ? todo.priority as TodoPriority : "P3" };
}

export async function getAllTodos(): Promise<TodoType[]> {
  const todos = await prisma.todo.findMany({ orderBy: { createdAt: "desc" } });
  return todos.map(normalizeTodo);
}
