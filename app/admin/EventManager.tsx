"use client";

import Image from "next/image";
import { upload } from "@vercel/blob/client";
import { useState } from "react";
import { DndContext, type DragEndEvent, PointerSensor, closestCenter, useSensor, useSensors } from "@dnd-kit/core";
import { SortableContext, arrayMove, useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { deleteEvent, reorderEvents, saveEvent } from "@/app/admin/actions";
import type { EventMediaType, EventType } from "@/types";

function EventRow({ event, onEdit, onDelete }: { event: EventType; onEdit: () => void; onDelete: () => void }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: event.id });
  const cover = event.media[0];
  return (
    <li ref={setNodeRef} style={{ transform: CSS.Transform.toString(transform), transition }} className={`flex items-center gap-3 rounded-xl border border-white/10 bg-[#121212] p-3 ${isDragging ? "relative z-10 opacity-70" : ""}`}>
      <button type="button" {...attributes} {...listeners} className="cursor-grab touch-none rounded p-2 text-xl text-white/50 hover:text-accent" aria-label="Etkinliği sıralamak için sürükleyin">⠿</button>
      <div className="h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-black">
        {cover?.type === "image" ? <Image src={cover.url} alt="" width={56} height={56} className="h-full w-full object-cover" /> : cover ? <video src={cover.url} className="h-full w-full object-cover" muted preload="metadata" /> : null}
      </div>
      <div className="min-w-0 flex-1"><p className="truncate font-medium">{event.titleTr} / {event.titleEn}</p><p className="text-xs text-white/50">{event.active ? "Yayında" : "Taslak"} · {event.media.length} medya</p></div>
      <div className="flex shrink-0 gap-2"><button type="button" onClick={onEdit} className="cursor-pointer rounded-lg border border-white/20 px-3 py-2 text-sm hover:border-accent hover:text-accent">Düzenle</button><button type="button" onClick={onDelete} className="cursor-pointer rounded-lg border border-red-400/40 px-3 py-2 text-sm text-red-300 hover:bg-red-950">Sil</button></div>
    </li>
  );
}

function EventModal({ event, onClose }: { event?: EventType; onClose: () => void }) {
  const [media, setMedia] = useState<EventMediaType[]>(event?.media || []);
  const [isUploading, setIsUploading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState("");

  async function uploadFiles(files: FileList | null) {
    if (!files?.length) return;
    setIsUploading(true);
    setError("");
    try {
      for (const file of Array.from(files)) {
        const isImage = file.type.startsWith("image/");
        const isVideo = file.type.startsWith("video/");
        if (!isImage && !isVideo) throw new Error("Yalnızca fotoğraf veya video yükleyebilirsiniz.");
        if (isImage && file.size > 20 * 1024 * 1024) throw new Error("Fotoğraflar en fazla 20 MB olabilir.");
        if (isVideo && file.size > 500 * 1024 * 1024) throw new Error("Videolar en fazla 500 MB olabilir.");
        const safeName = file.name.toLowerCase().replace(/[^a-z0-9._-]+/g, "-");
        const blob = await upload(`events/${crypto.randomUUID()}-${safeName}`, file, {
          access: "public",
          handleUploadUrl: "/api/admin/event-media",
          multipart: isVideo || file.size > 10 * 1024 * 1024,
          onUploadProgress: ({ percentage }) => setProgress(Math.round(percentage)),
        });
        setMedia((items) => [...items, { url: blob.url, type: isVideo ? "video" : "image", sortOrder: items.length }]);
        setProgress(0);
      }
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Medya yüklenemedi.");
    } finally {
      setIsUploading(false);
    }
  }

  function moveMedia(index: number, direction: -1 | 1) {
    const target = index + direction;
    if (target < 0 || target >= media.length) return;
    setMedia(arrayMove(media, index, target).map((item, sortOrder) => ({ ...item, sortOrder })));
  }

  async function submit(formData: FormData) {
    setIsSaving(true);
    setError("");
    formData.set("media", JSON.stringify(media.map(({ url, type }) => ({ url, type }))));
    try {
      await saveEvent(formData);
      window.location.reload();
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Etkinlik kaydedilemedi.");
      setIsSaving(false);
    }
  }

  const dateValue = event?.eventDate ? new Date(event.eventDate).toISOString().slice(0, 10) : "";
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4" role="dialog" aria-modal="true" aria-labelledby="event-modal-title">
      <div className="max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-2xl border border-white/15 bg-[#171717] p-6">
        <div className="mb-5 flex items-center justify-between"><h2 id="event-modal-title" className="text-2xl font-bold">{event ? "Etkinliği düzenle" : "Yeni etkinlik"}</h2><button type="button" onClick={onClose} className="cursor-pointer text-2xl text-white/60 hover:text-white" aria-label="Kapat">×</button></div>
        {error && <p role="alert" className="mb-4 rounded-lg bg-red-950 p-3 text-sm text-red-200">{error}</p>}
        <form action={submit} className="space-y-4">
          <input type="hidden" name="id" value={event?.id || ""} />
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block text-sm"><span className="mb-1 block text-white/70">Türkçe başlık</span><input name="titleTr" defaultValue={event?.titleTr} required className="w-full rounded-lg border border-white/15 bg-black p-3 outline-none focus:border-accent" /></label>
            <label className="block text-sm"><span className="mb-1 block text-white/70">English title</span><input name="titleEn" defaultValue={event?.titleEn} required className="w-full rounded-lg border border-white/15 bg-black p-3 outline-none focus:border-accent" /></label>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block text-sm"><span className="mb-1 block text-white/70">Türkçe açıklama</span><textarea name="descriptionTr" defaultValue={event?.descriptionTr} required rows={6} className="w-full rounded-lg border border-white/15 bg-black p-3 outline-none focus:border-accent" /></label>
            <label className="block text-sm"><span className="mb-1 block text-white/70">English description</span><textarea name="descriptionEn" defaultValue={event?.descriptionEn} required rows={6} className="w-full rounded-lg border border-white/15 bg-black p-3 outline-none focus:border-accent" /></label>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            <label className="block text-sm"><span className="mb-1 block text-white/70">Tarih</span><input type="date" name="eventDate" defaultValue={dateValue} className="w-full rounded-lg border border-white/15 bg-black p-3 outline-none focus:border-accent" /></label>
            <label className="block text-sm"><span className="mb-1 block text-white/70">Mekân (TR)</span><input name="venueTr" defaultValue={event?.venueTr || ""} className="w-full rounded-lg border border-white/15 bg-black p-3 outline-none focus:border-accent" /></label>
            <label className="block text-sm"><span className="mb-1 block text-white/70">Venue (EN)</span><input name="venueEn" defaultValue={event?.venueEn || ""} className="w-full rounded-lg border border-white/15 bg-black p-3 outline-none focus:border-accent" /></label>
          </div>
          <div><span className="mb-2 block text-sm text-white/70">Fotoğraf ve videolar</span><input type="file" multiple accept="image/jpeg,image/png,image/webp,image/avif,video/mp4,video/webm,video/quicktime" onChange={(event) => uploadFiles(event.target.files)} disabled={isUploading} className="w-full rounded-lg border border-white/15 bg-black p-3 file:mr-3 file:cursor-pointer file:rounded file:border-0 file:bg-accent file:px-3 file:py-2 file:font-semibold file:text-black" />{isUploading && <p className="mt-2 text-sm text-white/60">Yükleniyor… %{progress}</p>}</div>
          {media.length > 0 && <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3">{media.map((item, index) => <li key={item.url} className="overflow-hidden rounded-lg border border-white/10 bg-black"><div className="aspect-video bg-[#090909]">{item.type === "image" ? <Image src={item.url} alt="" width={320} height={180} className="h-full w-full object-cover" /> : <video src={item.url} controls preload="metadata" className="h-full w-full object-contain" />}</div><div className="flex justify-between p-2"><div className="flex gap-1"><button type="button" onClick={() => moveMedia(index, -1)} disabled={index === 0} className="cursor-pointer rounded border border-white/20 px-2 disabled:cursor-default disabled:opacity-30" aria-label="Öne taşı">←</button><button type="button" onClick={() => moveMedia(index, 1)} disabled={index === media.length - 1} className="cursor-pointer rounded border border-white/20 px-2 disabled:cursor-default disabled:opacity-30" aria-label="Arkaya taşı">→</button></div><button type="button" onClick={() => setMedia((items) => items.filter((_, itemIndex) => itemIndex !== index).map((mediaItem, sortOrder) => ({ ...mediaItem, sortOrder })))} className="cursor-pointer text-sm text-red-300">Kaldır</button></div></li>)}</ul>}
          <label className="flex items-center gap-2 text-sm"><input type="checkbox" name="active" value="true" defaultChecked={event ? event.active : true} /> Yayında</label>
          <div className="flex justify-end gap-3 pt-3"><button type="button" onClick={onClose} className="cursor-pointer rounded-lg border border-white/20 px-4 py-2">Vazgeç</button><button type="submit" disabled={isSaving || isUploading || media.length === 0} className="cursor-pointer rounded-lg bg-accent px-5 py-2 font-semibold text-black disabled:cursor-default disabled:opacity-60">{isSaving ? "Kaydediliyor…" : "Kaydet"}</button></div>
        </form>
      </div>
    </div>
  );
}

export default function EventManager({ initialEvents }: { initialEvents: EventType[] }) {
  const [events, setEvents] = useState(initialEvents);
  const [editing, setEditing] = useState<EventType | "new" | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<EventType | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 8 } }));

  async function onDragEnd({ active, over }: DragEndEvent) {
    if (!over || active.id === over.id) return;
    const previous = events;
    const next = arrayMove(events, events.findIndex((item) => item.id === active.id), events.findIndex((item) => item.id === over.id));
    setEvents(next);
    try { await reorderEvents(next.map((item) => item.id)); } catch { setEvents(previous); }
  }

  async function confirmDelete() {
    if (!deleteTarget) return;
    setIsDeleting(true);
    try { await deleteEvent(deleteTarget.id); setEvents((items) => items.filter((item) => item.id !== deleteTarget.id)); setDeleteTarget(null); } finally { setIsDeleting(false); }
  }

  return (
    <section>
      <div className="mb-4 flex items-center justify-between gap-4"><div><h2 className="text-xl font-semibold">Etkinlik portföyü</h2><p className="text-sm text-white/50">Etkinlikleri, fotoğrafları ve videoları yönetin; sıralamak için sürükleyin.</p></div><button type="button" onClick={() => setEditing("new")} className="cursor-pointer rounded-lg bg-accent px-4 py-2 font-semibold text-black">Yeni etkinlik</button></div>
      {events.length > 0 ? <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={onDragEnd}><SortableContext items={events.map((event) => event.id)} strategy={verticalListSortingStrategy}><ul className="space-y-3">{events.map((event) => <EventRow key={event.id} event={event} onEdit={() => setEditing(event)} onDelete={() => setDeleteTarget(event)} />)}</ul></SortableContext></DndContext> : <p className="rounded-xl border border-dashed border-white/20 p-8 text-center text-white/50">Henüz etkinlik eklenmedi.</p>}
      {editing && <EventModal event={editing === "new" ? undefined : editing} onClose={() => setEditing(null)} />}
      {deleteTarget && <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4" role="dialog" aria-modal="true" aria-labelledby="event-delete-title"><div className="w-full max-w-md rounded-2xl border border-white/15 bg-[#171717] p-6"><h2 id="event-delete-title" className="text-xl font-bold">Etkinliği sil?</h2><p className="mt-2 text-white/70"><strong>{deleteTarget.titleTr}</strong> ve yüklenen tüm medya dosyaları kalıcı olarak silinecek.</p><div className="mt-6 flex justify-end gap-3"><button type="button" onClick={() => setDeleteTarget(null)} className="cursor-pointer rounded-lg border border-white/20 px-4 py-2">Vazgeç</button><button type="button" onClick={confirmDelete} disabled={isDeleting} className="cursor-pointer rounded-lg bg-red-500 px-4 py-2 font-semibold text-black disabled:cursor-default disabled:opacity-60">{isDeleting ? "Siliniyor…" : "Sil"}</button></div></div></div>}
    </section>
  );
}
