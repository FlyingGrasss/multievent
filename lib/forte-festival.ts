import type { Locale } from "@/types";

export type LocalizedText = { readonly tr: string; readonly en: string };
export type LocalizedList = { readonly tr: readonly string[]; readonly en: readonly string[] };

export const forteFestivalContent = {
  slug: "bodrum-forte-muzik-festivali",
  meta: {
    title: { tr: "Bodrum Forte Müzik Festivali", en: "Bodrum Forte Music Festival" },
    description: {
      tr: "Bodrum Forte Müzik Festivali: tüm enstrümanlar ve vokal, F–J yaş kategorileri ve sahne. 10 Ocak 2027'de Bodrum'da. Başvurular online form ile alınır.",
      en: "Bodrum Forte Music Festival: all instruments and vocals, age categories F–J, and a stage. In Bodrum on 10 January 2027. Applications are collected online.",
    },
  },
  hero: {
    eyebrow: { tr: "Multi Event Organizasyon", en: "Multi Event Organization" },
    titleLines: { tr: ["BODRUM", "FORTE", "MÜZİK", "FESTİVALİ"], en: ["BODRUM", "FORTE", "MUSIC", "FESTIVAL"] },
    year: "2027",
    subtitle: {
      tr: "Tüm enstrümanlardan ve vokallerden genç müzisyenleri aynı sahnede buluşturan yıllık müzik festivali.",
      en: "The annual music festival bringing young musicians from all instruments and vocals together on one stage.",
    },
    dateLabel: { tr: "Tarih", en: "Date" },
    dateValue: { tr: "10 Ocak 2027", en: "10 January 2027" },
    venueLabel: { tr: "Yer", en: "Location" },
    venueValue: { tr: "Bodrum, Muğla", en: "Bodrum, Türkiye" },
    primaryCta: { tr: "Başvuru Yap", en: "Apply Now" },
    secondaryCta: { tr: "Programı Keşfet", en: "Explore the Program" },
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
    posterNote: {
      tr: "Taslak program • Kesin program ve mekân yakında açıklanacak",
      en: "Draft program • Final program and venue to be announced",
    },
    scrollLabel: { tr: "Keşfet", en: "Discover" },
  },
  marquee: {
    tr: ["TÜM ENSTRÜMANLAR", "VOKAL", "BODRUM 2027", "FORTE", "FESTİVAL", "SAHNE"],
    en: ["ALL INSTRUMENTS", "VOCALS", "BODRUM 2027", "FORTE", "FESTIVAL", "STAGE"],
  },
  about: {
    eyebrow: { tr: "Festival hakkında", en: "About the festival" },
    title: {
      tr: "Tüm enstrümanlar, tek sahne",
      en: "All instruments, one stage",
    },
    lead: {
      tr: "Bodrum Forte Müzik Festivali, genç müzisyenleri enstrümanları ve vokalleriyle aynı sahnede buluşturuyor.",
      en: "Bodrum Forte Music Festival brings young musicians together on one stage with their instruments and vocals.",
    },
    paragraphs: [
      {
        tr: "Festival; farklı yaş kategorilerinde performansları, jüri değerlendirmesini ve ödül törenini tek bir günde bir araya getiriyor.",
        en: "The festival brings performances across age categories, jury evaluation, and an award ceremony together in one day.",
      },
      {
        tr: "Başvurular online form ile alınır. Katılımcılar başvuruda kullanacakları enstrümanı veya vokal türünü belirtir; yaşlarına uygun kategori ve performans süresi esas alınır.",
        en: "Applications are collected through the online form. Participants specify the instrument or vocal type they will use; their age category and performance duration apply.",
      },
      {
        tr: "Kesin jüri, program ve mekân bilgileri öğretmenlerden gelen bilgiler doğrultusunda yakında paylaşılacaktır.",
        en: "Final jury, program, and venue details will be shared soon based on information from the teachers.",
      },
    ],
    stats: [
      { id: "date", value: "10 Ocak", label: { tr: "2027, Bodrum", en: "2027, Bodrum" } },
      { id: "categories", value: "5", label: { tr: "Yaş kategorisi", en: "Age categories" } },
      { id: "works", value: "1–2", label: { tr: "Eser", en: "Works" } },
      { id: "duration", value: "3–5 dk", label: { tr: "Performans süresi", en: "Performance time" } },
    ],
  },
  program: {
    eyebrow: { tr: "Program", en: "Program" },
    title: { tr: "Festival günü", en: "Festival day" },
    note: {
      tr: "10 Ocak 2027 • Saatler ve sıralama yakında açıklanacak.",
      en: "10 January 2027 • Times and running order will be announced.",
    },
    items: [
      {
        id: "opening",
        date: { tr: "10 Ocak 2027", en: "10 January 2027" },
        title: { tr: "Kayıt ve Açılış", en: "Registration and Opening" },
        description: {
          tr: "Katılımcı kayıtları ve festivalin açılışı.",
          en: "Participant registration and the festival opening.",
        },
        location: { tr: "Bodrum", en: "Bodrum" },
      },
      {
        id: "performances",
        date: { tr: "10 Ocak 2027", en: "10 January 2027" },
        title: { tr: "Kategori Performansları", en: "Category Performances" },
        description: {
          tr: "F, G, H, I ve J kategorilerinde performanslar.",
          en: "Performances in categories F, G, H, I, and J.",
        },
        location: { tr: "Bodrum", en: "Bodrum" },
      },
      {
        id: "awards",
        date: { tr: "10 Ocak 2027", en: "10 January 2027" },
        title: { tr: "Ödül Töreni", en: "Award Ceremony" },
        description: {
          tr: "Kategori ödüllerinin takdimi.",
          en: "Presentation of the category awards.",
        },
        location: { tr: "Bodrum", en: "Bodrum" },
      },
    ],
  },
  categories: {
    eyebrow: { tr: "Kategoriler", en: "Categories" },
    title: { tr: "Yaş kategorisi ve süre", en: "Age category and duration" },
    note: {
      tr: "Süreler toplam performans süresidir. Kategoriniz için belirtilen süre sınırı aşılamaz.",
      en: "Durations are total performance time. The limit for your category cannot be exceeded.",
    },
    worksLabel: { tr: "Eser sayısı", en: "Works" },
    durationLabel: { tr: "Azami süre", en: "Max duration" },
    items: [
      {
        id: "f",
        letter: "F",
        age: { tr: "6–8 yaş", en: "Ages 6–8" },
        works: { tr: "1 veya 2 eser", en: "1 or 2 works" },
        duration: { tr: "Azami 3 dakika", en: "Max 3 minutes" },
        description: { tr: "İlk sahne deneyimi.", en: "First stage experience." },
      },
      {
        id: "g",
        letter: "G",
        age: { tr: "9–12 yaş", en: "Ages 9–12" },
        works: { tr: "1 veya 2 eser", en: "1 or 2 works" },
        duration: { tr: "Azami 3 dakika", en: "Max 3 minutes" },
        description: { tr: "Genç müzisyenler.", en: "Young musicians." },
      },
      {
        id: "h",
        letter: "H",
        age: { tr: "13–16 yaş", en: "Ages 13–16" },
        works: { tr: "1 veya 2 eser", en: "1 or 2 works" },
        duration: { tr: "Azami 5 dakika", en: "Max 5 minutes" },
        description: { tr: "Gelişim kategorisi.", en: "Development category." },
      },
      {
        id: "i",
        letter: "I",
        age: { tr: "17–21 yaş", en: "Ages 17–21" },
        works: { tr: "1 veya 2 eser", en: "1 or 2 works" },
        duration: { tr: "Azami 5 dakika", en: "Max 5 minutes" },
        description: { tr: "Genç sanatçılar.", en: "Young artists." },
      },
      {
        id: "j",
        letter: "J",
        age: { tr: "22–26 yaş", en: "Ages 22–26" },
        works: { tr: "1 veya 2 eser", en: "1 or 2 works" },
        duration: { tr: "Azami 5 dakika", en: "Max 5 minutes" },
        description: { tr: "İleri seviye.", en: "Advanced level." },
      },
    ],
  },
  rules: {
    eyebrow: { tr: "Şartname", en: "Regulations" },
    title: { tr: "Başvuru ve katılım koşulları", en: "Application and participation conditions" },
    note: {
      tr: "Kesin şartname ve jüri bilgileri öğretmenlerden gelen bilgiler doğrultusunda yakında paylaşılacaktır.",
      en: "Final regulations and jury details will be shared soon based on information from the teachers.",
    },
    groups: [
      {
        id: "application",
        title: { tr: "Başvuru koşulları", en: "Application conditions" },
        items: {
          tr: [
            "Başvurular online form ile alınır.",
            "Başvuru ücretsizdir.",
            "Katılımcılar kullanacakları enstrümanı veya vokal türünü başvuruda belirtmelidir.",
            "Her katılımcı yalnızca kendi yaş kategorisinde başvurabilir.",
            "Başvuru formunun eksiksiz doldurulması gerekir.",
            "Başvuru sahibi veya velisi bilgilerin doğruluğunu kabul eder.",
          ],
          en: [
            "Applications are collected through the online form.",
            "Application is free.",
            "Participants must specify the instrument or vocal type they will use.",
            "Each participant can apply only in their own age category.",
            "The application form must be completed in full.",
            "The applicant or their guardian confirms the accuracy of the information.",
          ],
        },
      },
      {
        id: "performance",
        title: { tr: "Performans koşulları", en: "Performance conditions" },
        items: {
          tr: [
            "Bir veya iki eser seslendirilebilir.",
            "Süreler toplam performans süresidir; kategori süresi aşılamaz.",
            "F ve G kategorileri en fazla 3 dakika; H, I ve J kategorileri en fazla 5 dakikadır.",
            "Katılımcılar performanslarından en az 30 dakika önce salonda hazır bulunmalıdır.",
            "Program ve mekân değişiklik hakkı organizasyona aittir.",
            "Jüri kararları kesindir.",
          ],
          en: [
            "One or two works may be performed.",
            "Durations are total performance time; the category limit cannot be exceeded.",
            "Categories F and G are max 3 minutes; H, I, and J are max 5 minutes.",
            "Participants must be ready in the hall at least 30 minutes before their performance.",
            "The organization reserves the right to change the program and venue.",
            "Jury decisions are final.",
          ],
        },
      },
    ],
  },
  awards: {
    eyebrow: { tr: "Ödüller", en: "Awards" },
    title: { tr: "Sahne, ödül ve yeni fırsatlar", en: "Stage, awards, and new opportunities" },
    note: {
      tr: "Ödül detayları ve sponsorluklar yakında açıklanacak.",
      en: "Award details and sponsorships will be announced soon.",
    },
    items: [
      {
        id: "first",
        place: "01",
        title: { tr: "Birincilik", en: "First Prize" },
        description: {
          tr: "Kategori birincileri ödül ve sahne hakkı kazanır.",
          en: "Category winners receive a prize and a stage opportunity.",
        },
      },
      {
        id: "second",
        place: "02",
        title: { tr: "İkincilik", en: "Second Prize" },
        description: {
          tr: "Kategori ikincileri ödül ve sertifika ile ödüllendirilir.",
          en: "Category runners-up receive a prize and certificate.",
        },
      },
      {
        id: "third",
        place: "03",
        title: { tr: "Üçüncülük", en: "Third Prize" },
        description: {
          tr: "Kategori üçüncüleri ödül ve sertifika ile ödüllendirilir.",
          en: "Third-place winners receive a prize and certificate.",
        },
      },
      {
        id: "special",
        place: "★",
        title: { tr: "Özel Ödüller", en: "Special Awards" },
        description: {
          tr: "Jüri özel ödülleri, mansiyonlar ve başarı sertifikaları.",
          en: "Jury special awards, mentions, and achievement certificates.",
        },
      },
    ],
  },
  jury: {
    eyebrow: { tr: "Jüri", en: "Jury" },
    title: { tr: "Değerlendirme kurulu", en: "Evaluation board" },
    note: {
      tr: "Jüri üyeleri öğretmenlerden gelen bilgiler doğrultusunda yakında açıklanacak. Bu alandaki isimler placeholder'dır.",
      en: "Jury members will be announced soon based on information from the teachers. Names in this section are placeholders.",
    },
    members: [
      { id: "chair", role: { tr: "Jüri Başkanı", en: "Jury Chair" }, name: { tr: "İsim açıklanacak", en: "Name to be announced" } },
      { id: "instrument", role: { tr: "Enstrüman", en: "Instrument" }, name: { tr: "İsim açıklanacak", en: "Name to be announced" } },
      { id: "vocal", role: { tr: "Vokal", en: "Vocals" }, name: { tr: "İsim açıklanacak", en: "Name to be announced" } },
      { id: "education", role: { tr: "Müzik Eğitimi", en: "Music Education" }, name: { tr: "İsim açıklanacak", en: "Name to be announced" } },
    ],
  },
  application: {
    eyebrow: { tr: "Başvuru", en: "Application" },
    title: { tr: "Genç müzisyenler için başvuru", en: "Application for young musicians" },
    body: {
      tr: "Başvurular online form ile alınır. Formda kullanacağınız enstrümanı veya vokal türünü belirtin; festival ekibi başvurunuzu değerlendirsin.",
      en: "Applications are collected through the online form. Specify the instrument or vocal type you will use, and let the festival team review your application.",
    },
    steps: [
      {
        id: "form",
        title: { tr: "Formu doldur", en: "Fill in the form" },
        description: {
          tr: "Yaş, iletişim, enstrüman/vokal ve performans bilgilerini paylaş.",
          en: "Share your age, contact, instrument/vocal, and performance details.",
        },
      },
      {
        id: "submit",
        title: { tr: "Başvurunu gönder", en: "Submit your application" },
        description: {
          tr: "Formu göndererek başvurunu tamamla.",
          en: "Complete your application by submitting the form.",
        },
      },
      {
        id: "review",
        title: { tr: "Değerlendirme", en: "Review" },
        description: {
          tr: "Başvurular festival ekibi tarafından incelenir.",
          en: "Applications are reviewed by the festival team.",
        },
      },
      {
        id: "stage",
        title: { tr: "Sahneye hazırlan", en: "Get ready for the stage" },
        description: {
          tr: "Uygun bulunan müzisyenler programa davet edilir.",
          en: "Selected musicians are invited to the program.",
        },
      },
    ],
    note: {
      tr: "Tek bir başvuru formu kullanılır; form soruları etkinlik ekibi tarafından güncellenebilir.",
      en: "A single application form is used; the event team can update the questions.",
    },
    formLabel: { tr: "Başvuru Formunu Aç", en: "Open Application Form" },
    closedLabel: { tr: "Başvuru sayfası", en: "Application page" },
    contactLabel: { tr: "Bize ulaşın", en: "Contact us" },
  },
  faq: {
    eyebrow: { tr: "Sıkça sorulan sorular", en: "FAQ" },
    title: { tr: "Aklınızda bir soru mu var?", en: "Have a question?" },
    items: [
      {
        id: "fee",
        question: { tr: "Başvuru ücretli mi?", en: "Is there an application fee?" },
        answer: { tr: "Hayır, başvuru ücretsizdir.", en: "No, the application is free." },
      },
      {
        id: "who",
        question: { tr: "Kimler başvurabilir?", en: "Who can apply?" },
        answer: {
          tr: "Tüm enstrümanlardan ve vokallerden genç müzisyenler başvurabilir.",
          en: "Young musicians from all instruments and vocals can apply.",
        },
      },
      {
        id: "instruments",
        question: { tr: "Hangi enstrümanlar kabul ediliyor?", en: "Which instruments are accepted?" },
        answer: {
          tr: "Tüm enstrümanlar ve vokal kategorileri kabul edilir. Başvuruda kullanacağınız enstrümanı veya vokal türünü belirtmelisiniz.",
          en: "All instruments and vocal categories are accepted. You must specify the instrument or vocal type you will use.",
        },
      },
      {
        id: "categories",
        question: { tr: "Kategoriler nasıl belirlenir?", en: "How are categories determined?" },
        answer: {
          tr: "Yaş gruplarına göre: F 6–8, G 9–12, H 13–16, I 17–21, J 22–26 yaş.",
          en: "By age group: F 6–8, G 9–12, H 13–16, I 17–21, J 22–26.",
        },
      },
      {
        id: "duration",
        question: { tr: "Performans süresi ne kadar?", en: "How long is the performance?" },
        answer: {
          tr: "F ve G kategorileri en fazla 3 dakika; H, I ve J kategorileri en fazla 5 dakika. Süreler toplam performans süresidir.",
          en: "Categories F and G are max 3 minutes; H, I, and J are max 5 minutes. Durations are total performance time.",
        },
      },
      {
        id: "place",
        question: { tr: "Etkinlik nerede ve ne zaman?", en: "Where and when is the event?" },
        answer: {
          tr: "10 Ocak 2027'de Bodrum'da. Kesin mekân ve program yakında açıklanacak.",
          en: "In Bodrum on 10 January 2027. The final venue and program will be announced soon.",
        },
      },
      {
        id: "result",
        question: { tr: "Sonuçlar ne zaman açıklanır?", en: "When are results announced?" },
        answer: {
          tr: "Başvuru değerlendirmesi sonrasında e-posta veya telefon ile bilgilendirilirsiniz.",
          en: "You will be informed by email or phone after the application review.",
        },
      },
    ],
  },
  gallery: {
    eyebrow: { tr: "Festivalden kareler", en: "Festival moments" },
    title: { tr: "Sahne arkası ve festival anları", en: "Backstage and festival moments" },
    body: {
      tr: "Geçmiş etkinliklerden görüntüler ve festival duyuruları için Multi Event'i Instagram'da takip edin.",
      en: "Follow Multi Event on Instagram for moments from past events and festival announcements.",
    },
    instagramLabel: { tr: "Instagram'da gör", en: "View on Instagram" },
  },
  contact: {
    title: { tr: "Sorularınız için bize ulaşın", en: "Contact us with your questions" },
    body: {
      tr: "Başvuru ve festival hakkında detaylı bilgi için Multi Event ekibiyle iletişime geçebilirsiniz.",
      en: "Contact the Multi Event team for more information about the application and the festival.",
    },
    phone: "+90 530 957 69 77",
    email: "sonertirgil@multievent.org",
    instagram: "https://www.instagram.com/multieventorg/",
  },
} as const;

export function forteFestivalText(locale: Locale, value: LocalizedText) {
  return value[locale] || value[locale === "tr" ? "en" : "tr"];
}

export function forteFestivalList(locale: Locale, value: LocalizedList) {
  return value[locale]?.length ? value[locale] : value[locale === "tr" ? "en" : "tr"];
}

export function forteFestivalPath(locale: Locale) {
  return `/${locale}/${forteFestivalContent.slug}`;
}

export function forteFestivalApplicationPath(locale: Locale) {
  return `/${locale}/basvuru`;
}

export function forteFestivalContactPath(locale: Locale) {
  return `/${locale}/contact`;
}
