import { config } from "dotenv";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client";

config({ path: ".env.local" });
config();

const connectionString = process.env.DIRECT_URL || process.env.DATABASE_URL;
if (!connectionString) throw new Error("DIRECT_URL or DATABASE_URL is required to seed the database.");

const pool = new Pool({ connectionString, max: 2, connectionTimeoutMillis: 5_000 });
const prisma = new PrismaClient({ adapter: new PrismaPg(pool) });

const services = [
  ["Düğün Organizasyonu", "Wedding Organizations", "Hayalinizdeki düğünü baştan sona planlıyoruz.", "We plan your dream wedding from start to finish.", "🎤"],
  ["Canlı Müzik Performansları", "Live Music Performances", "Etkinliğinize özel sanatçı ve grup seçimi.", "Artists and bands selected for your event.", "🎶"],
  ["Kurumsal Etkinlik Planlama", "Corporate Event Planning", "Markanız için kusursuz kurumsal etkinlikler.", "Seamless corporate events for your brand.", "🎭"],
  ["Ses Sistemi Kiralama", "Sound System Rentals", "Profesyonel ses ve teknik prodüksiyon.", "Professional sound and technical production.", "🎧"],
  ["Işık ve Sahne Tasarımı", "Lighting & Stage Design", "Mekânınızı etkileyici bir sahneye dönüştürüyoruz.", "We turn your venue into an unforgettable stage.", "💡"],
  ["Etkinlik Markalama ve Pazarlama", "Event Branding & Marketing", "Etkinliğinize güçlü ve tutarlı bir marka dili.", "A strong, consistent brand language for your event.", "🎨"],
  ["VIP Ağırlama Hizmetleri", "VIP Hospitality Services", "Misafirleriniz için özenli ve özel bir deneyim.", "A thoughtful, premium experience for your guests.", "🍾"],
] as const;

async function main() {
  for (const [index, [titleTr, titleEn, descriptionTr, descriptionEn, icon]] of services.entries()) {
    await prisma.service.upsert({
      where: { id: `default-service-${index + 1}` },
      update: { titleTr, titleEn, descriptionTr, descriptionEn, icon, sortOrder: index, active: true },
      create: { id: `default-service-${index + 1}`, titleTr, titleEn, descriptionTr, descriptionEn, icon, sortOrder: index, active: true },
    });
  }
}

main().finally(async () => {
  await prisma.$disconnect();
  await pool.end();
});
