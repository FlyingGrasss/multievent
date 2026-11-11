"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import AdminModal from "@/app/admin/AdminModal";
import {
  deleteApplicationSubmission,
  loadApplicationSubmission,
  loadApplicationSubmissions,
} from "@/app/admin/application-actions";
import { questionTypeLabel } from "@/lib/application-form";
import type {
  ApplicationSubmissionDetail,
  ApplicationSubmissionListItem,
  ApplicationSubmissionPage,
} from "@/types";

type Props = {
  initialPage: ApplicationSubmissionPage;
  onTotalChange: (total: number) => void;
};

const dateFormatter = new Intl.DateTimeFormat("tr-TR", {
  dateStyle: "medium",
  timeStyle: "short",
  timeZone: "Europe/Istanbul",
});

function isPdfUrl(url: string) {
  return /\.pdf(?:$|\?)/i.test(url);
}

const DETAIL_TITLE_ID = "application-detail-title";
const DELETE_TITLE_ID = "application-delete-title";

function formatDate(value: string) {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "Tarih bilinmiyor" : dateFormatter.format(date);
}

function localeLabel(locale: ApplicationSubmissionListItem["locale"]) {
  return locale === "tr" ? "TR" : "EN";
}

export default function ApplicationResponsesPanel({ initialPage, onTotalChange }: Props) {
  const [items, setItems] = useState<ApplicationSubmissionListItem[]>(initialPage.items);
  const [nextCursor, setNextCursor] = useState<string | null>(initialPage.nextCursor);
  const [total, setTotal] = useState(initialPage.total);
  const [listError, setListError] = useState("");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const detailRequestRef = useRef(0);
  const [detailId, setDetailId] = useState<string | null>(null);
  const [detail, setDetail] = useState<ApplicationSubmissionDetail | null>(null);
  const [detailError, setDetailError] = useState("");
  const [isDetailLoading, setIsDetailLoading] = useState(false);

  const [deleteTarget, setDeleteTarget] = useState<ApplicationSubmissionListItem | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState("");

  useEffect(() => {
    onTotalChange(total);
  }, [onTotalChange, total]);

  function updateTotal(nextTotal: number) {
    setTotal(nextTotal);
  }

  async function refresh() {
    if (isRefreshing || isLoadingMore) return;
    setIsRefreshing(true);
    setListError("");
    try {
      const page = await loadApplicationSubmissions(null);
      setItems(page.items);
      setNextCursor(page.nextCursor);
      updateTotal(page.total);
    } catch {
      setListError("Başvurular yenilenemedi. Lütfen tekrar deneyin.");
    } finally {
      setIsRefreshing(false);
    }
  }

  async function loadMore() {
    if (!nextCursor || isLoadingMore || isRefreshing) return;
    setIsLoadingMore(true);
    setListError("");
    try {
      const page = await loadApplicationSubmissions(nextCursor);
      setItems((current) => {
        const known = new Set(current.map((item) => item.id));
        return [...current, ...page.items.filter((item) => !known.has(item.id))];
      });
      setNextCursor(page.nextCursor);
      updateTotal(page.total);
    } catch {
      setListError("Daha fazla başvuru yüklenemedi. Lütfen tekrar deneyin.");
    } finally {
      setIsLoadingMore(false);
    }
  }

  function closeDetail() {
    detailRequestRef.current += 1;
    setDetailId(null);
    setDetail(null);
    setDetailError("");
    setIsDetailLoading(false);
  }

  async function openDetail(id: string) {
    const requestId = ++detailRequestRef.current;
    setDetailId(id);
    setDetail(null);
    setDetailError("");
    setIsDetailLoading(true);
    try {
      const result = await loadApplicationSubmission(id);
      if (detailRequestRef.current !== requestId) return;
      if (!result) {
        setDetailError("Başvuru bulunamadı.");
        return;
      }
      setDetail(result);
    } catch {
      if (detailRequestRef.current === requestId) {
        setDetailError("Başvuru yüklenemedi. Lütfen tekrar deneyin.");
      }
    } finally {
      if (detailRequestRef.current === requestId) setIsDetailLoading(false);
    }
  }

  async function confirmDelete() {
    if (!deleteTarget || isDeleting) return;
    setIsDeleting(true);
    setDeleteError("");
    try {
      const result = await deleteApplicationSubmission(deleteTarget.id);
      if (!result.ok) {
        setDeleteError(result.error);
        return;
      }
      setItems((current) => current.filter((item) => item.id !== deleteTarget.id));
      setTotal((current) => Math.max(0, current - 1));
      if (detailId === deleteTarget.id) closeDetail();
      setDeleteTarget(null);
    } catch {
      setDeleteError("Başvuru silinemedi.");
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <section className="rounded-2xl border border-white/10 bg-[#121212] p-4 sm:p-6">
      <div className="mb-4 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h3 className="text-xl font-semibold">Gelen yanıtlar</h3>
          <p className="text-sm text-white/50">Toplam {total} başvuru</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {/* eslint-disable-next-line @next/next/no-html-link-for-pages -- CSV export is a route handler download, not a page navigation. */}
          <a
            href="/api/admin/applications/export"
            className="rounded-lg border border-white/20 px-4 py-2 text-sm hover:border-accent hover:text-accent"
          >
            CSV indir
          </a>
          <button
            type="button"
            onClick={refresh}
            disabled={isRefreshing || isLoadingMore}
            className="cursor-pointer rounded-lg border border-white/20 px-4 py-2 text-sm hover:border-accent hover:text-accent disabled:cursor-default disabled:opacity-60"
          >
            {isRefreshing ? "Yenileniyor…" : "Yenile"}
          </button>
        </div>
      </div>

      {listError && (
        <p role="alert" className="mb-4 rounded-lg bg-red-950 p-3 text-sm text-red-200">
          {listError}
        </p>
      )}

      <div aria-busy={isRefreshing || isLoadingMore}>
        {items.length === 0 ? (
          <p className="rounded-xl border border-dashed border-white/20 p-8 text-center text-white/50">
            Henüz başvuru yok.
          </p>
        ) : (
          <ul className="space-y-3">
            {items.map((item) => (
              <li key={item.id} className="rounded-xl border border-white/10 bg-black/30 p-4">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="font-medium">{formatDate(item.submittedAt)}</p>
                      <span className="rounded-full border border-white/15 bg-black/40 px-2 py-0.5 text-xs text-white/70">
                        {localeLabel(item.locale)}
                      </span>
                      <span className="text-xs text-white/50">{item.answerCount} yanıt</span>
                    </div>
                    <p className="mt-2 line-clamp-2 text-sm text-white/70">
                      {item.previewTr || item.previewEn || "Yanıt yok"}
                    </p>
                  </div>
                  <div className="flex shrink-0 gap-2">
                    <button
                      type="button"
                      onClick={() => openDetail(item.id)}
                      disabled={isRefreshing}
                      className="cursor-pointer rounded-lg border border-white/20 px-3 py-2 text-sm hover:border-accent hover:text-accent disabled:cursor-default disabled:opacity-50"
                    >
                      Görüntüle
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setDeleteError("");
                        setDeleteTarget(item);
                      }}
                      disabled={isRefreshing || isLoadingMore}
                      className="cursor-pointer rounded-lg border border-red-400/40 px-3 py-2 text-sm text-red-300 hover:bg-red-950 disabled:cursor-default disabled:opacity-50"
                    >
                      Sil
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}

        {nextCursor && (
          <div className="mt-4 flex justify-center">
            <button
              type="button"
              onClick={loadMore}
              disabled={isLoadingMore || isRefreshing}
              className="cursor-pointer rounded-lg border border-white/20 px-4 py-2 text-sm hover:border-accent hover:text-accent disabled:cursor-default disabled:opacity-60"
            >
              {isLoadingMore ? "Yükleniyor…" : "Daha fazla göster"}
            </button>
          </div>
        )}
      </div>

      {detailId && (
        <AdminModal
          titleId={DETAIL_TITLE_ID}
          onClose={closeDetail}
          maxWidthClassName="max-w-2xl"
        >
          <div className="mb-5 flex items-start justify-between gap-4">
            <div>
              <h2 id={DETAIL_TITLE_ID} className="text-2xl font-bold">
                Başvuru detayı
              </h2>
              <p className="mt-1 text-sm text-white/50">
                {detail ? formatDate(detail.submittedAt) : "Yanıt yükleniyor…"}
              </p>
            </div>
            <button
              type="button"
              onClick={closeDetail}
              aria-label="Kapat"
              className="cursor-pointer text-2xl text-white/60 hover:text-white"
            >
              ×
            </button>
          </div>

          {isDetailLoading ? (
            <p role="status" className="rounded-lg border border-white/10 bg-[#121212] p-4 text-sm text-white/60">
              Yükleniyor…
            </p>
          ) : detailError ? (
            <div className="space-y-3">
              <p role="alert" className="rounded-lg bg-red-950 p-3 text-sm text-red-200">
                {detailError}
              </p>
              <button
                type="button"
                onClick={() => openDetail(detailId)}
                className="cursor-pointer rounded-lg border border-white/20 px-4 py-2 text-sm hover:border-accent hover:text-accent"
              >
                Tekrar dene
              </button>
            </div>
          ) : detail ? (
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full border border-white/15 bg-black/40 px-2 py-0.5 text-xs text-white/70">
                  {localeLabel(detail.locale)}
                </span>
                <span className="text-sm text-white/50">{detail.answers.length} yanıt</span>
              </div>
              {detail.answers.length === 0 ? (
                <p className="rounded-lg border border-dashed border-white/15 p-4 text-center text-sm text-white/50">
                  Bu başvuruda yanıt bulunmuyor.
                </p>
              ) : (
                <dl className="space-y-3">
                  {detail.answers.map((answer, index) => (
                    <div
                      key={`${answer.sortOrder}-${answer.questionId ?? index}`}
                      className="rounded-xl border border-white/10 bg-[#121212] p-4"
                    >
                      <div className="flex flex-wrap items-center gap-2">
                        <dt className="font-medium">{answer.questionLabelTr || answer.questionLabelEn}</dt>
                        <span className="rounded-full border border-white/15 px-2 py-0.5 text-xs text-white/60">
                          {questionTypeLabel(answer.questionType, "tr")}
                        </span>
                      </div>
                      {answer.questionLabelEn && answer.questionLabelEn !== answer.questionLabelTr && (
                        <p className="mt-0.5 text-sm text-white/45">{answer.questionLabelEn}</p>
                      )}
                      {answer.questionType === "file" && typeof answer.value === "string" ? (
                        <dd className="mt-2">
                          <a
                            href={answer.value}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                          >
                            {isPdfUrl(answer.value) ? (
                              <span className="inline-flex items-center gap-2 rounded-lg border border-accent/30 bg-accent/5 px-4 py-3 text-sm font-medium text-accent">
                                PDF dosyasını aç ↗
                              </span>
                            ) : (
                              <>
                                <Image
                                  src={answer.value}
                                  alt={answer.questionLabelTr || "Performans fotoğrafı"}
                                  width={220}
                                  height={160}
                                  unoptimized
                                  className="h-32 w-auto rounded-lg border border-white/10 object-cover"
                                />
                                <span className="mt-2 block text-xs text-accent">Fotoğrafı aç ↗</span>
                              </>
                            )}
                          </a>
                        </dd>
                      ) : (
                        <dd className="mt-2 whitespace-pre-line text-sm text-white/80">
                          {answer.displayTr || answer.displayEn || "Yanıt yok"}
                        </dd>
                      )}
                    </div>
                  ))}
                </dl>
              )}
            </div>
          ) : null}
        </AdminModal>
      )}

      {deleteTarget && (
        <AdminModal
          titleId={DELETE_TITLE_ID}
          onClose={() => {
            if (isDeleting) return;
            setDeleteTarget(null);
            setDeleteError("");
          }}
          pending={isDeleting}
          maxWidthClassName="max-w-md"
        >
          <h2 id={DELETE_TITLE_ID} className="text-xl font-bold">
            Başvuruyu sil?
          </h2>
          <p className="mt-2 text-white/70">
            <strong>{deleteTarget.previewTr || deleteTarget.previewEn || "Başvuru"}</strong>{" "}
            <span className="text-white/50">({formatDate(deleteTarget.submittedAt)})</span> kalıcı
            olarak silinecek. Bu işlem geri alınamaz.
          </p>
          <p className="mt-2 text-sm text-white/60">
            Başvuruya ait tüm yanıtlar da silinir.
          </p>
          {deleteError && (
            <p role="alert" className="mt-4 rounded-lg bg-red-950 p-3 text-sm text-red-200">
              {deleteError}
            </p>
          )}
          <div className="mt-6 flex justify-end gap-3">
            <button
              type="button"
              onClick={() => {
                setDeleteTarget(null);
                setDeleteError("");
              }}
              disabled={isDeleting}
              className="cursor-pointer rounded-lg border border-white/20 px-4 py-2 disabled:cursor-default disabled:opacity-60"
            >
              Vazgeç
            </button>
            <button
              type="button"
              onClick={confirmDelete}
              disabled={isDeleting}
              className="cursor-pointer rounded-lg bg-red-500 px-4 py-2 font-semibold text-black disabled:cursor-default disabled:opacity-60"
            >
              {isDeleting ? "Siliniyor…" : "Sil"}
            </button>
          </div>
        </AdminModal>
      )}
    </section>
  );
}
