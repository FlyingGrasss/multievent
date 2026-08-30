import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
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
  );
}
