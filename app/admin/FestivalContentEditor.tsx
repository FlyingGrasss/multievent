"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import AdminModal from "@/app/admin/AdminModal";
import { resetFestivalContent, saveFestivalContent } from "@/app/admin/festival-actions";
import {
  emptyItemLike,
  getAtPath,
  insertArrayItem,
  isLocalizedList,
  isLocalizedText,
  isPlainObject,
  itemHeading,
  labelForPath,
  moveArrayItem,
  removeArrayItem,
  setAtPathImmutable,
} from "@/lib/forte-festival-editor";
import { forteFestivalContent } from "@/lib/forte-festival";
import type { ForteFestivalContent } from "@/lib/forte-festival-store";

type Props = {
  initialContent: ForteFestivalContent;
};

type UpdateFn = (path: string[], value: unknown) => void;

const INPUT_CLASS =
  "w-full rounded-lg border border-white/15 bg-black p-3 text-sm outline-none focus:border-accent disabled:cursor-default disabled:opacity-60";
const TEXTAREA_CLASS = `${INPUT_CLASS} min-h-24 resize-y`;

const LONG_TEXT_KEYS = new Set([
  "description",
  "body",
  "note",
  "answer",
  "question",
  "lead",
  "paragraph",
  "paragraphs",
  "subtitle",
  "posterNote",
  "imageAlt",
  "url",
  "imageUrl",
  "caption",
  "alt",
  "text",
  "content",
  "href",
  "bio",
]);

function isLongTextKey(key: string) {
  return LONG_TEXT_KEYS.has(key) || key.endsWith("Note") || key.endsWith("Description");
}

function fieldId(path: string[], suffix: string) {
  return `festival-field-${path.join("-")}-${suffix}`.replace(/[^a-zA-Z0-9_-]/g, "-");
}

function splitLines(text: string) {
  // Keep blank lines while editing so pressing Enter to start a new item does not
  // immediately collapse the textarea value back to the previous line.
  if (text === "") return [];
  return text.split(/\r?\n/);
}

function createItemId() {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

function LocalizedTextControl({
  path,
  value,
  disabled,
  onChange,
}: {
  path: string[];
  value: { readonly tr: string; readonly en: string };
  disabled: boolean;
  onChange: (next: { tr: string; en: string }) => void;
}) {
  const long = isLongTextKey(path[path.length - 1] ?? "");
  const update = (locale: "tr" | "en", text: string) => {
    onChange(locale === "tr" ? { tr: text, en: value.en } : { tr: value.tr, en: text });
  };

  return (
    <div>
      <p className="mb-1 text-sm font-medium text-white/80">{labelForPath(path)}</p>
      <div className="grid gap-3 sm:grid-cols-2">
        {(["tr", "en"] as const).map((locale) => {
          const id = fieldId(path, locale);
          return (
            <label key={locale} htmlFor={id} className="block text-xs">
              <span className="mb-1 block uppercase tracking-wide text-white/40">
                {locale === "tr" ? "Türkçe" : "English"}
              </span>
              {long ? (
                <textarea
                  id={id}
                  value={value[locale]}
                  onChange={(event) => update(locale, event.target.value)}
                  rows={4}
                  maxLength={12000}
                  disabled={disabled}
                  className={TEXTAREA_CLASS}
                />
              ) : (
                <input
                  id={id}
                  value={value[locale]}
                  onChange={(event) => update(locale, event.target.value)}
                  maxLength={1000}
                  disabled={disabled}
                  className={INPUT_CLASS}
                />
              )}
            </label>
          );
        })}
      </div>
    </div>
  );
}

function LocalizedListControl({
  path,
  value,
  disabled,
  onChange,
}: {
  path: string[];
  value: { readonly tr: readonly string[]; readonly en: readonly string[] };
  disabled: boolean;
  onChange: (next: { tr: string[]; en: string[] }) => void;
}) {
  const rows = Math.min(10, Math.max(4, value.tr.length + 1));
  const update = (locale: "tr" | "en", text: string) => {
    onChange(
      locale === "tr"
        ? { tr: splitLines(text), en: [...value.en] }
        : { tr: [...value.tr], en: splitLines(text) },
    );
  };

  return (
    <div>
      <p className="mb-1 text-sm font-medium text-white/80">{labelForPath(path)}</p>
      <p className="mb-2 text-xs text-white/40">Her satır ayrı bir öğedir.</p>
      <div className="grid gap-3 sm:grid-cols-2">
        {(["tr", "en"] as const).map((locale) => {
          const id = fieldId(path, locale);
          return (
            <label key={locale} htmlFor={id} className="block text-xs">
              <span className="mb-1 block uppercase tracking-wide text-white/40">
                {locale === "tr" ? "Türkçe" : "English"}
              </span>
              <textarea
                id={id}
                value={value[locale].join("\n")}
                onChange={(event) => update(locale, event.target.value)}
                rows={rows}
                maxLength={12000}
                disabled={disabled}
                className={TEXTAREA_CLASS}
              />
            </label>
          );
        })}
      </div>
    </div>
  );
}

const IMAGE_URL_KEYS = new Set(["image", "imageUrl", "backgroundImage", "posterImage"]);

function ImageUrlControl({
  path,
  value,
  disabled,
  update,
}: {
  path: string[];
  value: string;
  disabled: boolean;
  update: UpdateFn;
}) {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState("");
  const id = fieldId(path, "value");
  const label = labelForPath(path);
  const imagePreviewable =
    value.startsWith("/") || /^https:\/\/[^/]+\.public\.blob\.vercel-storage\.com\//.test(value);

  async function uploadImage(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    setIsUploading(true);
    setError("");
    try {
      const body = new FormData();
      body.set("file", file);
      const response = await fetch("/api/admin/upload", { method: "POST", body });
      const result = (await response.json()) as { url?: string; error?: string };
      if (!response.ok || !result.url) throw new Error(result.error || "Görsel yüklenemedi.");
      update(path, result.url);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Görsel yüklenemedi.");
    } finally {
      setIsUploading(false);
      event.target.value = "";
    }
  }

  return (
    <div className="rounded-xl border border-white/10 bg-black/25 p-3">
      <label htmlFor={id} className="block text-sm">
        <span className="mb-1 block text-white/80">{label}</span>
        <input
          id={id}
          value={value}
          onChange={(event) => update(path, event.target.value)}
          maxLength={1000}
          disabled={disabled}
          placeholder="/forte/gorsel.jpg veya https://…"
          className={INPUT_CLASS}
        />
      </label>
      <div className="mt-3 flex flex-wrap items-center gap-3">
        <label
          className={`rounded-lg border border-dashed border-accent/40 px-4 py-2 text-sm font-medium text-accent hover:bg-accent/10 ${
            disabled || isUploading ? "cursor-default opacity-60" : "cursor-pointer"
          }`}
        >
          {isUploading ? "Görsel yükleniyor…" : "Görsel yükle"}
          <input
            type="file"
            accept="image/jpeg,image/png,image/webp,image/avif"
            onChange={uploadImage}
            disabled={disabled || isUploading}
            className="sr-only"
          />
        </label>
        {imagePreviewable ? (
          <div className="flex items-center gap-3">
            <Image
              src={value}
              alt={`${label} önizlemesi`}
              width={128}
              height={80}
              className="h-16 w-24 rounded-lg border border-white/10 object-cover"
            />
            <button
              type="button"
              onClick={() => update(path, "")}
              disabled={disabled}
              className="cursor-pointer rounded-lg border border-red-400/40 px-3 py-1.5 text-xs text-red-300 hover:bg-red-950 disabled:cursor-default disabled:opacity-60"
            >
              Kaldır
            </button>
          </div>
        ) : (
          <span className="text-xs text-white/40">{value ? "Önizleme için görsel yükleyin veya yerel bir yol kullanın." : "Görsel seçilmedi."}</span>
        )}
      </div>
      {error && (
        <p role="alert" className="mt-2 text-xs text-red-300">
          {error}
        </p>
      )}
    </div>
  );
}

function PrimitiveControl({
  path,
  value,
  disabled,
  update,
}: {
  path: string[];
  value: unknown;
  disabled: boolean;
  update: UpdateFn;
}) {
  const key = path[path.length - 1] ?? "";
  const label = labelForPath(path);
  const id = fieldId(path, "value");

  if (IMAGE_URL_KEYS.has(key) && typeof value === "string") {
    return <ImageUrlControl path={path} value={value} disabled={disabled} update={update} />;
  }

  if (typeof value === "boolean") {
    return (
      <label className="flex items-center gap-3 text-sm text-white/80">
        <input
          type="checkbox"
          checked={value}
          onChange={(event) => update(path, event.target.checked)}
          disabled={disabled}
          className="h-5 w-5 cursor-pointer accent-[#4EFEBE] disabled:cursor-default disabled:opacity-60"
        />
        {label}
      </label>
    );
  }

  if (typeof value === "number") {
    return (
      <label htmlFor={id} className="block text-sm">
        <span className="mb-1 block text-white/80">{label}</span>
        <input
          id={id}
          type="number"
          value={Number.isFinite(value) ? value : 0}
          onChange={(event) => update(path, Number(event.target.value))}
          disabled={disabled}
          className={INPUT_CLASS}
        />
      </label>
    );
  }

  const text = typeof value === "string" ? value : "";
  return (
    <label htmlFor={id} className="block text-sm">
      <span className="mb-1 block text-white/80">{label}</span>
      {isLongTextKey(key) ? (
        <textarea
          id={id}
          value={text}
          onChange={(event) => update(path, event.target.value)}
          rows={4}
          maxLength={12000}
          disabled={disabled}
          className={TEXTAREA_CLASS}
        />
      ) : (
        <input
          id={id}
          value={text}
          onChange={(event) => update(path, event.target.value)}
          maxLength={1000}
          disabled={disabled}
          className={INPUT_CLASS}
        />
      )}
    </label>
  );
}

function ObjectFields({
  basePath,
  value,
  disabled,
  update,
}: {
  basePath: string[];
  value: Record<string, unknown>;
  disabled: boolean;
  update: UpdateFn;
}) {
  const entries = Object.entries(value).filter(([key]) => key !== "slug" && key !== "id");

  return (
    <div className="space-y-4">
      {entries.map(([key, child]) => (
        <ValueField key={key} path={[...basePath, key]} value={child} disabled={disabled} update={update} />
      ))}
    </div>
  );
}

function ArrayControl({
  path,
  value,
  disabled,
  update,
}: {
  path: string[];
  value: unknown[];
  disabled: boolean;
  update: UpdateFn;
}) {
  const defaultArray = getAtPath(forteFestivalContent, path);
  const template = value[0] ?? (Array.isArray(defaultArray) ? defaultArray[0] : "");

  function addItem() {
    const item = emptyItemLike(template);
    if (isPlainObject(item) && Object.prototype.hasOwnProperty.call(item, "id")) {
      item.id = createItemId();
    }
    update(path, insertArrayItem(value, value.length, item));
  }

  return (
    <div className="space-y-3">
      <p className="text-sm font-medium text-white/80">{labelForPath(path)}</p>
      {value.length === 0 && <p className="text-sm text-white/40">Henüz öğe yok.</p>}
      {value.map((item, index) => {
        const heading = itemHeading(item);
        return (
          <div key={index} className="rounded-xl border border-white/10 bg-[#151515] p-3">
            <div className="mb-3 flex flex-wrap items-center gap-2">
              <span className="rounded-full border border-accent/30 bg-accent/10 px-2 py-0.5 text-xs font-medium text-accent">
                {index + 1}
              </span>
              <span className="min-w-0 flex-1 truncate text-sm font-medium text-white/90">{heading}</span>
              <button
                type="button"
                onClick={() => update(path, moveArrayItem(value, index, index - 1))}
                disabled={disabled || index === 0}
                aria-label={`${heading} öğesini yukarı taşı`}
                title="Yukarı taşı"
                className="cursor-pointer rounded-lg border border-white/15 px-2 py-1 text-xs text-white/70 hover:border-accent hover:text-accent disabled:cursor-default disabled:opacity-40"
              >
                ↑
              </button>
              <button
                type="button"
                onClick={() => update(path, moveArrayItem(value, index, index + 1))}
                disabled={disabled || index === value.length - 1}
                aria-label={`${heading} öğesini aşağı taşı`}
                title="Aşağı taşı"
                className="cursor-pointer rounded-lg border border-white/15 px-2 py-1 text-xs text-white/70 hover:border-accent hover:text-accent disabled:cursor-default disabled:opacity-40"
              >
                ↓
              </button>
              <button
                type="button"
                onClick={() => update(path, removeArrayItem(value, index))}
                disabled={disabled}
                aria-label={`${heading} öğesini sil`}
                className="cursor-pointer rounded-lg border border-red-400/40 px-2 py-1 text-xs text-red-300 hover:bg-red-950 disabled:cursor-default disabled:opacity-60"
              >
                Sil
              </button>
            </div>
            {isPlainObject(item) ? (
              <ObjectFields
                basePath={[...path, String(index)]}
                value={item}
                disabled={disabled}
                update={update}
              />
            ) : (
              <ValueField
                path={[...path, String(index)]}
                value={item}
                disabled={disabled}
                update={update}
              />
            )}
          </div>
        );
      })}
      <button
        type="button"
        onClick={addItem}
        disabled={disabled}
        className="cursor-pointer rounded-lg border border-dashed border-accent/40 px-4 py-2 text-sm font-medium text-accent hover:bg-accent/10 disabled:cursor-default disabled:opacity-60"
      >
        + Öğe ekle
      </button>
    </div>
  );
}

function ValueField({
  path,
  value,
  disabled,
  update,
}: {
  path: string[];
  value: unknown;
  disabled: boolean;
  update: UpdateFn;
}) {
  if (isLocalizedText(value)) {
    return (
      <LocalizedTextControl
        path={path}
        value={value}
        disabled={disabled}
        onChange={(next) => update(path, next)}
      />
    );
  }

  if (isLocalizedList(value)) {
    return (
      <LocalizedListControl
        path={path}
        value={value}
        disabled={disabled}
        onChange={(next) => update(path, next)}
      />
    );
  }

  if (Array.isArray(value)) {
    return <ArrayControl path={path} value={value} disabled={disabled} update={update} />;
  }

  if (isPlainObject(value)) {
    return (
      <fieldset className="rounded-xl border border-white/10 bg-[#161616] p-3">
        <legend className="px-1 text-sm font-medium text-white/80">{labelForPath(path)}</legend>
        <ObjectFields basePath={path} value={value} disabled={disabled} update={update} />
      </fieldset>
    );
  }

  return <PrimitiveControl path={path} value={value} disabled={disabled} update={update} />;
}

export default function FestivalContentEditor({ initialContent }: Props) {
  const [draft, setDraft] = useState<ForteFestivalContent>(() => structuredClone(initialContent));
  const [baseline, setBaseline] = useState<ForteFestivalContent>(() => structuredClone(initialContent));
  const [openSections, setOpenSections] = useState<Set<string>>(() => new Set(["hero", "about"]));
  const [isSaving, setIsSaving] = useState(false);
  const [isResetting, setIsResetting] = useState(false);
  const [resetOpen, setResetOpen] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [resetError, setResetError] = useState("");

  const busy = isSaving || isResetting;
  const dirty = useMemo(() => JSON.stringify(draft) !== JSON.stringify(baseline), [draft, baseline]);

  const sectionKeys = useMemo(
    () =>
      Object.keys(draft as unknown as Record<string, unknown>).filter((key) => key !== "slug"),
    [draft],
  );
  const allOpen = sectionKeys.length > 0 && sectionKeys.every((key) => openSections.has(key));

  function updateValue(path: string[], value: unknown) {
    setDraft((current) => setAtPathImmutable(current, path, value) as ForteFestivalContent);
    setError("");
    setSuccess("");
  }

  function handleSectionToggle(key: string, isOpen: boolean) {
    setOpenSections((current) => {
      if (current.has(key) === isOpen) return current;
      const next = new Set(current);
      if (isOpen) next.add(key);
      else next.delete(key);
      return next;
    });
  }

  function toggleAllSections() {
    setOpenSections(allOpen ? new Set() : new Set(sectionKeys));
  }

  async function save() {
    if (busy || !dirty) return;
    setIsSaving(true);
    setError("");
    setSuccess("");
    try {
      const result = await saveFestivalContent(draft);
      if (!result.ok) {
        setError(result.error);
        return;
      }
      setDraft(structuredClone(result.data));
      setBaseline(structuredClone(result.data));
      setSuccess("Festival içeriği kaydedildi.");
    } catch {
      setError("Festival içeriği kaydedilemedi.");
    } finally {
      setIsSaving(false);
    }
  }

  async function confirmReset() {
    if (isResetting) return;
    setIsResetting(true);
    setResetError("");
    try {
      const result = await resetFestivalContent();
      if (!result.ok) {
        setResetError(result.error);
        return;
      }
      setDraft(structuredClone(result.data));
      setBaseline(structuredClone(result.data));
      setResetOpen(false);
      setError("");
      setSuccess("Festival içeriği varsayılanlara döndürüldü.");
    } catch {
      setResetError("Festival içeriği sıfırlanamadı.");
    } finally {
      setIsResetting(false);
    }
  }

  const contentRecord = draft as unknown as Record<string, unknown>;
  const sectionEntries = Object.entries(contentRecord).filter(([key]) => key !== "slug");

  return (
    <section className="space-y-5" aria-busy={busy}>
      <div className="sticky top-0 z-20 rounded-2xl border border-white/10 bg-[#121212]/95 p-4 backdrop-blur">
        <div className="flex flex-wrap items-center gap-3">
          <div className="mr-auto">
            <h2 className="text-xl font-semibold">Festival sayfası</h2>
            <p className="text-sm text-white/50">
              Bodrum Forte Müzik Festivali sayfasındaki tüm metinleri düzenleyin.
            </p>
          </div>
          <a
            href="/tr/bodrum-forte-muzik-festivali"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg border border-white/20 px-4 py-2 text-sm hover:border-accent hover:text-accent"
          >
            Önizle
          </a>
          <button
            type="button"
            onClick={() => {
              setResetOpen(true);
              setResetError("");
            }}
            disabled={busy}
            className="cursor-pointer rounded-lg border border-red-400/40 px-4 py-2 text-sm text-red-300 hover:bg-red-950 disabled:cursor-default disabled:opacity-60"
          >
            Sıfırla
          </button>
          <button
            type="button"
            onClick={save}
            disabled={busy || !dirty}
            className="cursor-pointer rounded-lg bg-accent px-5 py-2 font-semibold text-black disabled:cursor-default disabled:opacity-60"
          >
            {isSaving ? "Kaydediliyor…" : "Kaydet"}
          </button>
        </div>
        <div className="mt-3 flex flex-wrap items-center gap-3 text-xs">
          {dirty ? (
            <span className="text-amber-300">● Kaydedilmemiş değişiklikler</span>
          ) : (
            <span className="text-white/40">Tüm değişiklikler kaydedildi</span>
          )}
          <button
            type="button"
            onClick={toggleAllSections}
            className="ml-auto cursor-pointer rounded-lg border border-white/15 px-3 py-1 text-xs text-white/70 hover:border-accent hover:text-accent"
          >
            {allOpen ? "Tümünü kapat" : "Tümünü aç"}
          </button>
        </div>
        {error && (
          <p role="alert" className="mt-3 rounded-lg bg-red-950 p-3 text-sm text-red-200">
            {error}
          </p>
        )}
        {success && (
          <p role="status" className="mt-3 rounded-lg bg-emerald-950 p-3 text-sm text-emerald-200">
            {success}
          </p>
        )}
      </div>

      <div className="space-y-3">
        {sectionEntries.map(([key, value]) => {
          const open = openSections.has(key);
          return (
            <details
              key={key}
              open={open}
              onToggle={(event) => handleSectionToggle(key, event.currentTarget.open)}
              className="rounded-2xl border border-white/10 bg-[#121212]"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-3 rounded-2xl px-4 py-3 text-base font-semibold [&::-webkit-details-marker]:hidden">
                <span>{labelForPath([key])}</span>
                <span className="text-xs font-normal text-white/40">{open ? "Kapat" : "Aç"}</span>
              </summary>
              <div className="border-t border-white/10 p-4">
                {isPlainObject(value) ? (
                  <ObjectFields basePath={[key]} value={value} disabled={busy} update={updateValue} />
                ) : (
                  <ValueField path={[key]} value={value} disabled={busy} update={updateValue} />
                )}
              </div>
            </details>
          );
        })}
      </div>

      {resetOpen && (
        <AdminModal
          titleId="festival-reset-title"
          onClose={() => {
            if (isResetting) return;
            setResetOpen(false);
            setResetError("");
          }}
          pending={isResetting}
          maxWidthClassName="max-w-md"
        >
          <h2 id="festival-reset-title" className="text-xl font-bold">
            İçeriği sıfırla?
          </h2>
          <p className="mt-2 text-white/70">
            Festival sayfasındaki tüm özel metinler silinecek ve kodda tanımlı varsayılan içerik
            yayınlanacak.
          </p>
          {resetError && (
            <p role="alert" className="mt-4 rounded-lg bg-red-950 p-3 text-sm text-red-200">
              {resetError}
            </p>
          )}
          <div className="mt-6 flex justify-end gap-3">
            <button
              type="button"
              onClick={() => {
                setResetOpen(false);
                setResetError("");
              }}
              disabled={isResetting}
              className="cursor-pointer rounded-lg border border-white/20 px-4 py-2 disabled:cursor-default disabled:opacity-60"
            >
              Vazgeç
            </button>
            <button
              type="button"
              onClick={confirmReset}
              disabled={isResetting}
              className="cursor-pointer rounded-lg bg-red-500 px-4 py-2 font-semibold text-black disabled:cursor-default disabled:opacity-60"
            >
              {isResetting ? "Sıfırlanıyor…" : "Varsayılana döndür"}
            </button>
          </div>
        </AdminModal>
      )}
    </section>
  );
}
