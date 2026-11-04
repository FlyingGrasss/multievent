import type { Locale } from "@/types";

export type LocalizedText = { readonly tr: string; readonly en: string };

export const youthEventContent = {
  slug: "genc-muzik-etkinligi",
  metaDescription: {
    tr: "Multi Event'in Bodrum'daki yıllık Genç Müzik Etkinliği. Genç müzisyenler, piyano, çello, keman ve sahne deneyimi. Başvurular online form ile alınır.",
    en: "Multi Event's annual Youth Music Event in Bodrum. Young musicians, piano, cello, violin, and stage experience. Applications are collected online.",
  },
  eyebrow: {
    tr: "Multi Event Organizasyon",
    en: "Multi Event Organization",
  },
  title: {
    tr: "Genç Müzik Etkinliği",
    en: "Youth Music Event",
  },
  subtitle: {
    tr: "Bodrum'da genç müzisyenlerin sahne alacağı yıllık müzik buluşması. Piyano, çello, keman ve daha fazlasıyla yeni yeteneklere sahne açıyoruz.",
    en: "The annual music gathering where young musicians take the stage in Bodrum. We open the stage to new talent with piano, cello, violin, and more.",
  },
  labels: {
    date: { tr: "Tarih", en: "Date" },
    venue: { tr: "Yer", en: "Location" },
    application: { tr: "Başvuru", en: "Application" },
    dateValue: { tr: "Yakında açıklanacak", en: "To be announced" },
    venueValue: { tr: "Bodrum, Muğla", en: "Bodrum, Türkiye" },
    applicationValue: { tr: "Ücretsiz • Online form", en: "Free • Online form" },
    statusOpen: { tr: "Başvurular açık", en: "Applications open" },
    statusClosed: { tr: "Başvurular kapalı", en: "Applications closed" },
    statusUnknown: { tr: "Başvuru durumu yakında", en: "Application status coming soon" },
    statusOpenNote: {
      tr: "Formu doldurarak başvurunuzu gönderebilirsiniz.",
      en: "Fill in the form to submit your application.",
    },
    statusClosedNote: {
      tr: "Yeni başvuru dönemi açıldığında tekrar kontrol edin.",
      en: "Check back when the next application period opens.",
    },
    statusUnknownNote: {
      tr: "Başvuru durumu şu anda görüntülenemiyor. Formu yine de açabilirsiniz.",
      en: "Application status is currently unavailable. You can still open the form.",
    },
    primaryCta: { tr: "Başvuru Yap", en: "Apply Now" },
    secondaryCta: { tr: "Etkinliği Keşfet", en: "Explore the Event" },
    applicationPage: { tr: "Başvuru sayfası", en: "Application page" },
    contact: { tr: "Bize ulaşın", en: "Contact us" },
    contactTitle: { tr: "Sorularınız için bize ulaşın", en: "Contact us with your questions" },
    contactBody: {
      tr: "Başvuru ve etkinlik hakkında detaylı bilgi için Multi Event ekibiyle iletişime geçebilirsiniz.",
      en: "Contact the Multi Event team for more information about the application and the event.",
    },
    instagram: { tr: "Instagram'da bizi takip edin", en: "Follow us on Instagram" },
  },
  heroCard: {
    brand: "Multi Event",
    title: { tr: "Sahne gençlerin", en: "The stage is for the young" },
    instruments: {
      tr: "Piyano • Çello • Keman • Viyola • Flüt • Gitar",
      en: "Piano • Cello • Violin • Viola • Flute • Guitar",
    },
    note: {
      tr: "Genç müzisyenler için yıllık sahne buluşması.",
      en: "An annual stage gathering for young musicians.",
    },
  },
  stats: [
    {
      id: "annual",
      value: { tr: "Yıllık", en: "Annual" },
      label: { tr: "Multi Event geleneği", en: "A Multi Event tradition" },
    },
    {
      id: "young",
      value: { tr: "Genç", en: "Young" },
      label: { tr: "Yetenekler ve müzik öğrencileri", en: "Talents and music students" },
    },
    {
      id: "free",
      value: { tr: "Ücretsiz", en: "Free" },
      label: { tr: "Online başvuru", en: "Online application" },
    },
    {
      id: "stage",
      value: { tr: "Sahne", en: "Stage" },
      label: { tr: "Profesyonel ses ve ışık", en: "Professional sound and light" },
    },
  ],
  about: {
    eyebrow: { tr: "Etkinlik hakkında", en: "About the event" },
    title: {
      tr: "Genç müzisyenler için yıllık bir sahne",
      en: "An annual stage for young musicians",
    },
    paragraphs: [
      {
        tr: "Multi Event'in her yıl düzenlediği Genç Müzik Etkinliği, müzik eğitimi alan ve enstrüman çalan gençleri profesyonel bir sahneyle buluşturuyor. Etkinlik; genç müzisyenlerin performanslarını sergilemesi, aileleri ve müzikseverlerle buluşması için hazırlanıyor.",
        en: "Organized by Multi Event every year, the Youth Music Event brings young music students and instrumentalists together on a professional stage. The event is designed for young musicians to share their performances with family, friends, and music lovers.",
      },
      {
        tr: "Piyano, çello, keman, viyola, flüt, gitar ve farklı enstrümanlardan genç yetenekler başvurabilir. Başvurular online form üzerinden alınır; uygun bulunan katılımcılarla etkinlik programı için iletişime geçilir.",
        en: "Young talents playing piano, cello, violin, viola, flute, guitar, and other instruments can apply. Applications are collected through the online form, and selected participants are contacted with the event schedule.",
      },
      {
        tr: "Multi Event'in sahne, ses ve ışık ekipleri etkinlik boyunca genç müzisyenlere eşlik eder. Amaç; gençlerin sahne deneyimi kazanması, özgüvenle performans sergilemesi ve müziğin birleştirici gücünü paylaşmasıdır.",
        en: "Multi Event's stage, sound, and lighting teams support the young musicians throughout the event. The goal is for young people to gain stage experience, perform with confidence, and share the unifying power of music.",
      },
    ],
  },
  info: {
    eyebrow: { tr: "Etkinlik bilgileri", en: "Event information" },
    title: { tr: "Merak edilenler", en: "What to know" },
    items: [
      {
        id: "who",
        label: { tr: "Kimler başvurabilir?", en: "Who can apply?" },
        value: {
          tr: "Genç müzisyenler ve müzik öğrencileri.",
          en: "Young musicians and music students.",
        },
      },
      {
        id: "instruments",
        label: { tr: "Enstrümanlar", en: "Instruments" },
        value: {
          tr: "Piyano, çello, keman, viyola, flüt, gitar ve diğerleri.",
          en: "Piano, cello, violin, viola, flute, guitar, and others.",
        },
      },
      {
        id: "application",
        label: { tr: "Başvuru", en: "Application" },
        value: {
          tr: "Online form ile ücretsiz başvuru.",
          en: "Free application through the online form.",
        },
      },
      {
        id: "review",
        label: { tr: "Değerlendirme", en: "Review" },
        value: {
          tr: "Başvurular etkinlik ekibi tarafından incelenir.",
          en: "Applications are reviewed by the event team.",
        },
      },
    ],
  },
  process: {
    eyebrow: { tr: "Başvuru süreci", en: "Application process" },
    title: { tr: "Dört adımda sahneye", en: "From application to stage in four steps" },
    steps: [
      {
        id: "form",
        title: { tr: "Formu doldur", en: "Fill in the form" },
        description: {
          tr: "Başvuru formunda kişisel bilgilerini, enstrümanını ve performans bağlantını paylaş.",
          en: "Share your details, instrument, and performance link in the application form.",
        },
      },
      {
        id: "submit",
        title: { tr: "Başvurunu gönder", en: "Submit your application" },
        description: {
          tr: "Formu gönderdikten sonra başvurun bize ulaşır.",
          en: "Your application reaches us once you submit the form.",
        },
      },
      {
        id: "review",
        title: { tr: "Değerlendirme", en: "Review" },
        description: {
          tr: "Başvurular etkinlik ekibi tarafından incelenir.",
          en: "Applications are reviewed by the event team.",
        },
      },
      {
        id: "stage",
        title: { tr: "Sahneye hazırlan", en: "Get ready for the stage" },
        description: {
          tr: "Uygun bulunan genç müzisyenler etkinlik programı için davet edilir.",
          en: "Selected young musicians are invited to the event program.",
        },
      },
    ],
  },
  audience: {
    eyebrow: { tr: "Etkinlikte neler var?", en: "What to expect" },
    title: {
      tr: "Genç yetenekler, unutulmaz bir sahne",
      en: "Young talent, an unforgettable stage",
    },
    items: [
      {
        id: "young",
        title: { tr: "Genç müzisyenler", en: "Young musicians" },
        description: {
          tr: "Müzik eğitimi alan ve enstrüman çalan gençler.",
          en: "Young people studying music and playing instruments.",
        },
      },
      {
        id: "instruments",
        title: { tr: "Farklı enstrümanlar", en: "Different instruments" },
        description: {
          tr: "Piyano, çello, keman, viyola, flüt, gitar ve daha fazlası.",
          en: "Piano, cello, violin, viola, flute, guitar, and more.",
        },
      },
      {
        id: "experience",
        title: { tr: "Sahne deneyimi", en: "Stage experience" },
        description: {
          tr: "Profesyonel sahne, ses ve ışık desteğiyle performans.",
          en: "A performance supported by professional stage, sound, and lighting.",
        },
      },
      {
        id: "guests",
        title: { tr: "Aileler ve misafirler", en: "Families and guests" },
        description: {
          tr: "Genç müzisyenleri destekleyen aileler ve müzikseverler.",
          en: "Families and music lovers supporting the young musicians.",
        },
      },
    ],
  },
  faq: {
    eyebrow: { tr: "Sıkça sorulan sorular", en: "FAQ" },
    title: { tr: "Aklınızda bir soru mu var?", en: "Have a question?" },
    items: [
      {
        id: "fee",
        question: { tr: "Başvuru ücretli mi?", en: "Is there an application fee?" },
        answer: {
          tr: "Hayır. Başvuru formu ücretsizdir.",
          en: "No. The application form is free.",
        },
      },
      {
        id: "who",
        question: { tr: "Kimler başvurabilir?", en: "Who can apply?" },
        answer: {
          tr: "Genç müzisyenler, müzik öğrencileri ve enstrüman çalan gençler başvurabilir.",
          en: "Young musicians, music students, and young instrumentalists can apply.",
        },
      },
      {
        id: "instruments",
        question: { tr: "Hangi enstrümanlar kabul ediliyor?", en: "Which instruments are accepted?" },
        answer: {
          tr: "Piyano, çello, keman, viyola, flüt, gitar ve diğer enstrümanlar. Formda “Diğer” seçeneğini kullanabilirsiniz.",
          en: "Piano, cello, violin, viola, flute, guitar, and other instruments. You can use the “Other” option in the form.",
        },
      },
      {
        id: "review",
        question: { tr: "Başvurum ne zaman değerlendirilir?", en: "When is my application reviewed?" },
        answer: {
          tr: "Başvurular form kapandıktan sonra etkinlik ekibi tarafından incelenir. Uygun bulunan katılımcılarla iletişime geçilir.",
          en: "Applications are reviewed by the event team after the form closes. Selected participants are contacted.",
        },
      },
      {
        id: "performance",
        question: { tr: "Performansımı nasıl paylaşabilirim?", en: "How can I share my performance?" },
        answer: {
          tr: "Formda isteğe bağlı olarak YouTube, Instagram veya benzeri bir performans bağlantısı ekleyebilirsiniz.",
          en: "You can optionally add a YouTube, Instagram, or similar performance link in the form.",
        },
      },
      {
        id: "place",
        question: { tr: "Etkinlik nerede ve ne zaman?", en: "Where and when is the event?" },
        answer: {
          tr: "Etkinlik Bodrum'da planlanıyor. Kesin tarih ve mekân, başvuru sürecinde duyurulacak.",
          en: "The event is planned in Bodrum. The exact date and venue will be announced during the application process.",
        },
      },
      {
        id: "result",
        question: { tr: "Başvurumun kabul edildiğini nasıl öğrenirim?", en: "How will I know if I am accepted?" },
        answer: {
          tr: "Başvuruda paylaştığınız e-posta veya telefon üzerinden sizinle iletişime geçeceğiz.",
          en: "We will contact you via the email or phone number you provide in your application.",
        },
      },
    ],
  },
  cta: {
    eyebrow: { tr: "Başvurular", en: "Applications" },
    title: {
      tr: "Genç müzisyenler, sahne sizi bekliyor.",
      en: "Young musicians, the stage is waiting.",
    },
    body: {
      tr: "Başvuru formunu doldurun; etkinlik ekibimiz başvurunuzu değerlendirsin.",
      en: "Fill in the application form and let our event team review your application.",
    },
  },
  contact: {
    phone: "+90 530 957 69 77",
    email: "sonertirgil@multievent.org",
    instagram: "https://www.instagram.com/multieventorg/",
  },
} as const;

export function youthEventText(locale: Locale, value: LocalizedText) {
  return value[locale] || value[locale === "tr" ? "en" : "tr"];
}

export function youthEventPath(locale: Locale) {
  return `/${locale}/${youthEventContent.slug}`;
}

export function youthEventApplicationPath(locale: Locale) {
  return `/${locale}/basvuru`;
}

export function youthEventContactPath(locale: Locale) {
  return `/${locale}/contact`;
}
