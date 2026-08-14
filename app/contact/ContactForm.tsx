"use client";

import Image from "next/image";
import { FormEvent, useState } from "react";
import { Localized } from "@/components/Localized";

type Message = { text: string; type: "success" | "error" } | null;

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<Message>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setMessage(null);
    const form = new FormData(event.currentTarget);
    try {
      const response = await fetch("/api/contact", { method: "POST", body: JSON.stringify(Object.fromEntries(form)), headers: { "Content-Type": "application/json" } });
      if (!response.ok) throw new Error("Request failed");
      event.currentTarget.reset();
      setMessage({ type: "success", text: "Mesajınız başarıyla gönderildi." });
    } catch {
      setMessage({ type: "error", text: "Mesaj gönderilemedi. Lütfen tekrar deneyin." });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="mx-auto max-w-4xl px-4 pb-12 sm:pb-20">
      <h1 className="mt-12 text-center text-4xl font-bold sm:mt-16 sm:text-6xl"><Localized tr="İletişim" en="Contact us" /></h1>
      <div className="mt-8 grid grid-cols-1 gap-3 sm:mt-16 sm:grid-cols-3 sm:gap-8">
        <div className="flex flex-col items-center rounded-lg border border-accent bg-[#121212] p-4 text-center"><Image src="/phone.svg" width={48} height={48} alt="" className="mb-3 h-10 w-10" /><h2 className="text-xl font-medium"><Localized tr="Telefon" en="Phone" /></h2><a href="tel:+905309576977" className="text-accent hover:underline">+90 530 957 69 77</a></div>
        <div className="flex flex-col items-center rounded-lg border border-accent bg-[#121212] p-4 text-center"><Image src="/mail.svg" width={48} height={48} alt="" className="mb-3 h-10 w-10" /><h2 className="text-xl font-medium"><Localized tr="E-posta" en="Email" /></h2><a href="mailto:sonertirgil@multievent.org" className="break-all text-accent hover:underline">sonertirgil@multievent.org</a></div>
        <div className="flex flex-col items-center rounded-lg border border-accent bg-[#121212] p-4 text-center"><Image src="/location.svg" width={48} height={48} alt="" className="mb-3 h-10 w-10" /><h2 className="text-xl font-medium"><Localized tr="Adres" en="Location" /></h2><address className="not-italic text-sm">Konacık Mahallesi Atatürk Bulvarı Pamir İş Merkezi No: 114-C Daire No: 8 Bodrum/Muğla</address><a href="https://maps.app.goo.gl/bQyWuDxDwjcD2HJH7?g_st=ac" target="_blank" rel="noopener noreferrer" className="mt-2 text-sm text-accent hover:underline"><Localized tr="Google Haritalar'da aç" en="Open in Google Maps" /></a></div>
      </div>
      <div className="mt-12 rounded-lg border border-accent bg-[#121212] p-6 sm:mt-20 sm:p-8">
        <h2 className="mb-6 text-center text-2xl font-bold sm:mb-8 sm:text-3xl"><Localized tr="Bize mesaj gönderin" en="Send us a message" /></h2>
        {message && <div role="status" className={`mb-6 rounded-lg p-4 text-center ${message.type === "success" ? "bg-green-900 text-green-300" : "bg-red-900 text-red-300"}`}><Localized tr={message.text} en={message.type === "success" ? "Your message was sent successfully." : "We couldn't send your message. Please try again."} /></div>}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <label className="block"><span className="mb-2 block"><Localized tr="Adınız" en="Name" /></span><input type="text" name="name" maxLength={100} className="w-full rounded-lg border border-[#2A2A2A] bg-[#0C0C0C] p-3 focus:border-accent focus:outline-none" required /></label>
            <label className="block"><span className="mb-2 block"><Localized tr="E-posta" en="Email" /></span><input type="email" name="email" maxLength={200} className="w-full rounded-lg border border-[#2A2A2A] bg-[#0C0C0C] p-3 focus:border-accent focus:outline-none" required /></label>
          </div>
          <label className="block"><span className="mb-2 block"><Localized tr="Konu" en="Subject" /></span><input type="text" name="subject" maxLength={200} className="w-full rounded-lg border border-[#2A2A2A] bg-[#0C0C0C] p-3 focus:border-accent focus:outline-none" required /></label>
          <label className="block"><span className="mb-2 block"><Localized tr="Mesajınız" en="Message" /></span><textarea name="message" rows={5} maxLength={5000} className="w-full rounded-lg border border-[#2A2A2A] bg-[#0C0C0C] p-3 focus:border-accent focus:outline-none" required /></label>
          <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
          <button type="submit" disabled={isSubmitting} className="w-full rounded-lg bg-accent px-8 py-3 font-medium text-[#0C0C0C] transition-colors hover:bg-[#4EFEBE]/90 sm:w-auto"><Localized tr={isSubmitting ? "Gönderiliyor…" : "Mesajı gönder"} en={isSubmitting ? "Sending…" : "Send message"} /></button>
        </form>
      </div>
    </main>
  );
}
