"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  DndContext,
  DragEndEvent,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { ArtistType, ServiceType } from "@/types";
import type { EventType } from "@/types";
import type { TodoType } from "@/types";
import EventManager from "@/app/admin/EventManager";
import TodoManager from "@/app/admin/TodoManager";
import {
  deleteArtist,
  deleteService,
  reorderArtists,
  reorderServices,
  saveArtist,
  saveService,
} from "@/app/admin/actions";

export type AdminTab = "artists" | "services" | "events" | "todos";

const tabQuery: Record<AdminTab, string> = { artists: "sanatcilar", services: "hizmetler", events: "etkinlikler", todos: "yapilacaklar" };

type Props = {
  userName: string;
  initialArtists: ArtistType[];
  initialServices: ServiceType[];
  initialEvents: EventType[];
  initialTodos: TodoType[];
  initialTab: AdminTab;
};
type Modal = { kind: "artist" | "service"; item?: ArtistType | ServiceType } | null;

function SortableRow({ id, children }: { id: string; children: React.ReactNode }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });
  return (
    <li ref={setNodeRef} style={{ transform: CSS.Transform.toString(transform), transition }} className={`flex items-center gap-3 rounded-xl border border-white/10 bg-[#121212] p-3 ${isDragging ? "relative z-10 opacity-70" : ""}`}>
      <button type="button" {...attributes} {...listeners} className="cursor-grab touch-none rounded p-2 text-xl text-white/50 hover:text-accent" aria-label="Sıralamayı değiştirmek için sürükleyin">⠿</button>
      {children}
    </li>
  );
}

function Field({ label, name, defaultValue, textarea }: { label: string; name: string; defaultValue?: string; textarea?: boolean }) {
  return (
    <label className="block text-sm">
      <span className="mb-1 block text-white/70">{label}</span>
      {textarea ? <textarea name={name} defaultValue={defaultValue} rows={3} className="w-full rounded-lg border border-white/15 bg-black p-3 outline-none focus:border-accent" /> : <input name={name} defaultValue={defaultValue} className="w-full rounded-lg border border-white/15 bg-black p-3 outline-none focus:border-accent" required={name !== "link" && name !== "icon"} />}
    </label>
  );
}

function EditModal({ modal, onClose, onSaved }: { modal: NonNullable<Modal>; onClose: () => void; onSaved: () => void }) {
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState("");
  const isArtist = modal.kind === "artist";
  const item = modal.item as ArtistType | ServiceType | undefined;
  const [imageUrl, setImageUrl] = useState(isArtist ? (item as ArtistType | undefined)?.imageUrl || "" : "");

  async function uploadImage(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    setIsUploading(true);
    setError("");
    try {
      const body = new FormData();
      body.set("file", file);
      const response = await fetch("/api/admin/upload", { method: "POST", body });
      const result = await response.json() as { url?: string; error?: string };
      if (!response.ok || !result.url) throw new Error(result.error || "Görsel yüklenemedi.");
      setImageUrl(result.url);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Görsel yüklenemedi.");
      event.target.value = "";
    } finally {
      setIsUploading(false);
    }
  }

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSaving(true);
    setError("");
    try {
      await (isArtist ? saveArtist : saveService)(new FormData(event.currentTarget));
      onSaved();
      onClose();
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Kaydetme başarısız.");
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4" role="dialog" aria-modal="true" aria-labelledby="edit-title">
      <div className="max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-2xl border border-white/15 bg-[#171717] p-6">
        <div className="mb-5 flex items-center justify-between"><h2 id="edit-title" className="text-2xl font-bold">{isArtist ? "Sanatçı" : "Hizmet"} düzenle</h2><button type="button" onClick={onClose} className="text-2xl text-white/60 hover:text-white" aria-label="Kapat">×</button></div>
        {error && <p role="alert" className="mb-4 rounded-lg bg-red-950 p-3 text-sm text-red-200">{error}</p>}
        <form onSubmit={submit} className="space-y-4">
          <input type="hidden" name="id" value={item?.id || ""} />
          {isArtist ? <><Field label="Türkçe ad" name="nameTr" defaultValue={(item as ArtistType | undefined)?.nameTr} /><Field label="English name" name="nameEn" defaultValue={(item as ArtistType | undefined)?.nameEn} /><div className="block text-sm"><span className="mb-1 block text-white/70">Görsel yükle</span><input type="file" accept="image/jpeg,image/png,image/webp,image/avif" onChange={uploadImage} disabled={isUploading} className="w-full rounded-lg border border-white/15 bg-black p-3 file:mr-3 file:rounded file:border-0 file:bg-accent file:px-3 file:py-2 file:font-semibold file:text-black" />{isUploading && <p className="mt-2 text-xs text-white/60">Görsel yükleniyor…</p>}{imageUrl && <div className="mt-3 flex items-center gap-3"><Image src={imageUrl} alt="Seçilen sanatçı görseli" width={64} height={64} className="h-16 w-16 rounded-lg object-cover" /><span className="truncate text-xs text-white/50">Vercel Blob görseli hazır</span></div>}<input type="hidden" name="imageUrl" value={imageUrl} /></div><Field label="Sanatçı bağlantısı (opsiyonel)" name="link" defaultValue={(item as ArtistType | undefined)?.link || ""} /></> : <><Field label="Türkçe başlık" name="titleTr" defaultValue={(item as ServiceType | undefined)?.titleTr} /><Field label="English title" name="titleEn" defaultValue={(item as ServiceType | undefined)?.titleEn} /><Field label="Türkçe açıklama" name="descriptionTr" defaultValue={(item as ServiceType | undefined)?.descriptionTr || ""} textarea /><Field label="English description" name="descriptionEn" defaultValue={(item as ServiceType | undefined)?.descriptionEn || ""} textarea /><Field label="İkon / emoji" name="icon" defaultValue={(item as ServiceType | undefined)?.icon || ""} /></>}
          <label className="flex items-center gap-2 text-sm"><input type="checkbox" name="active" value="true" defaultChecked={item ? item.active : true} /> Yayında</label>
          <div className="flex justify-end gap-3 pt-3"><button type="button" onClick={onClose} className="rounded-lg border border-white/20 px-4 py-2">Vazgeç</button><button disabled={isSaving || isUploading || (isArtist && !imageUrl)} className="rounded-lg bg-accent px-5 py-2 font-semibold text-black disabled:opacity-60">{isUploading ? "Görsel yükleniyor…" : isSaving ? "Kaydediliyor…" : "Kaydet"}</button></div>
        </form>
      </div>
    </div>
  );
}

function RowActions({ onEdit, onDelete }: { onEdit: () => void; onDelete: () => void }) {
  return <div className="flex shrink-0 gap-2"><button type="button" onClick={onEdit} className="rounded-lg border border-white/20 px-3 py-2 text-sm hover:border-accent hover:text-accent">Düzenle</button><button type="button" onClick={onDelete} className="rounded-lg border border-red-400/40 px-3 py-2 text-sm text-red-300 hover:bg-red-950">Sil</button></div>;
}

export default function AdminDashboard({ userName, initialArtists, initialServices, initialEvents, initialTodos, initialTab }: Props) {
  const [artists, setArtists] = useState(initialArtists);
  const [services, setServices] = useState(initialServices);
  const [tab, setTab] = useState<AdminTab>(initialTab);
  const [modal, setModal] = useState<Modal>(null);
  const [deleteTarget, setDeleteTarget] = useState<{ kind: "artist" | "service"; id: string; name: string } | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 8 } }));
  const router = useRouter();

  function changeTab(nextTab: AdminTab) {
    setTab(nextTab);
    router.replace(`/admin?tab=${tabQuery[nextTab]}`, { scroll: false });
  }

  async function onDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    if (tab === "artists") {
      const oldIndex = artists.findIndex((item) => item.id === active.id);
      const newIndex = artists.findIndex((item) => item.id === over.id);
      const next = arrayMove(artists, oldIndex, newIndex);
      setArtists(next);
      try { await reorderArtists(next.map((item) => item.id)); } catch { setArtists(artists); }
    } else {
      const oldIndex = services.findIndex((item) => item.id === active.id);
      const newIndex = services.findIndex((item) => item.id === over.id);
      const next = arrayMove(services, oldIndex, newIndex);
      setServices(next);
      try { await reorderServices(next.map((item) => item.id)); } catch { setServices(services); }
    }
  }

  async function confirmDelete() {
    if (!deleteTarget) return;
    setIsDeleting(true);
    try {
      if (deleteTarget.kind === "artist") { await deleteArtist(deleteTarget.id); setArtists((items) => items.filter((item) => item.id !== deleteTarget.id)); }
      else { await deleteService(deleteTarget.id); setServices((items) => items.filter((item) => item.id !== deleteTarget.id)); }
      setDeleteTarget(null);
    } finally { setIsDeleting(false); }
  }

  const list = tab === "artists" ? artists : services;

  async function signOut() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.replace("/admin/sign-in");
    router.refresh();
  }

  return (
    <main className="min-h-screen bg-[#0C0C0C] px-4 py-8 text-white sm:px-8">
      <div className="mx-auto max-w-5xl">
        <header className="mb-8 flex items-start justify-between gap-4"><div><p className="text-sm uppercase tracking-[0.25em] text-accent">Multi Event</p><h1 className="mt-2 text-3xl font-bold">Yönetim paneli</h1><p className="mt-1 text-sm text-white/60">Hoş geldin, {userName}.</p></div><button type="button" onClick={signOut} className="cursor-pointer rounded-lg border border-white/20 px-4 py-2 text-sm hover:border-accent hover:text-accent">Çıkış yap</button></header>
        <div className="mb-6 grid grid-cols-4 border-b border-white/10"><button type="button" onClick={() => changeTab("artists")} className={`w-full cursor-pointer border-b-2 px-2 py-3 text-center text-sm sm:px-4 sm:text-base ${tab === "artists" ? "border-accent text-accent" : "border-transparent text-white/60"}`}>Sanatçılar</button><button type="button" onClick={() => changeTab("services")} className={`w-full cursor-pointer border-b-2 px-2 py-3 text-center text-sm sm:px-4 sm:text-base ${tab === "services" ? "border-accent text-accent" : "border-transparent text-white/60"}`}>Hizmetler</button><button type="button" onClick={() => changeTab("events")} className={`w-full cursor-pointer border-b-2 px-2 py-3 text-center text-sm sm:px-4 sm:text-base ${tab === "events" ? "border-accent text-accent" : "border-transparent text-white/60"}`}>Etkinlikler</button><button type="button" onClick={() => changeTab("todos")} className={`w-full cursor-pointer border-b-2 px-2 py-3 text-center text-sm sm:px-4 sm:text-base ${tab === "todos" ? "border-accent text-accent" : "border-transparent text-white/60"}`}>Yapılacaklar</button></div>
        {tab === "events" ? <EventManager initialEvents={initialEvents} /> : tab === "todos" ? <TodoManager initialTodos={initialTodos} /> : <section><div className="mb-4 flex items-center justify-between"><div><h2 className="text-xl font-semibold">{tab === "artists" ? "Sanatçı sıralaması" : "Hizmet listesi"}</h2><p className="text-sm text-white/50">{tab === "artists" ? "Sürükleyip bırakarak yayın sırasını değiştirin." : "Hizmetleri ve açıklamalarını buradan düzenleyin."}</p></div><button type="button" onClick={() => setModal({ kind: tab === "artists" ? "artist" : "service" })} className="cursor-pointer rounded-lg bg-accent px-4 py-2 font-semibold text-black">Yeni ekle</button></div>
          <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={onDragEnd}><SortableContext items={list.map((item) => item.id)} strategy={verticalListSortingStrategy}><ul className="space-y-3">{tab === "artists" ? artists.map((artist) => <SortableRow id={artist.id} key={artist.id}><div className="flex min-w-0 flex-1 items-center gap-3"><Image src={artist.imageUrl} alt="" width={48} height={48} className="h-12 w-12 rounded-lg object-cover" /><div className="min-w-0"><p className="truncate font-medium">{artist.nameTr} / {artist.nameEn}</p><p className="text-xs text-white/50">{artist.active ? "Yayında" : "Taslak"}</p></div></div><RowActions onEdit={() => setModal({ kind: "artist", item: artist })} onDelete={() => setDeleteTarget({ kind: "artist", id: artist.id, name: artist.nameTr })} /></SortableRow>) : services.map((service) => <SortableRow id={service.id} key={service.id}><div className="flex min-w-0 flex-1 items-center gap-3"><span className="text-2xl">{service.icon || "✦"}</span><div className="min-w-0"><p className="truncate font-medium">{service.titleTr} / {service.titleEn}</p><p className="text-xs text-white/50">{service.active ? "Yayında" : "Taslak"}</p></div></div><RowActions onEdit={() => setModal({ kind: "service", item: service })} onDelete={() => setDeleteTarget({ kind: "service", id: service.id, name: service.titleTr })} /></SortableRow>)}</ul></SortableContext></DndContext>
        </section>}
      </div>
      {modal && <EditModal modal={modal} onClose={() => setModal(null)} onSaved={() => window.location.reload()} />}
      {deleteTarget && <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4" role="dialog" aria-modal="true" aria-labelledby="delete-title"><div className="w-full max-w-md rounded-2xl border border-white/15 bg-[#171717] p-6"><h2 id="delete-title" className="text-xl font-bold">Veriyi sil?</h2><p className="mt-2 text-white/70"><strong>{deleteTarget.name}</strong> kalıcı olarak silinecek.</p><div className="mt-6 flex justify-end gap-3"><button type="button" onClick={() => setDeleteTarget(null)} className="rounded-lg border border-white/20 px-4 py-2">Vazgeç</button><button type="button" onClick={confirmDelete} disabled={isDeleting} className="rounded-lg bg-red-500 px-4 py-2 font-semibold text-black disabled:opacity-60">{isDeleting ? "Siliniyor…" : "Sil"}</button></div></div></div>}
    </main>
  );
}
