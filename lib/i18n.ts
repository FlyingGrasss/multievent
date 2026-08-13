import type { Locale } from "@/types";

export const translations = {
  tr: {
    home: "Ana sayfa",
    artists: "Sanatçılarımız",
    services: "Hizmetlerimiz",
    contact: "İletişim",
    contactUs: "Bize ulaşın",
    seeAll: "Tümünü gör",
    socials: "Sosyal medya",
    viewAllServices: "Tüm hizmetleri gör",
    phone: "Telefon",
    email: "E-posta",
    location: "Adres",
    sendMessage: "Bize mesaj gönderin",
    sending: "Gönderiliyor…",
    messageSent: "Mesajınız başarıyla gönderildi.",
    messageFailed: "Mesaj gönderilemedi. Lütfen tekrar deneyin.",
    name: "Adınız",
    subject: "Konu",
    message: "Mesajınız",
    eventPlanning: "Bodrum etkinlik organizasyon",
    admin: "Yönetim paneli",
    signOut: "Çıkış yap",
  },
  en: {
    home: "Home",
    artists: "Our artists",
    services: "Services",
    contact: "Contact",
    contactUs: "Contact us",
    seeAll: "See all",
    socials: "Socials",
    viewAllServices: "View all services",
    phone: "Phone",
    email: "Email",
    location: "Location",
    sendMessage: "Send us a message",
    sending: "Sending…",
    messageSent: "Your message was sent successfully.",
    messageFailed: "We couldn't send your message. Please try again.",
    name: "Name",
    subject: "Subject",
    message: "Message",
    eventPlanning: "Bodrum event planning",
    admin: "Admin panel",
    signOut: "Sign out",
  },
} as const;

export type TranslationKey = keyof typeof translations.en;

export function t(locale: Locale, key: TranslationKey) {
  return translations[locale][key];
}
