import type { Locale } from "@/types";

export type LocalizedText = { readonly tr: string; readonly en: string };
export type LocalizedList = { readonly tr: readonly string[]; readonly en: readonly string[] };

export const pianoFestivalContent = {
  slug: "bodrum-piyano-festivali",
  meta: {
    title: { tr: "Bodrum Piyano Festivali 2026", en: "Bodrum Piano Festival 2026" },
    description: {
      tr: "Bodrum Piyano Festivali 2026: genç piyanistler için yarışma, festival, masterclass ve sahne. Başvurular online form ile alınır.",
      en: "Bodrum Piano Festival 2026: competition, festival, masterclass, and stage for young pianists. Applications are collected online.",
    },
  },
  hero: {
    eyebrow: { tr: "Multi Event Organizasyon", en: "Multi Event Organization" },
    titleLines: { tr: ["BODRUM", "PİYANO", "FESTİVALİ"], en: ["BODRUM", "PIANO", "FESTIVAL"] },
    year: "2026",
    subtitle: {
      tr: "Genç piyanistlerin sahne alacağı, yarışma ve festival heyecanını bir araya getiren yıllık piyano buluşması.",
      en: "The annual piano gathering where young pianists take the stage, bringing together competition and festival excitement.",
    },
    dateLabel: { tr: "Tarih", en: "Date" },
    dateValue: { tr: "13–22 Haziran 2026", en: "13–22 June 2026" },
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
      tr: "Taslak program • Kesin tarihler yakında açıklanacak",
      en: "Draft program • Final dates to be announced",
    },
    scrollLabel: { tr: "Keşfet", en: "Discover" },
  },
  marquee: {
    tr: ["PİYANO", "GENÇ YETENEKLER", "BODRUM 2026", "YARIŞMA", "FESTİVAL", "MASTERCLASS"],
    en: ["PIANO", "YOUNG TALENT", "BODRUM 2026", "COMPETITION", "FESTIVAL", "MASTERCLASS"],
  },
  about: {
    eyebrow: { tr: "Festival hakkında", en: "About the festival" },
    title: {
      tr: "Piyanonun genç sesleri Bodrum'da buluşuyor",
      en: "The young voices of piano meet in Bodrum",
    },
    lead: {
      tr: "Bodrum Piyano Festivali, genç piyanistlere sahne deneyimi kazandırmak, onları jüri ve izleyiciyle buluşturmak ve müziğin birleştirici gücünü paylaşmak için düzenleniyor.",
      en: "Bodrum Piano Festival is organized to give young pianists stage experience, bring them together with the jury and audience, and share the unifying power of music.",
    },
    paragraphs: [
      {
        tr: "Festival; yarışma, konserler, masterclass ve ödül törenini tek bir programda bir araya getiriyor. Farklı yaş gruplarındaki genç piyanistler, kendi kategorilerinde performans sergiliyor.",
        en: "The festival brings competition, concerts, masterclasses, and an award ceremony together in one program. Young pianists in different age groups perform in their own categories.",
      },
      {
        tr: "Başvurular online form ile alınır. Katılımcılar; yaşlarına uygun kategori, repertuvar ve performans koşulları hakkında bilgiyi bu sayfada bulabilir. Kesin program ve jüri bilgileri yakında açıklanacaktır.",
        en: "Applications are collected through the online form. Participants can find information about their age category, repertoire, and performance conditions on this page. The final program and jury details will be announced soon.",
      },
    ],
    stats: [
      { id: "year", value: "2026", label: { tr: "Bodrum", en: "Bodrum" } },
      { id: "categories", value: "4", label: { tr: "Yaş kategorisi", en: "Age categories" } },
      { id: "stage", value: "1", label: { tr: "Sahne", en: "Stage" } },
      { id: "instrument", value: "Piyano", label: { tr: "Tek enstrüman", en: "One instrument" } },
    ],
  },
  program: {
    eyebrow: { tr: "Program", en: "Program" },
    title: { tr: "Festival takvimi", en: "Festival calendar" },
    note: {
      tr: "Taslak program. Kesin tarih, mekân ve saatler yakında açıklanacak.",
      en: "Draft schedule. Final dates, venue, and times will be announced.",
    },
    items: [
      {
        id: "festival",
        date: { tr: "13–17 Haziran 2026", en: "13–17 June 2026" },
        title: { tr: "Festival", en: "Festival" },
        description: {
          tr: "Genç piyanistlerin performansları ve festival etkinlikleri.",
          en: "Performances by young pianists and festival events.",
        },
        location: { tr: "Bodrum", en: "Bodrum" },
      },
      {
        id: "award",
        date: { tr: "17 Haziran 2026", en: "17 June 2026" },
        title: { tr: "Festival Ödül Töreni", en: "Festival Award Ceremony" },
        description: {
          tr: "Festival kategorilerinde ödüllerin sahiplerini bulması.",
          en: "Awards are presented in the festival categories.",
        },
        location: { tr: "Bodrum", en: "Bodrum" },
      },
      {
        id: "opening",
        date: { tr: "19 Haziran 2026", en: "19 June 2026" },
        title: { tr: "Açılış Konseri", en: "Opening Concert" },
        description: {
          tr: "Festivalin açılışını yapan özel konser.",
          en: "A special concert opening the festival.",
        },
        location: { tr: "Bodrum", en: "Bodrum" },
      },
      {
        id: "competition",
        date: { tr: "20–22 Haziran 2026", en: "20–22 June 2026" },
        title: { tr: "Yarışma", en: "Competition" },
        description: {
          tr: "Yaş kategorilerinde iki aşamalı piyano yarışması.",
          en: "A two-stage piano competition across age categories.",
        },
        location: { tr: "Bodrum", en: "Bodrum" },
      },
      {
        id: "masterclass",
        date: { tr: "23 Haziran 2026", en: "23 June 2026" },
        title: { tr: "Masterclass", en: "Masterclass" },
        description: {
          tr: "Jüri üyeleriyle genç piyanistlere yönelik atölye.",
          en: "A workshop for young pianists with jury members.",
        },
        location: { tr: "Bodrum", en: "Bodrum" },
      },
    ],
  },
  categories: {
    eyebrow: { tr: "Kategoriler", en: "Categories" },
    title: { tr: "Yaş grupları ve repertuvar", en: "Age groups and repertoire" },
    note: {
      tr: "Kategoriler ve repertuvar koşulları örnek amaçlıdır; kesin şartname yakında yayınlanacak.",
      en: "Categories and repertoire conditions are indicative; final regulations will be published soon.",
    },
    items: [
      {
        id: "a",
        age: { tr: "5–8 Yaş", en: "Ages 5–8" },
        title: { tr: "İlk Adım", en: "First Step" },
        description: {
          tr: "Piyano eğitimine yeni başlayan gençler için ilk sahne deneyimi.",
          en: "A first stage experience for young pianists beginning their piano education.",
        },
        requirements: {
          tr: ["En fazla 2 eser", "Toplam 5 dakika", "Ezber çalma"],
          en: ["Up to 2 works", "5 minutes total", "Perform from memory"],
        },
      },
      {
        id: "b",
        age: { tr: "9–11 Yaş", en: "Ages 9–11" },
        title: { tr: "Genç Piyanistler", en: "Young Pianists" },
        description: {
          tr: "Barok, klasik ve etüt ağırlıklı bir programla değerlendirme.",
          en: "Assessment with a program focused on Baroque, Classical, and études.",
        },
        requirements: {
          tr: ["En fazla 3 eser", "Toplam 8 dakika", "Farklı dönemler"],
          en: ["Up to 3 works", "8 minutes total", "Different periods"],
        },
      },
      {
        id: "c",
        age: { tr: "12–14 Yaş", en: "Ages 12–14" },
        title: { tr: "Gelişim", en: "Development" },
        description: {
          tr: "Polifoni, sonat ve etütlerle teknik ve müzikal gelişim.",
          en: "Technical and musical development through polyphony, sonatas, and études.",
        },
        requirements: {
          tr: ["En fazla 3 eser", "Toplam 10 dakika", "Polifonik eser"],
          en: ["Up to 3 works", "10 minutes total", "A polyphonic work"],
        },
      },
      {
        id: "d",
        age: { tr: "15–20 Yaş", en: "Ages 15–20" },
        title: { tr: "Genç Sanatçılar", en: "Young Artists" },
        description: {
          tr: "Serbest program ve virtüöz etütlerle üst düzey performans.",
          en: "Advanced performance with a free program and virtuoso études.",
        },
        requirements: {
          tr: ["En fazla 3 eser", "Toplam 20 dakika", "Virtüöz etüt"],
          en: ["Up to 3 works", "20 minutes total", "A virtuoso étude"],
        },
      },
    ],
  },
  rules: {
    eyebrow: { tr: "Şartname", en: "Regulations" },
    title: { tr: "Başvuru ve katılım koşulları", en: "Application and participation conditions" },
    note: {
      tr: "Bu metin örnek/placeholder'dır. Kesin şartname ve katılım koşulları yakında yayınlanacaktır.",
      en: "This text is placeholder. Final regulations and participation conditions will be published soon.",
    },
    groups: [
      {
        id: "competition",
        title: { tr: "Yarışma kuralları", en: "Competition rules" },
        items: {
          tr: [
            "Her katılımcı yalnızca kendi yaş kategorisinde yarışır.",
            "Yarışma iki aşamalıdır; birinci aşama eserleri ikinci aşamada tekrarlanamaz.",
            "Performanslar ezber çalınır.",
            "Jüri kararları kesindir; jüri birden fazla ödül verebilir.",
            "Başvuru ücretsizdir; başvuru formu eksiksiz doldurulmalıdır.",
            "Katılımcılar performanslarından en az 30 dakika önce salonda hazır bulunmalıdır.",
          ],
          en: [
            "Each participant competes only in their own age category.",
            "The competition has two stages; first-stage works cannot be repeated in the second stage.",
            "Performances are played from memory.",
            "Jury decisions are final; the jury may award more than one prize.",
            "Application is free; the application form must be completed in full.",
            "Participants must be ready in the hall at least 30 minutes before their performance.",
          ],
        },
      },
      {
        id: "festival",
        title: { tr: "Festival kuralları", en: "Festival rules" },
        items: {
          tr: [
            "Festival kategorileri 5–12 ve 13–20 yaş olarak planlanmıştır.",
            "Her katılımcı en fazla 2 eser seslendirir.",
            "Performans süresi kategoriye göre değişir.",
            "Festivalde ezber çalma zorunludur.",
            "Katılımcıların ulaşım, konaklama ve yemek giderleri kendilerine aittir.",
            "Program ve mekân değişiklik hakkı organizasyona aittir.",
          ],
          en: [
            "Festival categories are planned for ages 5–12 and 13–20.",
            "Each participant performs up to 2 works.",
            "Performance duration varies by category.",
            "Performances are played from memory.",
            "Transport, accommodation, and meal expenses belong to the participants.",
            "The organization reserves the right to change the program and venue.",
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
      tr: "Jüri üyeleri yakında açıklanacak. Bu alandaki isimler örnek/placeholder'dır.",
      en: "Jury members will be announced soon. Names in this section are placeholders.",
    },
    members: [
      { id: "chair", role: { tr: "Jüri Başkanı", en: "Jury Chair" }, name: { tr: "İsim açıklanacak", en: "Name to be announced" } },
      { id: "piano", role: { tr: "Piyano", en: "Piano" }, name: { tr: "İsim açıklanacak", en: "Name to be announced" } },
      { id: "chamber", role: { tr: "Oda Müziği", en: "Chamber Music" }, name: { tr: "İsim açıklanacak", en: "Name to be announced" } },
      { id: "pedagogy", role: { tr: "Piyano Pedagojisi", en: "Piano Pedagogy" }, name: { tr: "İsim açıklanacak", en: "Name to be announced" } },
    ],
  },
  application: {
    eyebrow: { tr: "Başvuru", en: "Application" },
    title: { tr: "Genç piyanistler için başvuru", en: "Application for young pianists" },
    body: {
      tr: "Başvurular online form ile alınır. Formu doldurun; festival ekibi başvurunuzu değerlendirsin.",
      en: "Applications are collected through the online form. Fill in the form and let the festival team review your application.",
    },
    steps: [
      {
        id: "form",
        title: { tr: "Formu doldur", en: "Fill in the form" },
        description: {
          tr: "Yaş, iletişim ve performans bilgilerini paylaş.",
          en: "Share your age, contact, and performance details.",
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
          tr: "Uygun bulunan piyanistler programa davet edilir.",
          en: "Selected pianists are invited to the program.",
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
          tr: "Piyano çalan gençler ve müzik öğrencileri başvurabilir.",
          en: "Young pianists and music students can apply.",
        },
      },
      {
        id: "categories",
        question: { tr: "Kategoriler nasıl belirlenir?", en: "How are categories determined?" },
        answer: {
          tr: "Kategoriler yaş gruplarına göre belirlenir: 5–8, 9–11, 12–14 ve 15–20.",
          en: "Categories are determined by age groups: 5–8, 9–11, 12–14, and 15–20.",
        },
      },
      {
        id: "performance",
        question: { tr: "Performansımı nasıl iletebilirim?", en: "How can I submit my performance?" },
        answer: {
          tr: "Başvuru formunda performans veya sosyal medya bağlantısı ekleyebilirsiniz.",
          en: "You can add a performance or social media link in the application form.",
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
      {
        id: "place",
        question: { tr: "Etkinlik nerede?", en: "Where is the event?" },
        answer: {
          tr: "Etkinlik Bodrum'da planlanıyor; kesin mekân ve tarih yakında açıklanacak.",
          en: "The event is planned in Bodrum; the final venue and date will be announced soon.",
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

export function pianoFestivalText(locale: Locale, value: LocalizedText) {
  return value[locale] || value[locale === "tr" ? "en" : "tr"];
}

export function pianoFestivalList(locale: Locale, value: LocalizedList) {
  return value[locale]?.length ? value[locale] : value[locale === "tr" ? "en" : "tr"];
}

export function pianoFestivalPath(locale: Locale) {
  return `/${locale}/${pianoFestivalContent.slug}`;
}

export function pianoFestivalApplicationPath(locale: Locale) {
  return `/${locale}/basvuru`;
}

export function pianoFestivalContactPath(locale: Locale) {
  return `/${locale}/contact`;
}
