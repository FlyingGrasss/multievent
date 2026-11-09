import type { LocalizedList, LocalizedText } from "@/lib/forte-festival";

export function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export function isLocalizedText(value: unknown): value is LocalizedText {
  if (!isPlainObject(value)) return false;
  const keys = Object.keys(value);
  return keys.length === 2 && typeof value.tr === "string" && typeof value.en === "string";
}

export function isLocalizedList(value: unknown): value is LocalizedList {
  if (!isPlainObject(value)) return false;
  const keys = Object.keys(value);
  if (keys.length !== 2) return false;
  return (
    Array.isArray(value.tr) &&
    value.tr.every((item) => typeof item === "string") &&
    Array.isArray(value.en) &&
    value.en.every((item) => typeof item === "string")
  );
}

export function getAtPath(obj: unknown, path: string[]): unknown {
  let current = obj;
  for (const segment of path) {
    if (Array.isArray(current)) {
      const index = Number(segment);
      if (!Number.isInteger(index) || index < 0) return undefined;
      current = current[index];
      continue;
    }
    if (isPlainObject(current)) {
      current = current[segment];
      continue;
    }
    return undefined;
  }
  return current;
}

export function setAtPathImmutable(obj: unknown, path: string[], value: unknown): unknown {
  if (path.length === 0) return value;
  const [head, ...rest] = path;

  if (Array.isArray(obj)) {
    const index = Number(head);
    if (!Number.isInteger(index) || index < 0) return [...obj];
    const next = [...obj];
    next[index] = setAtPathImmutable(next[index], rest, value);
    return next;
  }

  if (isPlainObject(obj)) {
    return { ...obj, [head]: setAtPathImmutable(obj[head], rest, value) };
  }

  return obj;
}

export function insertArrayItem<T>(items: readonly T[], index: number, item: T): T[] {
  const next = [...items];
  const at = Math.min(Math.max(index, 0), next.length);
  next.splice(at, 0, item);
  return next;
}

export function removeArrayItem<T>(items: readonly T[], index: number): T[] {
  return items.filter((_, itemIndex) => itemIndex !== index);
}

export function moveArrayItem<T>(items: readonly T[], from: number, to: number): T[] {
  if (from === to || from < 0 || to < 0 || from >= items.length || to >= items.length) return [...items];
  const next = [...items];
  const [moved] = next.splice(from, 1);
  next.splice(to, 0, moved);
  return next;
}

const LABELS: Record<string, string> = {
  meta: "Meta bilgileri",
  title: "Başlık",
  description: "Açıklama",
  hero: "Hero",
  eyebrow: "Üst etiket",
  titleLines: "Başlık satırları",
  year: "Yıl",
  subtitle: "Alt başlık",
  dateLabel: "Tarih etiketi",
  dateValue: "Tarih",
  timeLabel: "Başlangıç saati etiketi",
  timeValue: "Başlangıç saati",
  venueLabel: "Yer etiketi",
  venueValue: "Yer",
  primaryCta: "Birincil buton",
  secondaryCta: "İkincil buton",
  statusOpen: "Durum metni (açık)",
  statusClosed: "Durum metni (kapalı)",
  statusUnknown: "Durum metni (bilinmiyor)",
  statusOpenNote: "Durum notu (açık)",
  statusClosedNote: "Durum notu (kapalı)",
  statusUnknownNote: "Durum notu (bilinmiyor)",
  posterNote: "Afiş notu",
  scrollLabel: "Kaydırma etiketi",
  image: "Görsel",
  imageUrl: "Görsel URL",
  imageAlt: "Görsel alternatif metni",
  backgroundImage: "Arka plan görsel URL",
  backgroundAlt: "Arka plan görsel alternatif metni",
  posterImage: "Afiş görseli",
  posterAlt: "Afiş görsel alternatif metni",
  brand: "Marka",
  handle: "Instagram kullanıcı adı",
  marquee: "Kayan yazı",
  deadline: "Son başvuru",
  about: "Hakkında",
  lead: "Giriş metni",
  paragraphs: "Paragraflar",
  stats: "İstatistikler",
  value: "Değer",
  label: "Etiket",
  program: "Program",
  note: "Not",
  items: "Öğeler",
  date: "Tarih",
  location: "Konum",
  participants: "Katılımcılar",
  emptyText: "Boş durum metni",
  nameLabel: "Öğrenci etiketi",
  categoryLabel: "Kategori etiketi",
  songsLabel: "Eserler etiketi",
  category: "Kategori",
  songs: "Eserler",
  categories: "Kategoriler",
  worksLabel: "Eser sayısı etiketi",
  durationLabel: "Süre etiketi",
  letter: "Harf",
  age: "Yaş",
  works: "Eser sayısı",
  duration: "Süre",
  rules: "Şartname",
  groups: "Gruplar",
  awards: "Sertifikalar",
  place: "Kategori",
  jury: "Jüri",
  members: "Üyeler",
  role: "Görev",
  name: "İsim",
  teachers: "Öğretmenler",
  payment: "Katılım ücreti ve ödeme",
  feeLabel: "Ücret etiketi",
  feeValue: "Katılım ücreti",
  bankLabel: "Banka etiketi",
  bankValue: "Banka",
  accountNameLabel: "Hesap adı etiketi",
  accountNameValue: "Hesap adı",
  ibanLabel: "IBAN etiketi",
  ibanValue: "IBAN",
  receiptLabel: "Dekont etiketi",
  receiptValue: "Dekont gönderimi",
  reminder: "Ödeme hatırlatması",
  application: "Başvuru",
  body: "Metin",
  steps: "Adımlar",
  formLabel: "Form butonu etiketi",
  closedLabel: "Kapalı durum etiketi",
  contactLabel: "İletişim etiketi",
  faq: "Sıkça sorulan sorular",
  question: "Soru",
  answer: "Cevap",
  gallery: "Galeri",
  instagramLabel: "Instagram etiketi",
  contact: "İletişim",
  phone: "Telefon",
  email: "E-posta",
  instagram: "Instagram",
  images: "Görseller",
  imageUrls: "Görsel URL'leri",
  caption: "Açıklama",
  alt: "Alternatif metin",
  url: "Bağlantı",
  href: "Bağlantı",
  text: "Metin",
};

function humanizeKey(key: string) {
  const spaced = key
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/[_-]+/g, " ")
    .trim();
  if (!spaced) return "Alan";
  return spaced.charAt(0).toLocaleUpperCase("tr-TR") + spaced.slice(1);
}

export function labelForPath(path: string[]): string {
  const key = path[path.length - 1];
  if (!key) return "Festival içeriği";
  return LABELS[key] ?? humanizeKey(key);
}

export function emptyItemLike(value: unknown): unknown {
  if (isLocalizedText(value)) return { tr: "", en: "" };
  if (isLocalizedList(value)) return { tr: [], en: [] };
  if (Array.isArray(value)) return [];
  if (isPlainObject(value)) {
    const empty: Record<string, unknown> = {};
    for (const [key, child] of Object.entries(value)) {
      empty[key] = emptyItemLike(child);
    }
    return empty;
  }
  if (typeof value === "string") return "";
  return value;
}

export function itemHeading(item: unknown): string {
  if (isLocalizedText(item)) return item.tr.trim() || item.en.trim() || "Öğe";
  if (!isPlainObject(item)) {
    if (typeof item === "string" && item.trim()) return item.trim();
    return "Öğe";
  }

  for (const key of ["title", "question", "name", "role"] as const) {
    const value = item[key];
    if (isLocalizedText(value)) {
      const text = value.tr.trim() || value.en.trim();
      if (text) return text;
    }
  }

  if (typeof item.letter === "string" && item.letter.trim()) return item.letter.trim();
  if (typeof item.id === "string" && item.id.trim()) return item.id.trim();
  return "Öğe";
}
