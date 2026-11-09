import type { Locale } from "@/types";

export type LocalizedText = { readonly tr: string; readonly en: string };
export type LocalizedList = { readonly tr: readonly string[]; readonly en: readonly string[] };

export const forteFestivalContent = {
  slug: "bodrum-forte-muzik-festivali",
  meta: {
    title: { tr: "Bodrum Forte Müzik Festivali", en: "Bodrum Forte Music Festival" },
    description: {
      tr: "Bodrum Forte Müzik Festivali: her enstrümandan genç müzisyenler için festival ve sahne. 10 Ocak 2027'de Bodrum'da. Başvurular online form ile alınır.",
      en: "Bodrum Forte Music Festival: a festival and stage for young musicians of all instruments. In Bodrum on 10 January 2027. Applications are collected online.",
    },
  },
  hero: {
    eyebrow: { tr: "Multi Event Organizasyon", en: "Multi Event Organization" },
    titleLines: { tr: ["BODRUM", "FORTE", "MÜZİK", "FESTİVALİ"], en: ["BODRUM", "FORTE", "MUSIC", "FESTIVAL"] },
    year: "2027",
    subtitle: {
      tr: "Bodrum'da her enstrümandan genç müzisyenin sahne alacağı, festival heyecanını bir araya getiren yıllık müzik buluşması.",
      en: "The annual music gathering in Bodrum where young musicians of all instruments take the stage.",
    },
    dateLabel: { tr: "Tarih", en: "Date" },
    dateValue: { tr: "10 Ocak 2027", en: "10 January 2027" },
    timeLabel: { tr: "Başlangıç saati", en: "Start time" },
    timeValue: { tr: "13:00", en: "13:00" },
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
    backgroundImage: "/forte/hero-piano.jpg",
    backgroundAlt: { tr: "Piyano ve piyanist", en: "Piano and pianist" },
    posterImage: "/forte/poster-keys.jpg",
    posterAlt: { tr: "Piyano tuşları", en: "Piano keys" },
  },
  deadline: {
    label: { tr: "Son başvuru", en: "Application deadline" },
    value: { tr: "Duyurulacak", en: "To be announced" },
    note: { tr: "Kesin tarih yakında açıklanacak.", en: "The exact date will be announced soon." },
  },
  marquee: {
    tr: ["MÜZİK", "GENÇ MÜZİSYENLER", "BODRUM 2027", "FORTE", "FESTİVAL", "SAHNE"],
    en: ["MUSIC", "YOUNG MUSICIANS", "BODRUM 2027", "FORTE", "FESTIVAL", "STAGE"],
  },
  about: {
    eyebrow: { tr: "Festival hakkında", en: "About the festival" },
    title: {
      tr: "Genç müzisyenler için yıllık bir sahne",
      en: "An annual stage for young musicians",
    },
    lead: {
      tr: "Bodrum Forte Müzik Festivali, her enstrümandan genç müzisyeni performanslarıyla aynı sahnede buluşturuyor.",
      en: "Bodrum Forte Music Festival brings young musicians of all instruments together on one stage through their performances.",
    },
    paragraphs: [
      {
        tr: "Festival; farklı yaş kategorilerinde performansları, jüri değerlendirmesini ve sertifika takdimini tek bir günde bir araya getiriyor.",
        en: "The festival brings performances across age categories, jury evaluation, and a certificate presentation together in one day.",
      },
      {
        tr: "Başvurular online form ile alınır. Katılımcılar yaşlarına uygun kategoride, belirlenen eser sayısı ve performans süresiyle başvurur.",
        en: "Applications are collected through the online form. Participants apply in their age category with the specified number of works and performance duration.",
      },
      {
        tr: "Kesin jüri, program ve mekân bilgileri öğretmenlerden gelen bilgiler doğrultusunda yakında paylaşılacaktır.",
        en: "Final jury, program, and venue details will be shared soon based on information from the teachers.",
      },
    ],
    image: "/forte/about-hands.jpg",
    imageAlt: { tr: "Piyano çalan eller", en: "Hands playing piano" },
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
      tr: "10 Ocak 2027 • Festival 13:00'te başlıyor. Sıralama yakında açıklanacak.",
      en: "10 January 2027 • The festival starts at 13:00. Running order will be announced.",
    },
    items: [
      {
        id: "opening",
        date: { tr: "10 Ocak 2027", en: "10 January 2027" },
        title: { tr: "Kayıt ve Açılış", en: "Registration and Opening" },
        description: {
          tr: "Katılımcı kayıtları ve festivalin 13:00'te açılışı.",
          en: "Participant registration and the festival opening at 13:00.",
        },
        location: { tr: "Bodrum", en: "Bodrum" },
      },
      {
        id: "performances",
        date: { tr: "10 Ocak 2027", en: "10 January 2027" },
        title: { tr: "Kategori Performansları", en: "Category Performances" },
        description: {
          tr: "F, G ve H kategorilerinde performanslar.",
          en: "Performances in categories F, G, and H.",
        },
        location: { tr: "Bodrum", en: "Bodrum" },
      },
      {
        id: "awards",
        date: { tr: "10 Ocak 2027", en: "10 January 2027" },
        title: { tr: "Sertifika Takdimi", en: "Certificate Presentation" },
        description: {
          tr: "Katılım sertifikalarının takdimi.",
          en: "Presentation of participation certificates.",
        },
        location: { tr: "Bodrum", en: "Bodrum" },
      },
    ],
  },
  participants: {
    eyebrow: { tr: "Katılımcılar", en: "Participants" },
    title: { tr: "Katılımcılar ve eserler", en: "Participants and works" },
    body: {
      tr: "Festivalde sahne alacak öğrenciler ve seslendirecekleri eserler.",
      en: "Students performing at the festival and the works they will play.",
    },
    note: {
      tr: "Katılımcı ve eser listesi başvurular kesinleştikçe güncellenecektir.",
      en: "The participant and work list will be updated as applications are confirmed.",
    },
    emptyText: {
      tr: "Katılımcı ve eser listesi henüz yayınlanmadı.",
      en: "The participant and work list has not been published yet.",
    },
    nameLabel: { tr: "Öğrenci", en: "Student" },
    categoryLabel: { tr: "Kategori", en: "Category" },
    songsLabel: { tr: "Seslendireceği eserler", en: "Works" },
    items: [
      {
        id: "participant-1",
        name: { tr: "", en: "" },
        category: { tr: "", en: "" },
        songs: { tr: "", en: "" },
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
        age: { tr: "5–9 yaş", en: "Ages 5–9" },
        works: { tr: "1 veya 2 eser", en: "1 or 2 works" },
        duration: { tr: "Azami 3 dakika", en: "Max 3 minutes" },
        description: { tr: "İlk sahne deneyimi.", en: "First stage experience." },
      },
      {
        id: "g",
        letter: "G",
        age: { tr: "10–13 yaş", en: "Ages 10–13" },
        works: { tr: "1 veya 2 eser", en: "1 or 2 works" },
        duration: { tr: "Azami 4 dakika", en: "Max 4 minutes" },
        description: { tr: "Genç müzisyenler.", en: "Young musicians." },
      },
      {
        id: "h",
        letter: "H",
        age: { tr: "14 yaş ve üzeri", en: "Ages 14 and over" },
        works: { tr: "1 veya 2 eser", en: "1 or 2 works" },
        duration: { tr: "Azami 5 dakika", en: "Max 5 minutes" },
        description: { tr: "Gelişim kategorisi.", en: "Development category." },
      },
    ],
  },
  rules: {
    eyebrow: { tr: "Şartname", en: "Regulations" },
    title: { tr: "Festival Şartnamesi", en: "Festival Regulations" },
    note: {
      tr: "Kesin şartname ve jüri bilgileri öğretmenlerden gelen bilgiler doğrultusunda yakında paylaşılacaktır.",
      en: "Final regulations and jury details will be shared soon based on information from the teachers.",
    },
    groups: [
      {
        id: "festival",
        title: { tr: "Festival Şartnamesi", en: "Festival Regulations" },
        items: {
          tr: [
            "Festival kategorileri yaş gruplarına göre belirlenir: F (5–9 yaş), G (10–13 yaş) ve H (14 yaş ve üzeri).",
            "Festival her enstrümana açıktır. Piyano dışındaki enstrümanlar için katılımcı kendi enstrümanını getirmelidir.",
            "Her katılımcı en fazla 2 eser seslendirebilir.",
            "Performans süresi F kategorisinde en fazla 3 dakika, G kategorisinde en fazla 4 dakika, H kategorisinde en fazla 5 dakikadır. Süreler toplam performans süresidir.",
            "Festivalde ezber çalma zorunludur; eserlerde belirtilen röprizler çalınmayacaktır.",
            "Başvurular online form ile alınır. Katılım ücreti ve ödeme bilgileri festival sayfasındaki ilgili bölümde yer alır. Katılımcı veya velisi verdiği bilgilerin doğruluğunu kabul eder.",
            "Her katılımcıya katılım sertifikası verilir.",
            "Festivalin tüm aşamaları halka açıktır ve ücretsiz olarak izlenebilir.",
            "Katılımcıların ulaşım, konaklama ve yemek masrafları kendilerine aittir.",
            "Katılımcılar, kendilerine bildirilen program saatinden en az 30 dakika önce konser salonunda hazır bulunmalıdır.",
            "Çalınacak eserlerin notaları festival kayıt masasına elden teslim edilmelidir.",
            "Organizasyon, başvuruların yoğunluğu veya zorunlu sebeplerle programda değişiklik yapma hakkını saklı tutar.",
            "Katılımcılar, festival sırasında oluşturulan görsel ve işitsel materyallerin tanıtım ve arşiv amaçlı kullanılmasına izin verir.",
            "Festivalde ortaya çıkabilecek her türlü hukuki uyuşmazlıkta Bodrum mahkemeleri yetkilidir.",
          ],
          en: [
            "Festival categories are determined by age group: F (ages 5–9), G (10–13), and H (14 and over).",
            "The festival is open to all instruments. For instruments other than piano, participants must bring their own instrument.",
            "Each participant may perform up to 2 works.",
            "Performance time is max 3 minutes in category F, max 4 minutes in G, and max 5 minutes in H. Durations are total performance time.",
            "Performances must be from memory; repeats indicated in the works will not be played.",
            "Applications are collected through the online form. The participation fee and payment details are in the relevant section of the festival page. The participant or guardian confirms the accuracy of the information.",
            "Every participant receives a participation certificate.",
            "All stages of the festival are open to the public and free to attend.",
            "Transport, accommodation, and meal expenses belong to the participants.",
            "Participants must be ready in the concert hall at least 30 minutes before their scheduled program time.",
            "Sheet music for the works must be handed to the festival registration desk.",
            "The organization reserves the right to change the program due to application volume or necessary circumstances.",
            "Participants permit the use of visual and audio material created during the festival for promotion and archive purposes.",
            "Bodrum courts have jurisdiction over any legal disputes arising from the festival.",
          ],
        },
      },
    ],
  },
  awards: {
    eyebrow: { tr: "Sertifikalar", en: "Certificates" },
    title: { tr: "Her katılımcıya sertifika", en: "A certificate for every participant" },
    note: {
      tr: "Festivalde birincilik, ikincilik veya üçüncülük sıralaması yapılmaz. Her kategorideki tüm katılımcılara katılım sertifikası verilir.",
      en: "There is no first, second, or third place ranking. Every participant in every category receives a participation certificate.",
    },
    items: [
      {
        id: "f",
        place: "F",
        title: { tr: "Katılım Sertifikası", en: "Participation Certificate" },
        description: {
          tr: "F kategorisindeki tüm katılımcılara katılım sertifikası verilir.",
          en: "Every participant in category F receives a participation certificate.",
        },
      },
      {
        id: "g",
        place: "G",
        title: { tr: "Katılım Sertifikası", en: "Participation Certificate" },
        description: {
          tr: "G kategorisindeki tüm katılımcılara katılım sertifikası verilir.",
          en: "Every participant in category G receives a participation certificate.",
        },
      },
      {
        id: "h",
        place: "H",
        title: { tr: "Katılım Sertifikası", en: "Participation Certificate" },
        description: {
          tr: "H kategorisindeki tüm katılımcılara katılım sertifikası verilir.",
          en: "Every participant in category H receives a participation certificate.",
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
      { id: "piano", role: { tr: "Enstrüman", en: "Instrument" }, name: { tr: "İsim açıklanacak", en: "Name to be announced" } },
      { id: "pedagogy", role: { tr: "Müzik Pedagojisi", en: "Music Pedagogy" }, name: { tr: "İsim açıklanacak", en: "Name to be announced" } },
      { id: "education", role: { tr: "Müzik Eğitimi", en: "Music Education" }, name: { tr: "İsim açıklanacak", en: "Name to be announced" } },
    ],
  },
  teachers: {
    eyebrow: { tr: "Öğretmenler", en: "Teachers" },
    title: { tr: "Emeği geçen öğretmenler", en: "Teachers who made it possible" },
    body: {
      tr: "Festivalde öğrencilerini hazırlayan öğretmenlerimize teşekkür ederiz. Kendilerine teşekkür belgeleri takdim edilecektir.",
      en: "We thank the teachers who prepared their students for the festival. They will receive certificates of appreciation.",
    },
    note: {
      tr: "Öğretmen listesi ve teşekkür belgesi programı yakında paylaşılacak.",
      en: "The teacher list and certificate program will be shared soon.",
    },
    emptyText: {
      tr: "Öğretmen listesi henüz yayınlanmadı.",
      en: "The teacher list has not been published yet.",
    },
    items: [
      {
        id: "teacher-1",
        name: { tr: "", en: "" },
        role: { tr: "", en: "" },
      },
    ],
  },
  payment: {
    eyebrow: { tr: "Katılım Ücreti", en: "Participation Fee" },
    title: { tr: "Katılım ücreti ve ödeme", en: "Participation fee and payment" },
    body: {
      tr: "Katılım ücreti ve banka bilgileri aşağıda yer alır. Ödeme yaparken açıklama kısmına çocuğun adı ve soyadını yazmayı unutmayın.",
      en: "The participation fee and bank details are below. When paying, remember to write the child's full name in the description.",
    },
    feeLabel: { tr: "Katılım ücreti", en: "Participation fee" },
    feeValue: { tr: "3.000 TL", en: "TRY 3,000" },
    bankLabel: { tr: "Banka", en: "Bank" },
    bankValue: { tr: "Duyurulacak", en: "To be announced" },
    accountNameLabel: { tr: "Hesap adı", en: "Account name" },
    accountNameValue: { tr: "Duyurulacak", en: "To be announced" },
    ibanLabel: { tr: "IBAN", en: "IBAN" },
    ibanValue: { tr: "TR__ ____ ____ ____ ____ ____ __", en: "TR__ ____ ____ ____ ____ ____ __" },
    receiptLabel: { tr: "Dekont gönderimi", en: "Receipt submission" },
    receiptValue: {
      tr: "Dekontunuzu başvuru sonrası festival ekibine iletin.",
      en: "Send your receipt to the festival team after applying.",
    },
    reminder: {
      tr: "Ödeme yaparken açıklama kısmına çocuğun adı ve soyadını yazmayı unutmayın.",
      en: "Remember to write the child's full name in the payment description.",
    },
    note: {
      tr: "Banka ve ödeme bilgileri yakında açıklanacak.",
      en: "Bank and payment details will be announced soon.",
    },
  },
  application: {
    eyebrow: { tr: "Başvuru", en: "Application" },
    title: { tr: "Genç müzisyenler için başvuru", en: "Application for young musicians" },
    body: {
      tr: "Başvurular online form ile alınır. Formda yaş, iletişim ve performans bilgilerinizi paylaşın; festival ekibi başvurunuzu değerlendirsin.",
      en: "Applications are collected through the online form. Share your age, contact, and performance details, and let the festival team review your application.",
    },
    image: "/forte/application-sheet.jpg",
    imageAlt: { tr: "Nota kitabı", en: "Sheet music" },
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
          tr: "Uygun bulunan genç yetenekler programa davet edilir.",
          en: "Selected young talents are invited to the program.",
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
        answer: {
          tr: "Evet, katılım ücreti 3.000 TL'dir. Banka ve ödeme bilgileri yakında açıklanacak.",
          en: "Yes, the participation fee is TRY 3,000. Bank and payment details will be announced soon.",
        },
      },
      {
        id: "who",
        question: { tr: "Kimler başvurabilir?", en: "Who can apply?" },
        answer: {
          tr: "Her enstrümandan genç müzisyenler ve müzik öğrencileri başvurabilir.",
          en: "Young musicians of all instruments and music students can apply.",
        },
      },
      {
        id: "instruments",
        question: { tr: "Hangi enstrümanlar kabul ediliyor?", en: "Which instruments are accepted?" },
        answer: {
          tr: "Her enstrüman kabul edilmektedir. Piyano dışındaki enstrümanlar için müzisyenin kendi enstrümanını yanında getirmesi gerekir.",
          en: "All instruments are accepted. For instruments other than piano, musicians must bring their own instrument.",
        },
      },
      {
        id: "categories",
        question: { tr: "Kategoriler nasıl belirlenir?", en: "How are categories determined?" },
        answer: {
          tr: "Yaş gruplarına göre: F 5–9, G 10–13, H 14 yaş ve üzeri.",
          en: "By age group: F 5–9, G 10–13, H 14 and over.",
        },
      },
      {
        id: "duration",
        question: { tr: "Performans süresi ne kadar?", en: "How long is the performance?" },
        answer: {
          tr: "F kategorisi en fazla 3 dakika; G kategorisi en fazla 4 dakika; H kategorisi en fazla 5 dakika. Süreler toplam performans süresidir.",
          en: "Category F is max 3 minutes; G is max 4 minutes; H is max 5 minutes. Durations are total performance time.",
        },
      },
      {
        id: "works",
        question: { tr: "Kaç eser çalabilirim?", en: "How many works can I perform?" },
        answer: {
          tr: "Her katılımcı en fazla 2 eser seslendirebilir.",
          en: "Each participant may perform up to 2 works.",
        },
      },
      {
        id: "memory",
        question: { tr: "Eserleri ezber mi çalmalıyım?", en: "Do I have to perform from memory?" },
        answer: {
          tr: "Evet, performanslar ezber çalınır. Eser notalarını kayıt masasına elden teslim etmelisiniz.",
          en: "Yes, performances are from memory. You must hand your sheet music to the registration desk.",
        },
      },
      {
        id: "certificate",
        question: { tr: "Sertifika veriliyor mu?", en: "Is a certificate given?" },
        answer: {
          tr: "Evet, festivalde derece sıralaması yapılmaz; her katılımcıya katılım sertifikası verilir.",
          en: "Yes, there is no ranking; every participant receives a participation certificate.",
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
    brand: { tr: "Multi Event", en: "Multi Event" },
    handle: { tr: "@multieventorg", en: "@multieventorg" },
    items: [
      {
        id: "keys",
        imageUrl: "/forte/gallery-keys.jpg",
        alt: { tr: "Piyano tuşları", en: "Piano keys" },
      },
      {
        id: "hands",
        imageUrl: "/forte/gallery-hands.jpg",
        alt: { tr: "Piyano performansı", en: "Piano performance" },
      },
      {
        id: "stage",
        imageUrl: "/forte/gallery-stage.jpg",
        alt: { tr: "Sahne ve piyano", en: "Stage and piano" },
      },
      {
        id: "sheet-music",
        imageUrl: "/forte/gallery-sheet.jpg",
        alt: { tr: "Nota kitabı", en: "Sheet music" },
      },
    ],
  },
  contact: {
    title: { tr: "Sorularınız için bize ulaşın", en: "Contact us with your questions" },
    body: {
      tr: "Başvuru ve festival hakkında detaylı bilgi için Multi Event ekibiyle iletişime geçebilirsiniz.",
      en: "Contact the Multi Event team for more information about the application and the festival.",
    },
    phone: "+90 532 789 10 80",
    email: "mehmet.emire@multievent.org",
    instagram: "https://www.instagram.com/multieventorg/",
    instagramLabel: { tr: "Instagram", en: "Instagram" },
  },
} as const;

export type ForteFestivalContent = typeof forteFestivalContent;

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
