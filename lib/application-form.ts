import type {
  ApplicationFieldError,
  ApplicationFieldErrorCode,
  ApplicationFormDefinition,
  ApplicationQuestionOption,
  ApplicationQuestionType,
  Locale,
} from "@/types";

export const APPLICATION_FORM_ID = "default";

export const APPLICATION_LIMITS = {
  maxQuestions: 40,
  maxOptions: 30,
  title: 200,
  description: 3000,
  label: 300,
  help: 1000,
  optionLabel: 300,
  shortText: 500,
  longText: 5000,
  email: 254,
  phone: 30,
  url: 2048,
  number: 40,
  date: 10,
  bodyBytes: 256 * 1024,
  pageSize: 50,
  maxPageSize: 100,
  rateLimitWindowMs: 10 * 60 * 1000,
  rateLimitMax: 30,
} as const;

export const APPLICATION_QUESTION_TYPES: ApplicationQuestionType[] = [
  "shortText",
  "longText",
  "email",
  "phone",
  "number",
  "date",
  "url",
  "select",
  "radio",
  "checkboxes",
  "consent",
];

type QuestionTypeMeta = {
  labelTr: string;
  labelEn: string;
  hasOptions: boolean;
  minOptions: number;
};

export const APPLICATION_QUESTION_TYPE_META: Record<ApplicationQuestionType, QuestionTypeMeta> = {
  shortText: { labelTr: "Kısa metin", labelEn: "Short text", hasOptions: false, minOptions: 0 },
  longText: { labelTr: "Uzun metin", labelEn: "Long text", hasOptions: false, minOptions: 0 },
  email: { labelTr: "E-posta", labelEn: "Email", hasOptions: false, minOptions: 0 },
  phone: { labelTr: "Telefon", labelEn: "Phone", hasOptions: false, minOptions: 0 },
  number: { labelTr: "Sayı", labelEn: "Number", hasOptions: false, minOptions: 0 },
  date: { labelTr: "Tarih", labelEn: "Date", hasOptions: false, minOptions: 0 },
  url: { labelTr: "Bağlantı", labelEn: "URL", hasOptions: false, minOptions: 0 },
  select: { labelTr: "Açılır liste", labelEn: "Dropdown", hasOptions: true, minOptions: 2 },
  radio: { labelTr: "Tek seçim", labelEn: "Single choice", hasOptions: true, minOptions: 2 },
  checkboxes: { labelTr: "Çoklu seçim", labelEn: "Multiple choice", hasOptions: true, minOptions: 1 },
  consent: { labelTr: "Onay kutusu", labelEn: "Consent checkbox", hasOptions: false, minOptions: 0 },
};

export type LocalizedMessage = { tr: string; en: string };

export const APPLICATION_MESSAGES = {
  closedTitle: { tr: "Başvurular şu anda kapalı", en: "Applications are currently closed" },
  closedBody: {
    tr: "Yeni başvuru dönemi açıldığında bu sayfayı tekrar ziyaret edebilirsiniz.",
    en: "Please check back when the next application period opens.",
  },
  notReadyTitle: { tr: "Başvuru formu henüz hazırlanmadı", en: "The application form is not ready yet" },
  notReadyBody: {
    tr: "Form düzenlendikten sonra bu sayfadan başvuru yapabilirsiniz.",
    en: "You can apply from this page once the form has been prepared.",
  },
  submit: { tr: "Başvuruyu gönder", en: "Submit application" },
  submitting: { tr: "Gönderiliyor…", en: "Submitting…" },
  successTitle: { tr: "Başvurunuz alındı", en: "Your application has been received" },
  successBody: {
    tr: "Başvurunuzu değerlendirdikten sonra sizinle iletişime geçeceğiz. Teşekkür ederiz.",
    en: "We will contact you after reviewing your application. Thank you.",
  },
  validationSummary: {
    tr: "Lütfen işaretli alanları kontrol edin.",
    en: "Please check the highlighted fields.",
  },
  rateLimited: {
    tr: "Çok fazla başvuru denemesi yapıldı. Lütfen biraz sonra tekrar deneyin.",
    en: "Too many submission attempts. Please try again shortly.",
  },
  genericError: {
    tr: "Başvuru gönderilemedi. Lütfen tekrar deneyin.",
    en: "Your application could not be submitted. Please try again.",
  },
  selectPlaceholder: { tr: "Seçiniz", en: "Select" },
  required: { tr: "Zorunlu", en: "Required" },
  newResponse: { tr: "Yeni başvuru", en: "New application" },
  approved: { tr: "Onaylandı", en: "Approved" },
  unavailableTitle: { tr: "Başvuru formuna ulaşılamıyor", en: "Application form unavailable" },
  formUnavailable: {
    tr: "Başvuru formuna şu anda ulaşılamıyor. Lütfen daha sonra tekrar deneyin.",
    en: "The application form is not available right now. Please try again later.",
  },
} satisfies Record<string, LocalizedMessage>;

const FIELD_MESSAGES: Record<ApplicationFieldErrorCode, LocalizedMessage> = {
  REQUIRED: { tr: "Bu alan zorunludur.", en: "This field is required." },
  CONSENT_REQUIRED: { tr: "Devam etmek için bu onayı vermelisiniz.", en: "You must give this consent to continue." },
  CHECKBOX_REQUIRED: { tr: "En az bir seçenek işaretleyin.", en: "Select at least one option." },
  TOO_LONG: { tr: "Girdiğiniz metin çok uzun.", en: "The text you entered is too long." },
  INVALID_EMAIL: { tr: "Geçerli bir e-posta adresi girin.", en: "Enter a valid email address." },
  INVALID_PHONE: { tr: "Geçerli bir telefon numarası girin.", en: "Enter a valid phone number." },
  INVALID_NUMBER: { tr: "Geçerli bir sayı girin.", en: "Enter a valid number." },
  INVALID_DATE: { tr: "Geçerli bir tarih seçin.", en: "Choose a valid date." },
  INVALID_URL: { tr: "Geçerli bir bağlantı girin.", en: "Enter a valid URL." },
  INVALID_OPTION: { tr: "Listeden geçerli bir seçenek seçin.", en: "Choose a valid option from the list." },
  INVALID_VALUE: { tr: "Bu alan için geçerli bir değer girin.", en: "Enter a valid value for this field." },
};

export const DEFAULT_APPLICATION_FORM: ApplicationFormDefinition = {
  id: APPLICATION_FORM_ID,
  titleTr: "Bodrum Forte Müzik Festivali Başvurusu",
  titleEn: "Bodrum Forte Music Festival Application",
  descriptionTr:
    "Bodrum Forte Müzik Festivali başvuru formu. Festival her enstrümana açıktır. Katılım ücreti ve ödeme bilgileri festival sayfasında yer alır.",
  descriptionEn:
    "Application form for the Bodrum Forte Music Festival. The festival is open to all instruments. Participation fee and payment details are on the festival page.",
  isOpen: true,
  questions: [
    {
      id: "default-full-name",
      type: "shortText",
      labelTr: "Ad Soyad",
      labelEn: "Full name",
      helpTr: "",
      helpEn: "",
      required: true,
      options: [],
      sortOrder: 0,
    },
    {
      id: "default-age",
      type: "number",
      labelTr: "Yaş",
      labelEn: "Age",
      helpTr: "",
      helpEn: "",
      required: true,
      options: [],
      sortOrder: 1,
    },
    {
      id: "default-instrument",
      type: "shortText",
      labelTr: "Enstrüman",
      labelEn: "Instrument",
      helpTr: "Seslendireceğiniz enstrümanı yazın.",
      helpEn: "Write the instrument you will perform with.",
      required: true,
      options: [],
      sortOrder: 2,
    },
    {
      id: "default-teacher-studio",
      type: "shortText",
      labelTr: "Öğretmen / Stüdyo / Okul",
      labelEn: "Teacher / Studio / School",
      helpTr: "Öğrencinin bağlı olduğu öğretmen, stüdyo veya okulu yazın.",
      helpEn: "Write the teacher, studio, or school the student is affiliated with.",
      required: false,
      options: [],
      sortOrder: 3,
    },
    {
      id: "default-song-1-name",
      type: "shortText",
      labelTr: "1. Eser adı",
      labelEn: "Work 1 title",
      helpTr: "Seslendireceğiniz ilk eserin adını yazın.",
      helpEn: "Write the title of the first work you will perform.",
      required: true,
      options: [],
      sortOrder: 4,
    },
    {
      id: "default-song-1-duration",
      type: "shortText",
      labelTr: "1. Eser süresi",
      labelEn: "Work 1 duration",
      helpTr: "Örn. 3 dk",
      helpEn: "E.g. 3 min",
      required: true,
      options: [],
      sortOrder: 5,
    },
    {
      id: "default-song-2-name",
      type: "shortText",
      labelTr: "2. Eser adı (opsiyonel)",
      labelEn: "Work 2 title (optional)",
      helpTr: "İkinci eser varsa adını yazın.",
      helpEn: "Write the title if there is a second work.",
      required: false,
      options: [],
      sortOrder: 6,
    },
    {
      id: "default-song-2-duration",
      type: "shortText",
      labelTr: "2. Eser süresi",
      labelEn: "Work 2 duration",
      helpTr: "Örn. 4 dk",
      helpEn: "E.g. 4 min",
      required: false,
      options: [],
      sortOrder: 7,
    },
    {
      id: "default-email",
      type: "email",
      labelTr: "E-posta",
      labelEn: "Email",
      helpTr: "",
      helpEn: "",
      required: true,
      options: [],
      sortOrder: 8,
    },
    {
      id: "default-phone",
      type: "phone",
      labelTr: "Telefon",
      labelEn: "Phone",
      helpTr: "Size ulaşabileceğimiz bir telefon numarası yazın.",
      helpEn: "Enter a phone number where we can reach you.",
      required: true,
      options: [],
      sortOrder: 9,
    },
    {
      id: "default-demo-url",
      type: "url",
      labelTr: "Performans veya sosyal medya bağlantısı",
      labelEn: "Performance or social media link",
      helpTr: "YouTube, Instagram veya benzeri bir bağlantı ekleyebilirsiniz.",
      helpEn: "You can add a YouTube, Instagram, or similar link.",
      required: false,
      options: [],
      sortOrder: 10,
    },
    {
      id: "default-bio",
      type: "longText",
      labelTr: "Kendinizden bahsedin",
      labelEn: "Tell us about yourself",
      helpTr: "Kısa bir biyografi ve müzik deneyiminizi paylaşabilirsiniz.",
      helpEn: "Share a short biography and your music experience.",
      required: false,
      options: [],
      sortOrder: 11,
    },
    {
      id: "default-notes",
      type: "longText",
      labelTr: "Eklemek istedikleriniz",
      labelEn: "Anything else",
      helpTr: "",
      helpEn: "",
      required: false,
      options: [],
      sortOrder: 12,
    },
    {
      id: "default-consent",
      type: "consent",
      labelTr: "Başvuru bilgilerimin etkinlik değerlendirmesi için işlenmesini onaylıyorum.",
      labelEn: "I consent to my application data being processed for event evaluation.",
      helpTr: "Başvurunuz yalnızca etkinlik değerlendirmesi için kullanılır.",
      helpEn: "Your application will only be used for event evaluation.",
      required: true,
      options: [],
      sortOrder: 13,
    },
  ],
};

export function createDefaultApplicationForm(): ApplicationFormDefinition {
  return structuredClone(DEFAULT_APPLICATION_FORM);
}

export function isApplicationQuestionType(value: string): value is ApplicationQuestionType {
  return (APPLICATION_QUESTION_TYPES as string[]).includes(value);
}

export function isOptionQuestionType(type: ApplicationQuestionType) {
  return APPLICATION_QUESTION_TYPE_META[type].hasOptions;
}

export function getQuestionTypeMeta(type: ApplicationQuestionType) {
  return APPLICATION_QUESTION_TYPE_META[type];
}

export function questionTypeLabel(type: ApplicationQuestionType, locale: Locale) {
  const meta = getQuestionTypeMeta(type);
  return locale === "tr" ? meta.labelTr : meta.labelEn;
}

export function localizedText(locale: Locale, tr: string | null | undefined, en: string | null | undefined) {
  const primary = locale === "tr" ? tr : en;
  const fallback = locale === "tr" ? en : tr;
  return (primary || "").trim() || (fallback || "").trim();
}

export function localizedOption(option: ApplicationQuestionOption, locale: Locale) {
  return localizedText(locale, option.labelTr, option.labelEn);
}

export function pickMessage(message: LocalizedMessage, locale: Locale) {
  return locale === "tr" ? message.tr : message.en;
}

export function fieldError(code: ApplicationFieldErrorCode): ApplicationFieldError {
  const message = FIELD_MESSAGES[code];
  return { code, messageTr: message.tr, messageEn: message.en };
}

export function normalizeApplicationOptions(value: unknown): ApplicationQuestionOption[] {
  if (!Array.isArray(value)) return [];
  const seen = new Set<string>();
  const options: ApplicationQuestionOption[] = [];
  for (const [index, item] of value.entries()) {
    if (typeof item === "string") {
      const label = item.trim();
      if (!label || seen.has(`legacy-${index}`)) continue;
      seen.add(`legacy-${index}`);
      options.push({ id: `legacy-${index}`, labelTr: label, labelEn: label });
      continue;
    }
    if (!item || typeof item !== "object") continue;
    const candidate = item as { id?: unknown; labelTr?: unknown; labelEn?: unknown };
    const labelTr = String(candidate.labelTr || "").trim();
    const labelEn = String(candidate.labelEn || "").trim() || labelTr;
    const id = String(candidate.id || "").trim() || `option-${index}`;
    if (!labelTr || seen.has(id)) continue;
    seen.add(id);
    options.push({ id, labelTr, labelEn });
  }
  return options.slice(0, APPLICATION_LIMITS.maxOptions);
}
