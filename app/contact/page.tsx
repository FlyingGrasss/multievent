import type { Metadata } from "next";
import ContactForm from "@/app/contact/ContactForm";

export const metadata: Metadata = {
  title: "İletişim – Bodrum Etkinlik Teklifi",
  description: "Bodrum etkinlik organizasyon ve canlı müzik teklifiniz için Multi Event ile iletişime geçin.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "İletişim – Bodrum Etkinlik Teklifi | Multi Event",
    description: "Bodrum etkinlik organizasyon ve canlı müzik teklifiniz için Multi Event ile iletişime geçin.",
    url: "/contact",
  },
};

export default function ContactPage() {
  return <ContactForm />;
}
