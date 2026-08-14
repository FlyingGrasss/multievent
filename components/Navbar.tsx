"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { useLanguage } from "@/components/LanguageProvider";
import { Localized } from "@/components/Localized";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { locale } = useLanguage();
  const localeRoot = `/${locale}`;

  if (pathname?.startsWith("/admin") || pathname?.startsWith("/api")) return null;

  const links = [
    { href: localeRoot, tr: "Ana sayfa", en: "Home" },
    { href: `${localeRoot}/team`, tr: "Sanatçılarımız", en: "Our artists" },
    { href: `${localeRoot}/services`, tr: "Hizmetlerimiz", en: "Services" },
    { href: `${localeRoot}/events`, tr: "Etkinliklerimiz", en: "Our events" },
    { href: `${localeRoot}/contact`, tr: "İletişim", en: "Contact" },
  ];

  return (
    <header className="relative z-30 grid h-20 w-full grid-cols-3 items-center bg-linear-to-b from-[#2e2d2c] to-[#121315] px-4 text-white">
      <Link href={localeRoot} className="w-fit justify-self-start" aria-label="Multi Event">
        <Image src="/logo.jpeg" width={60} height={59} alt="Multi Event logo" className="rounded" priority />
      </Link>

      <Link href={localeRoot} className="whitespace-nowrap justify-self-center text-center" aria-label="Multi Event Organization">
        <h1 className="mt-2 text-3xl font-medium leading-[25px] max-sm:text-[24px] max-sm:leading-5">
          MULTI <span className="pl-2">EVENT</span><br />
          <span className="text-xl font-extralight italic tracking-widest max-sm:text-[14px] max-sm:leading-5">ORGANİZASYON</span>
        </h1>
      </Link>

      <div className="flex items-center gap-3 justify-self-end">
        <LanguageSwitcher />
        <button
          type="button"
          onClick={() => setIsOpen((open) => !open)}
          className="z-50 cursor-pointer focus:outline-none"
          aria-label="Toggle menu"
          aria-expanded={isOpen}
        >
          <Image src="/hamburger.svg" width={36} height={36} alt="Menu" priority />
        </button>
      </div>

      {isOpen && <button type="button" className="fixed inset-0 z-40 bg-black/60" onClick={() => setIsOpen(false)} aria-label="Close menu" />}
      <nav className={`fixed right-0 top-0 z-50 h-full w-72 bg-[#121212] transition-transform duration-300 ${isOpen ? "translate-x-0" : "translate-x-full"}`} aria-label="Main navigation">
        <div className="flex h-full flex-col gap-1 px-6 pt-24">
          {links.map((link) => (
            <Link key={link.href} href={link.href} onClick={() => setIsOpen(false)} className="border-b border-[#2A2A2A] py-4 text-2xl transition-colors hover:text-accent">
              <Localized tr={link.tr} en={link.en} />
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
