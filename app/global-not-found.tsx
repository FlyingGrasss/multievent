import type { Metadata } from "next";
import Link from "next/link";
import SiteDocument from "@/components/SiteDocument";
import "@/app/globals.css";

export const metadata: Metadata = {
  title: "Page not found | Multi Event",
};

export default function GlobalNotFound() {
  return (
    <SiteDocument locale="en">
      <main className="flex min-h-[70vh] flex-col items-center justify-center px-6 pt-28 text-center">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-white/55">404</p>
        <h1 className="text-4xl font-semibold text-white sm:text-6xl">Page not found</h1>
        <p className="mt-5 max-w-md text-white/65">
          The page you are looking for may have moved or no longer exists.
        </p>
        <Link
          className="mt-8 rounded-full border border-white/25 px-6 py-3 text-sm font-semibold text-white transition hover:border-white hover:bg-white hover:text-black"
          href="/"
        >
          Return home
        </Link>
      </main>
    </SiteDocument>
  );
}
