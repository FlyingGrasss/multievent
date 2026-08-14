import type { Locale } from "@/types";

type LocalizedValue<T> = Record<Locale, T>;

export type SeoService = {
  key: string;
  slug: LocalizedValue<string>;
  title: LocalizedValue<string>;
  description: LocalizedValue<string>;
  introduction: LocalizedValue<string[]>;
  highlights: LocalizedValue<string[]>;
  faqs: LocalizedValue<Array<{ question: string; answer: string }>>;
};

export const supportedLocales = ["tr", "en"] as const;

export function isLocale(value: string): value is Locale {
  return supportedLocales.includes(value as Locale);
}

export const seoServices: SeoService[] = [
  {
    key: "event-planning",
    slug: { tr: "bodrum-etkinlik-organizasyon", en: "bodrum-event-planning" },
    title: { tr: "Bodrum Etkinlik Organizasyon", en: "Event Planning in Bodrum" },
    description: {
      tr: "Bodrum'da özel davet, düğün ve kurumsal etkinlikler için planlama, canlı müzik ve teknik prodüksiyon hizmetleri.",
      en: "Event planning, live music, and technical production for private, wedding, and corporate events in Bodrum.",
    },
    introduction: {
      tr: [
        "Bodrum'da bir etkinlik planlarken mekân, program akışı, müzik ve teknik prodüksiyonun aynı hedef etrafında ilerlemesi gerekir. Multi Event, etkinliğin kapsamını ve davetli profilini anlayarak gerekli hizmetleri tek bir plan içinde bir araya getirir.",
        "Hazırlık sürecinde zamanlama, sanatçı seçimi, ses, ışık ve sahne ihtiyaçları değerlendirilir. Amaç; davetlilerin rahat ettiği, programın kesintisiz ilerlediği ve mekânın karakterine uygun bir etkinlik deneyimi oluşturmaktır.",
        "Bodrum merkez, Konacık, Yalıkavak, Türkbükü, Gümüşlük ve çevresindeki etkinlikler için teklif almak üzere etkinlik tarihi, mekânı ve yaklaşık davetli sayısını iletebilirsiniz.",
      ],
      en: [
        "Planning an event in Bodrum requires the venue, schedule, entertainment, and technical production to work toward one clear goal. Multi Event brings the required services together after reviewing the event scope and guest profile.",
        "The planning process covers timing, artist selection, sound, lighting, and stage requirements. The objective is a comfortable guest experience, a reliable event flow, and production that fits the character of the venue.",
        "For events in central Bodrum, Konacık, Yalıkavak, Türkbükü, Gümüşlük, and nearby areas, send the event date, venue, and estimated guest count to request a tailored proposal.",
      ],
    },
    highlights: {
      tr: ["Etkinlik akışı ve operasyon planı", "Canlı müzik ve sanatçı seçimi", "Ses, ışık ve sahne koordinasyonu", "Mekâna ve davetli profiline özel çözüm"],
      en: ["Event schedule and operations plan", "Live music and artist selection", "Sound, lighting, and stage coordination", "A solution tailored to the venue and guests"],
    },
    faqs: {
      tr: [
        { question: "Bodrum etkinlik organizasyon teklifi için hangi bilgiler gerekir?", answer: "Tarih, mekân, etkinlik türü, yaklaşık davetli sayısı ve ihtiyaç duyulan müzik veya teknik hizmetler başlangıç için yeterlidir." },
        { question: "Sadece canlı müzik veya teknik prodüksiyon alınabilir mi?", answer: "Evet. Etkinliğin tamamı yerine yalnızca sanatçı, ses, ışık veya sahne hizmeti için de planlama yapılabilir." },
      ],
      en: [
        { question: "What information is needed for a Bodrum event proposal?", answer: "The date, venue, event type, estimated guest count, and required entertainment or technical services are enough to begin." },
        { question: "Can I book only live music or technical production?", answer: "Yes. Artist, sound, lighting, or stage services can be planned independently of full event management." },
      ],
    },
  },
  {
    key: "wedding-planning",
    slug: { tr: "bodrum-dugun-organizasyonu", en: "bodrum-wedding-planning" },
    title: { tr: "Bodrum Düğün Organizasyonu", en: "Wedding Planning in Bodrum" },
    description: {
      tr: "Bodrum düğün organizasyonu için program akışı, canlı müzik, ses, ışık ve sahne prodüksiyonunu birlikte planlayın.",
      en: "Plan your Bodrum wedding schedule, live music, sound, lighting, and stage production as one coordinated experience.",
    },
    introduction: {
      tr: [
        "Bodrum düğün organizasyonu; tören, karşılama, yemek, ilk dans ve eğlence bölümlerinin birbiriyle uyumlu ilerlemesini gerektirir. Multi Event, çiftin müzik tercihlerini ve mekânın teknik koşullarını dikkate alarak düğünün akışını planlar.",
        "Canlı grup, solist, DJ ve enstrümantal performans seçenekleri davetli profiline göre değerlendirilir. Ses sistemi, sahne ve ışık planı ise açık hava, otel, beach club veya özel villa gibi mekânın özelliklerine göre şekillendirilir.",
        "Teklif sürecinde düğün tarihi, mekân, davetli sayısı ve istenen müzik tarzının paylaşılması doğru ekip ve teknik kapsamın belirlenmesini kolaylaştırır.",
      ],
      en: [
        "A Bodrum wedding brings together the ceremony, welcome, dinner, first dance, and entertainment. Multi Event plans the flow around the couple's music preferences and the technical conditions of the venue.",
        "Live bands, vocalists, DJs, and instrumental performers can be considered according to the guest profile. Sound, stage, and lighting plans are adapted for outdoor venues, hotels, beach clubs, or private villas.",
        "Sharing the wedding date, venue, guest count, and preferred music style helps define the right performers and technical production scope.",
      ],
    },
    highlights: {
      tr: ["Tören ve eğlence akışı", "İlk dans ve repertuvar planı", "Canlı grup, solist ve DJ seçenekleri", "Açık hava düğünlerine uygun teknik prodüksiyon"],
      en: ["Ceremony and entertainment flow", "First dance and repertoire planning", "Live band, vocalist, and DJ options", "Technical production for outdoor weddings"],
    },
    faqs: {
      tr: [
        { question: "Bodrum düğünü için sanatçı seçimi nasıl yapılır?", answer: "Müzik tarzı, davetli profili, mekân ve program süresi değerlendirilerek uygun grup, solist veya DJ seçenekleri sunulur." },
        { question: "Açık hava düğünlerinde ses ve ışık planlanıyor mu?", answer: "Evet. Mekânın elektrik, yerleşim ve ses sınırları değerlendirilerek uygun teknik plan hazırlanır." },
      ],
      en: [
        { question: "How are performers selected for a Bodrum wedding?", answer: "Music style, guest profile, venue, and program length are reviewed before suitable band, vocalist, or DJ options are presented." },
        { question: "Do you plan sound and lighting for outdoor weddings?", answer: "Yes. The technical plan considers power, layout, and sound restrictions at the venue." },
      ],
    },
  },
  {
    key: "live-music",
    slug: { tr: "bodrum-canli-muzik", en: "live-music-bodrum" },
    title: { tr: "Bodrum Canlı Müzik", en: "Live Music in Bodrum" },
    description: {
      tr: "Bodrum düğünleri, özel davetler ve kurumsal etkinlikler için canlı müzik grupları, solistler ve enstrümantal performanslar.",
      en: "Live bands, vocalists, and instrumental performances for weddings, private celebrations, and corporate events in Bodrum.",
    },
    introduction: {
      tr: [
        "Canlı müzik, etkinliğin temposunu ve davetlilerin mekânla kurduğu bağı doğrudan etkiler. Multi Event sanatçı portföyü; solistler, gruplar ve farklı enstrümantal performans seçeneklerini bir araya getirir.",
        "Sanatçı seçimi yapılırken etkinliğin türü, davetli profili, repertuvar beklentisi, performans süresi ve mekânın teknik kapasitesi değerlendirilir. Gerektiğinde karşılama, yemek ve eğlence bölümleri için farklı müzik kurguları hazırlanabilir.",
        "Bodrum'daki düğün, özel davet ve kurumsal etkinlikler için müsaitlik ve teklif bilgisi almak üzere tarih ile müzik beklentinizi paylaşabilirsiniz.",
      ],
      en: [
        "Live music directly shapes the pace of an event and the connection guests feel with the venue. The Multi Event artist portfolio brings together vocalists, bands, and varied instrumental performances.",
        "Artist selection considers the event type, guest profile, repertoire, performance duration, and technical capacity of the venue. Separate music concepts can be prepared for welcome, dinner, and entertainment sections.",
        "For availability and proposals for weddings, private celebrations, and corporate events in Bodrum, share your date and preferred music direction.",
      ],
    },
    highlights: {
      tr: ["Canlı grup ve solist seçenekleri", "Karşılama ve yemek müziği", "DJ ve enstrümantal performanslar", "Etkinliğe özel repertuvar yaklaşımı"],
      en: ["Live band and vocalist options", "Welcome and dinner music", "DJ and instrumental performances", "An event-specific repertoire approach"],
    },
    faqs: {
      tr: [
        { question: "Canlı müzik repertuvarı özelleştirilebilir mi?", answer: "Repertuvar beklentileri sanatçı ve etkinlik akışıyla birlikte değerlendirilir; uygun talepler planlamaya dâhil edilir." },
        { question: "Sanatçı için teknik ekipman sağlanıyor mu?", answer: "İhtiyaca göre ses sistemi, monitör, mikrofon, ışık ve sahne gereksinimleri teklife eklenebilir." },
      ],
      en: [
        { question: "Can the live music repertoire be customized?", answer: "Repertoire preferences are reviewed with the performer and event schedule, and suitable requests are included in planning." },
        { question: "Can technical equipment be supplied for performers?", answer: "Sound, monitoring, microphones, lighting, and stage requirements can be included according to the production needs." },
      ],
    },
  },
  {
    key: "corporate-events",
    slug: { tr: "kurumsal-etkinlik-organizasyonu", en: "corporate-events-bodrum" },
    title: { tr: "Bodrum Kurumsal Etkinlik Organizasyonu", en: "Corporate Events in Bodrum" },
    description: {
      tr: "Bodrum'da şirket buluşmaları, lansmanlar ve kurumsal davetler için etkinlik akışı, müzik ve teknik prodüksiyon.",
      en: "Event flow, entertainment, and technical production for company gatherings, launches, and corporate occasions in Bodrum.",
    },
    introduction: {
      tr: [
        "Kurumsal etkinliklerde marka dili, program disiplini ve teknik güvenilirlik birlikte ele alınmalıdır. Multi Event; şirket buluşması, lansman, gala veya ekip etkinliğinin amacına uygun bir akış oluşturulmasına destek verir.",
        "Konuşma, sunum ve sahne bölümleri için ses ve ışık gereksinimleri belirlenir; karşılama ve eğlence bölümleri için müzik seçenekleri planlanır. Mekânın kuralları ve kurulum saatleri operasyon planına dâhil edilir.",
        "Teklif için etkinliğin amacı, tarih, mekân, katılımcı sayısı, program taslağı ve teknik beklentilerin paylaşılması yeterlidir.",
      ],
      en: [
        "Corporate events require brand consistency, disciplined scheduling, and reliable technical production. Multi Event supports the planning of company gatherings, launches, gala events, and team occasions around a clear purpose.",
        "Sound and lighting requirements are defined for speeches, presentations, and stage segments. Music is planned for guest arrival and entertainment, while venue rules and setup times are included in operations.",
        "To request a proposal, share the event purpose, date, venue, participant count, draft schedule, and technical expectations.",
      ],
    },
    highlights: {
      tr: ["Program ve sahne akışı", "Sunum ve konuşma ses sistemleri", "Markaya uygun müzik seçimi", "Kurulum ve operasyon koordinasyonu"],
      en: ["Program and stage flow", "Sound systems for presentations and speeches", "Music aligned with the brand", "Setup and operations coordination"],
    },
    faqs: {
      tr: [
        { question: "Kurumsal etkinlik için teknik keşif yapılıyor mu?", answer: "Gerekli durumlarda mekânın yerleşimi, kurulum alanı ve teknik altyapısı teklif öncesinde değerlendirilir." },
        { question: "Sunum ve eğlence aynı teknik sistemle planlanabilir mi?", answer: "Program ve mekân uygunsa konuşma, sunum ve eğlence bölümleri ortak bir teknik plan içinde çözülebilir." },
      ],
      en: [
        { question: "Is a technical venue review available for corporate events?", answer: "When required, the layout, setup area, and technical infrastructure can be reviewed before the proposal is finalized." },
        { question: "Can presentations and entertainment use one technical system?", answer: "When the venue and schedule allow, speeches, presentations, and entertainment can be covered by one coordinated technical plan." },
      ],
    },
  },
  {
    key: "technical-production",
    slug: { tr: "ses-isik-sahne-kiralama", en: "sound-lighting-stage-rental-bodrum" },
    title: { tr: "Bodrum Ses, Işık ve Sahne Kiralama", en: "Sound, Lighting and Stage Rental in Bodrum" },
    description: {
      tr: "Bodrum etkinlikleri için profesyonel ses sistemi, ışık tasarımı, sahne kurulumu ve teknik prodüksiyon planlaması.",
      en: "Professional sound systems, lighting design, stage setup, and technical production planning for events in Bodrum.",
    },
    introduction: {
      tr: [
        "Etkinliğin anlaşılır, dengeli ve etkileyici görünmesi doğru teknik planla başlar. Ses sistemi kapasitesi, hoparlör yerleşimi, mikrofon ve monitör ihtiyaçları; mekânın ölçüsü ve program türüne göre belirlenir.",
        "Işık ve sahne planında performans alanı, davetli yerleşimi, giriş yolları ve mekânın mevcut altyapısı dikkate alınır. Canlı müzik, DJ, konuşma ve sunum bölümlerinin ihtiyaçları tek bir teknik akışta koordine edilir.",
        "Doğru kapsamı belirlemek için etkinlik tarihi, mekân, davetli sayısı, program ve sanatçı teknik ihtiyaçlarının paylaşılması gerekir.",
      ],
      en: [
        "A clear, balanced, and visually effective event begins with the right technical plan. Sound-system capacity, speaker placement, microphones, and monitors are selected according to venue size and program type.",
        "Lighting and stage planning considers the performance area, guest layout, access routes, and existing venue infrastructure. Live music, DJ, speech, and presentation requirements are coordinated within one technical flow.",
        "To define the right scope, share the event date, venue, guest count, program, and performer technical requirements.",
      ],
    },
    highlights: {
      tr: ["Ses sistemi ve ekipman planı", "Sahne ve performans alanı kurulumu", "Etkinlik ışık tasarımı", "Canlı performans teknik koordinasyonu"],
      en: ["Sound-system and equipment planning", "Stage and performance-area setup", "Event lighting design", "Technical coordination for live performance"],
    },
    faqs: {
      tr: [
        { question: "Ses sistemi kapasitesi nasıl belirlenir?", answer: "Mekânın açık veya kapalı olması, alan büyüklüğü, davetli sayısı ve program türü birlikte değerlendirilir." },
        { question: "Kurulum ve teknik ekip hizmete dâhil mi?", answer: "Teklif kapsamına göre ekipman taşıma, kurulum, test, etkinlik süresince teknik operasyon ve söküm planlanabilir." },
      ],
      en: [
        { question: "How is sound-system capacity determined?", answer: "Indoor or outdoor conditions, venue size, guest count, and program type are evaluated together." },
        { question: "Are setup and technical staff included?", answer: "Depending on the proposal, transport, setup, testing, event operation, and breakdown can be planned as one service." },
      ],
    },
  },
];

export function getSeoService(locale: Locale, slug: string) {
  return seoServices.find((service) => service.slug[locale] === slug);
}

export function servicePath(service: SeoService, locale: Locale) {
  return `/${locale}/services/${service.slug[locale]}`;
}
