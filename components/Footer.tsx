"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Localized } from "@/components/Localized";
import { useLanguage } from "@/components/LanguageProvider";

export default function Footer() {
  const pathname = usePathname();
  const { locale } = useLanguage();
  if (pathname?.startsWith("/admin") || pathname?.startsWith("/api")) return null;
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-[#0C0C0C] pb-4 pt-12">
      <div className="container mx-auto">
        <div className="mb-12 grid grid-cols-1 gap-8 px-4 md:grid-cols-3">
          <div className="flex flex-col sm:items-center">
            <h2 className="mb-6 text-2xl font-bold text-accent max-sm:mb-4 max-sm:text-lg"><Localized tr="Sosyal medya" en="Socials" /></h2>
            <div className="flex gap-6 max-sm:gap-4">
              <a href="https://www.instagram.com/multieventorg/" aria-label="Instagram" className="transition-opacity hover:opacity-80" target="_blank" rel="noopener noreferrer"><Image src="/instagram.svg" width={40} height={40} alt="" /></a>
              <a href="https://www.facebook.com/" aria-label="Facebook" className="transition-opacity hover:opacity-80" target="_blank" rel="noopener noreferrer"><Image src="/facebook.svg" width={40} height={40} alt="" /></a>
            </div>
          </div>
          <div className="flex flex-col sm:items-center">
            <h2 className="mb-6 text-2xl font-bold text-accent max-sm:mb-4 max-sm:text-lg"><Localized tr="İletişim" en="Contact" /></h2>
            <div className="space-y-4 text-center max-sm:text-left">
              <a href="tel:+905309576977" className="flex items-center justify-center gap-3 text-lg text-accent hover:underline max-sm:justify-start"><Image src="/phone.svg" width={24} height={24} alt="" />+90 530 957 69 77</a>
              <a href="mailto:sonertirgil@multievent.org" className="flex items-center justify-center gap-3 break-all text-lg text-accent hover:underline max-sm:justify-start"><Image src="/mail.svg" width={24} height={24} alt="" />sonertirgil@multievent.org</a>
            </div>
          </div>
          <div className="flex flex-col sm:items-center">
            <h2 className="mb-6 text-2xl font-bold text-accent max-sm:mb-4 max-sm:text-lg"><Localized tr="Hizmetlerimiz" en="Services" /></h2>
            <div className="flex flex-col gap-3 sm:items-center">
              <Link href={`/${locale}/services`} className="text-lg text-accent hover:underline"><Localized tr="Tüm hizmetleri gör" en="View all services" /></Link>
              <Link href={`/${locale}/events`} className="text-lg text-accent hover:underline"><Localized tr="Etkinliklerimizi görün" en="View our events" /></Link>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center border-t border-[#2A2A2A] pt-4 text-center">
          <div className="mb-1 flex w-full items-center justify-center gap-3 px-4 max-sm:max-w-[390px]">
            <Image src="/location.svg" width={24} height={24} alt="" />
            <address className="not-italic text-sm sm:text-base"><Localized tr="Konacık Mahallesi Atatürk Bulvarı Pamir İş Merkezi No: 114-C Daire No: 8 Bodrum/Muğla" en="Konacık Mahallesi Atatürk Bulvarı Pamir İş Merkezi No: 114-C Daire No: 8 Bodrum/Muğla" /></address>
          </div>
          <p className="text-xl font-bold max-sm:text-base">Multi Event © {currentYear}</p>
        </div>
      </div>
    </footer>
  );
}
