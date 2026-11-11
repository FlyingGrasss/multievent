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
      tr: "Formu 20 Aralık 2026'ya kadar doldurabilirsiniz.",
      en: "You can complete the form until 20 December 2026.",
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
    value: { tr: "20 Aralık 2026", en: "20 December 2026" },
    note: { tr: "Başvurular 20 Aralık 2026'da kapanıyor.", en: "Applications close on 20 December 2026." },
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
        tr: "",
        en: "",
      },
    ],
    image: "/forte/about-hands.jpg",
    imageAlt: { tr: "Piyano çalan eller", en: "Hands playing piano" },
    stats: [
      { id: "stat-1", value: "", label: { tr: "", en: "" } },
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
    nameLabel: { tr: "Öğrenci / Stüdyo / Okul", en: "Student / Studio / School" },
    categoryLabel: { tr: "Kategori", en: "Category" },
    songsLabel: { tr: "Eserler ve süre", en: "Works and duration" },
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
  gala: {
    eyebrow: { tr: "Gala Konseri", en: "Gala Concert" },
    title: { tr: "Gala konseri ve ilk 15", en: "Gala concert and the top 15" },
    body: {
      tr: "Festivalde en iyi performansı sergileyen ilk 15 katılımcı, gala konserinde sahne alma hakkı kazanır. Bu katılımcılara sponsor tarafından hediye takdim edilecektir.",
      en: "The top 15 participants with the best performances at the festival earn the right to perform at the gala concert. These participants will receive a gift from the sponsor.",
    },
    note: {
      tr: "Gala konseri festival kapanışında gerçekleştirilecektir.",
      en: "The gala concert will take place at the festival closing.",
    },
    items: [
      {
        id: "top-15",
        value: "15",
        title: { tr: "İlk 15 katılımcı", en: "Top 15 participants" },
        description: {
          tr: "En iyi performansı sergileyen ilk 15 katılımcı.",
          en: "The top 15 participants with the best performances.",
        },
      },
      {
        id: "gala-stage",
        value: "Gala",
        title: { tr: "Gala sahnesi", en: "Gala stage" },
        description: {
          tr: "Gala konserinde sahne alma hakkı.",
          en: "The right to perform at the gala concert.",
        },
      },
      {
        id: "sponsor-gift",
        value: "🎁",
        title: { tr: "Sponsor hediyesi", en: "Sponsor gift" },
        description: {
          tr: "Sponsor tarafından hediye takdimi.",
          en: "A gift presented by the sponsor.",
        },
      },
    ],
  },
  jury: {
    eyebrow: { tr: "Jüri", en: "Jury" },
    title: { tr: "Jüri üyeleri", en: "Jury members" },
    note: {
      tr: "1. Bodrum Forte Müzik Festivali jüri üyeleri. Diğer jüri üyeleri kesinleştikçe eklenecektir.",
      en: "Jury members of the 1st Bodrum Forte Music Festival. Additional members will be added as confirmed.",
    },
    members: [
      {
        id: "kateryna-saat",
        name: { tr: "Kateryna Saat", en: "Kateryna Saat" },
        role: {
          tr: "Jüri Üyesi | Piyanist | Orgcu | Eşlikçi | Müzik Eğitimcisi",
          en: "Jury Member | Pianist | Organist | Accompanist | Music Educator",
        },
        image: "/forte/jury-kateryna-saat.jpg",
        bio: {
          tr: "Kateryna Saat, Ukrayna'nın önde gelen müzik eğitim kurumlarından biri olan S. S. Prokofiev Devlet Müzik Akademisi (Konservatuvarı) mezunudur.\n\nPiyanist, org sanatçısı, eşlikçi ve deneyimli bir müzik eğitimcisi olan Kateryna Saat, sanat hayatını konser faaliyetleri, pedagojik çalışmalar ve kültürel projelerle aktif bir şekilde sürdürmektedir.\n\n12 yıllık mesleki ve pedagojik deneyime sahip olan sanatçı, genç müzisyenlerin yetişmesine ve sanatsal gelişimlerine önemli katkılarda bulunmaktadır. Öğrencileri ulusal ve uluslararası yarışmalarda ödüller kazanmakta; konservatuvarlara, müzik üniversitelerine ve uzmanlaşmış müzik liselerine kabul edilmektedir.\n\nSanatsal faaliyetlerinin yanı sıra müzik kültürünün gelişmesine, genç yeteneklerin desteklenmesine ve müzik eğitiminin yaygınlaştırılmasına yönelik çalışmalarda aktif rol almaktadır.\n\nKateryna Saat, sahip olduğu akademik birikim, sahne deneyimi ve pedagojik yaklaşımıyla genç müzisyenlerin sanatsal gelişimine katkı sunmaya devam etmektedir.\n\n1. Bodrum Forte Müzik Festivali Jüri Üyesi",
          en: "Kateryna Saat is a graduate of the S. S. Prokofiev State Music Academy (Conservatory), one of Ukraine's leading music education institutions.\n\nA pianist, organist, accompanist, and experienced music educator, Kateryna Saat actively continues her artistic career through concert activities, pedagogical work, and cultural projects.\n\nWith 12 years of professional and pedagogical experience, she has made significant contributions to the training and artistic development of young musicians. Her students win awards at national and international competitions and are accepted into conservatories, music universities, and specialized music high schools.\n\nAlongside her artistic activities, she takes an active role in efforts to develop music culture, support young talent, and broaden access to music education.\n\nWith her academic background, stage experience, and pedagogical approach, Kateryna Saat continues to contribute to the artistic development of young musicians.\n\nJury Member, 1st Bodrum Forte Music Festival",
        },
      },
      {
        id: "darina-tirgil",
        name: { tr: "Darina Tirgil", en: "Darina Tirgil" },
        role: {
          tr: "Jüri Üyesi | Çellist | Piyanist | Sanatçı | Müzik Eğitimcisi",
          en: "Jury Member | Cellist | Pianist | Artist | Music Educator",
        },
        image: "/forte/jury-darina-tirgil.png",
        bio: {
          tr: "Darina Tirgil, Rusya'da konservatuvar eğitimi almış, çello ve piyano alanlarında uzmanlaşmış bir sanatçı ve müzik eğitimcisidir.\n\nSanat yaşamını hem sahne performansları hem de pedagojik çalışmalarıyla aktif bir şekilde sürdürmektedir.\n\nEğitimcilik kariyeri boyunca yetiştirdiği öğrenciler ulusal ve uluslararası müzik yarışmalarında ödüller kazanmış, müzik kolejlerine başarılı bir şekilde kabul edilmiştir.\n\nDarina Tirgil, Türkiye'de aktif konser çalışmalarına devam etmekte; solo sanatçı olarak, oda müziği toplulukları ve orkestralar eşliğinde sahne almaktadır.\n\nSanatsal kariyeri boyunca Makao, Norveç, Güney Kore, Tayland, Rusya, Hindistan ve Türkiye'de düzenlenen festivallere katılmış, uluslararası sahnelerde performanslar sergilemiştir.\n\nUluslararası sahne deneyimi, sanatsal birikimi ve pedagojik tecrübesiyle genç müzisyenlerin gelişimine katkıda bulunan Darina Tirgil, müzik dünyasındaki çalışmalarını başarıyla sürdürmektedir.\n\n1. Bodrum Forte Müzik Festivali Jüri Üyesi",
          en: "Darina Tirgil is an artist and music educator who studied at a conservatory in Russia and specializes in cello and piano.\n\nShe actively continues her artistic life through both stage performances and pedagogical work.\n\nThroughout her teaching career, her students have won awards at national and international music competitions and have been successfully accepted into music colleges.\n\nDarina Tirgil continues her active concert work in Türkiye, performing as a soloist and with chamber music ensembles and orchestras.\n\nThroughout her artistic career, she has participated in festivals in Macau, Norway, South Korea, Thailand, Russia, India, and Türkiye, performing on international stages.\n\nWith her international stage experience, artistic background, and pedagogical expertise, Darina Tirgil contributes to the development of young musicians and continues her work in the music world successfully.\n\nJury Member, 1st Bodrum Forte Music Festival",
        },
      },
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
      tr: "Katılım ücreti 3.000 TL'dir. Ödeme, aşağıdaki şirket hesabına yapılır. Velilere e-arşiv fatura düzenleneceği için ödeme açıklamasına istenen bilgileri eksiksiz yazın.",
      en: "The participation fee is TRY 3,000. Payment is made to the company account below. An e-invoice will be issued to parents, so enter the requested information in the payment description.",
    },
    feeLabel: { tr: "Katılım ücreti", en: "Participation fee" },
    feeValue: { tr: "3.000 TL", en: "TRY 3,000" },
    bankLabel: { tr: "Banka", en: "Bank" },
    bankValue: { tr: "Garanti BBVA", en: "Garanti BBVA" },
    branchLabel: { tr: "Şube", en: "Branch" },
    branchValue: { tr: "Bodrum", en: "Bodrum" },
    accountNameLabel: { tr: "Hesap adı", en: "Account name" },
    accountNameValue: {
      tr: "MULTI EVENT ORGANİZASYON TURİZM SANAYİ VE TİCARET LİMİTED ŞİRKETİ",
      en: "MULTI EVENT ORGANİZASYON TURİZM SANAYİ VE TİCARET LİMİTED ŞİRKETİ",
    },
    ibanLabel: { tr: "IBAN", en: "IBAN" },
    ibanValue: {
      tr: "TR45 0006 2000 3090 0006 2884 28",
      en: "TR45 0006 2000 3090 0006 2884 28",
    },
    receiptLabel: { tr: "Dekont yükleme", en: "Receipt upload" },
    descriptionLabel: { tr: "Ödeme açıklaması", en: "Payment description" },
    receiptValue: {
      tr: "Dekontunuzu başvuru formundaki “Ödeme dekontu” alanına yükleyin.",
      en: "Upload your receipt in the “Payment receipt” field of the application form.",
    },
    reminder: {
      tr: "BODRUM FORTE MÜZİK FESTİVALİ – Müzisyen Ad Soyad – Veli Ad Soyad – Veli T.C. Kimlik No",
      en: "BODRUM FORTE MÜZİK FESTİVALİ – Müzisyen Ad Soyad – Veli Ad Soyad – Veli T.C. Kimlik No",
    },
    note: {
      tr: "Ödeme dekontunuzu başvuru formuna yüklemeyi unutmayın.",
      en: "Remember to upload your payment receipt in the application form.",
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
          tr: "Evet, katılım ücreti 3.000 TL'dir. Banka bilgileri ve ödeme açıklaması “Katılım Ücreti ve Ödeme” bölümünde yer alır.",
          en: "Yes, the participation fee is TRY 3,000. Bank details and the payment description are in the “Participation Fee and Payment” section.",
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
      {
        id: "deadline",
        question: { tr: "Başvuru son tarihi ne zaman?", en: "When is the application deadline?" },
        answer: {
          tr: "Başvurular 20 Aralık 2026'da kapanıyor.",
          en: "Applications close on 20 December 2026.",
        },
      },
      {
        id: "gala",
        question: { tr: "Gala konseri nedir?", en: "What is the gala concert?" },
        answer: {
          tr: "En iyi performansı sergileyen ilk 15 katılımcı gala konserinde sahne alır ve sponsor tarafından hediye ile ödüllendirilir.",
          en: "The top 15 participants with the best performances perform at the gala concert and receive a gift from the sponsor.",
        },
      },
      {
        id: "receipt",
        question: { tr: "Ödeme dekontunu nasıl ileteceğim?", en: "How do I submit the payment receipt?" },
        answer: {
          tr: "Başvuru formundaki “Ödeme dekontu” alanına dekontunuzu resim veya PDF olarak yükleyin.",
          en: "Upload your receipt as an image or PDF in the “Payment receipt” field of the application form.",
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
