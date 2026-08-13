"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminSignIn() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);
    try {
      const data = new FormData(event.currentTarget);
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: String(data.get("password") || "") }),
      });
      if (!response.ok) throw new Error(response.status === 503 ? "Admin şifresi yapılandırılmamış." : "Şifre hatalı.");
      router.replace("/admin");
      router.refresh();
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Giriş yapılamadı.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#0C0C0C] px-4 text-white">
      <form onSubmit={submit} className="w-full max-w-md space-y-5 rounded-2xl border border-white/15 bg-[#121212] p-8">
        <div><p className="text-sm uppercase tracking-[0.25em] text-accent">Multi Event</p><h1 className="mt-2 text-3xl font-bold">Yönetim paneli</h1><p className="mt-2 text-sm text-white/60">Devam etmek için yönetici şifresini girin.</p></div>
        {error && <p role="alert" className="rounded-lg bg-red-950 p-3 text-sm text-red-200">{error}</p>}
        <label className="block"><span className="mb-2 block text-sm">Şifre</span><input name="password" type="password" autoComplete="current-password" required className="w-full rounded-lg border border-white/15 bg-black p-3 outline-none focus:border-accent" /></label>
        <button type="submit" disabled={isSubmitting} className="w-full cursor-pointer rounded-lg bg-accent p-3 font-semibold text-black transition-opacity disabled:cursor-default disabled:opacity-60">{isSubmitting ? "Giriş yapılıyor…" : "Giriş yap"}</button>
      </form>
    </main>
  );
}
