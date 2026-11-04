"use server";

import { randomUUID } from "node:crypto";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/admin";
import {
  APPLICATION_LIMITS,
  isApplicationQuestionType,
  isOptionQuestionType,
} from "@/lib/application-form";
import {
  getAdminApplicationForm,
  getApplicationSubmission,
  getApplicationSubmissionsPage,
  insertApplicationQuestion,
  removeApplicationQuestion,
  removeApplicationSubmission,
  setApplicationQuestionOrder,
  updateApplicationQuestion,
  updateApplicationSettings,
  type NormalizedApplicationQuestionInput,
} from "@/lib/application-form-data";
import type {
  ApplicationActionResult,
  ApplicationQuestion,
  ApplicationQuestionInput,
  ApplicationQuestionOption,
  ApplicationSettings,
  ApplicationSubmissionDetail,
  ApplicationSubmissionPage,
} from "@/types";

function fail<T = never>(error: string): ApplicationActionResult<T> {
  return { ok: false, error };
}

function text(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function revalidateApplicationPaths() {
  revalidatePath("/basvuru");
  revalidatePath("/tr/basvuru");
  revalidatePath("/en/basvuru");
  revalidatePath("/admin");
}

function normalizeSettings(input: ApplicationSettings): ApplicationActionResult<ApplicationSettings> {
  if (!input || typeof input !== "object") return fail("Form ayarları geçersiz.");
  const titleTr = text(input.titleTr);
  const titleEn = text(input.titleEn);
  if (!titleTr && !titleEn) return fail("Form başlığı boş olamaz.");
  if (titleTr.length > APPLICATION_LIMITS.title || titleEn.length > APPLICATION_LIMITS.title) {
    return fail("Form başlığı çok uzun.");
  }
  const descriptionTr = text(input.descriptionTr);
  const descriptionEn = text(input.descriptionEn);
  if (descriptionTr.length > APPLICATION_LIMITS.description || descriptionEn.length > APPLICATION_LIMITS.description) {
    return fail("Form açıklaması çok uzun.");
  }
  if (typeof input.isOpen !== "boolean") return fail("Başvuru durumu geçersiz.");
  return {
    ok: true,
    data: {
      titleTr: titleTr || titleEn,
      titleEn: titleEn || titleTr,
      descriptionTr,
      descriptionEn,
      isOpen: input.isOpen,
    },
  };
}

function normalizeOptions(input: ApplicationQuestionInput) {
  if (!isOptionQuestionType(input.type)) return [];
  const seen = new Set<string>();
  const options: ApplicationQuestionOption[] = [];
  for (const item of Array.isArray(input.options) ? input.options : []) {
    const labelTr = text(item?.labelTr);
    const labelEn = text(item?.labelEn);
    const label = labelTr || labelEn;
    if (!label) continue;
    if (label.length > APPLICATION_LIMITS.optionLabel) throw new Error("Seçenek metni çok uzun.");
    const candidateId = text(item?.id);
    const id = /^[A-Za-z0-9_-]{1,64}$/.test(candidateId) && !seen.has(candidateId) ? candidateId : randomUUID();
    if (seen.has(id)) continue;
    seen.add(id);
    options.push({ id, labelTr: labelTr || labelEn, labelEn: labelEn || labelTr });
    if (options.length >= APPLICATION_LIMITS.maxOptions) break;
  }
  return options;
}

function normalizeQuestion(input: ApplicationQuestionInput): ApplicationActionResult<NormalizedApplicationQuestionInput> {
  if (!input || typeof input !== "object") return fail("Soru bilgileri geçersiz.");
  if (typeof input.type !== "string" || !isApplicationQuestionType(input.type)) return fail("Soru türü geçersiz.");
  const labelTr = text(input.labelTr);
  const labelEn = text(input.labelEn);
  if (!labelTr && !labelEn) return fail("Soru metni boş olamaz.");
  if (labelTr.length > APPLICATION_LIMITS.label || labelEn.length > APPLICATION_LIMITS.label) return fail("Soru metni çok uzun.");
  const helpTr = text(input.helpTr);
  const helpEn = text(input.helpEn);
  if (helpTr.length > APPLICATION_LIMITS.help || helpEn.length > APPLICATION_LIMITS.help) return fail("Yardım metni çok uzun.");

  let options: ApplicationQuestionOption[];
  try {
    options = normalizeOptions(input);
  } catch (error) {
    return fail(error instanceof Error ? error.message : "Seçenekler geçersiz.");
  }

  if (isOptionQuestionType(input.type)) {
    const minimum = input.type === "checkboxes" ? 1 : 2;
    if (options.length < minimum) return fail(minimum === 2 ? "Bu soru türü için en az iki seçenek ekleyin." : "Bu soru türü için en az bir seçenek ekleyin.");
  }

  return {
    ok: true,
    data: {
      type: input.type,
      labelTr: labelTr || labelEn,
      labelEn: labelEn || labelTr,
      helpTr: helpTr || null,
      helpEn: helpEn || null,
      required: input.required === true,
      options,
    },
  };
}

export async function saveApplicationSettings(input: ApplicationSettings): Promise<ApplicationActionResult<ApplicationSettings>> {
  await requireAdmin();
  const normalized = normalizeSettings(input);
  if (!normalized.ok) return normalized;
  try {
    const saved = await updateApplicationSettings(normalized.data);
    revalidateApplicationPaths();
    return { ok: true, data: saved };
  } catch (error) {
    console.error("Unable to save application settings", error);
    return fail("Form ayarları kaydedilemedi.");
  }
}

export async function saveApplicationQuestion(input: ApplicationQuestionInput): Promise<ApplicationActionResult<ApplicationQuestion>> {
  await requireAdmin();
  const normalized = normalizeQuestion(input);
  if (!normalized.ok) return normalized;
  try {
    const id = text(input.id);
    const saved = id
      ? await updateApplicationQuestion(id, normalized.data)
      : await insertApplicationQuestion(normalized.data);
    revalidateApplicationPaths();
    return { ok: true, data: saved };
  } catch (error) {
    console.error("Unable to save application question", error);
    return fail("Soru kaydedilemedi.");
  }
}

export async function deleteApplicationQuestion(id: string): Promise<ApplicationActionResult<null>> {
  await requireAdmin();
  const questionId = text(id);
  if (!questionId) return fail("Soru bulunamadı.");
  try {
    await removeApplicationQuestion(questionId);
    revalidateApplicationPaths();
    return { ok: true, data: null };
  } catch (error) {
    console.error("Unable to delete application question", error);
    return fail("Soru silinemedi.");
  }
}

export async function reorderApplicationQuestions(ids: string[]): Promise<ApplicationActionResult<null>> {
  await requireAdmin();
  if (!Array.isArray(ids) || ids.length === 0 || ids.length > APPLICATION_LIMITS.maxQuestions || ids.some((id) => typeof id !== "string") || new Set(ids).size !== ids.length) {
    return fail("Soru sırası geçersiz.");
  }
  try {
    const current = await getAdminApplicationForm();
    const currentIds = current.questions.map((question) => question.id);
    if (ids.length !== currentIds.length || ids.some((id) => !currentIds.includes(id))) {
      return fail("Soru listesi güncel değil. Sayfayı yenileyip tekrar deneyin.");
    }
    await setApplicationQuestionOrder(ids);
    revalidateApplicationPaths();
    return { ok: true, data: null };
  } catch (error) {
    console.error("Unable to reorder application questions", error);
    return fail("Soru sırası güncellenemedi.");
  }
}

export async function deleteApplicationSubmission(id: string): Promise<ApplicationActionResult<null>> {
  await requireAdmin();
  const submissionId = text(id);
  if (!submissionId) return fail("Başvuru bulunamadı.");
  try {
    await removeApplicationSubmission(submissionId);
    revalidatePath("/admin");
    return { ok: true, data: null };
  } catch (error) {
    console.error("Unable to delete application submission", error);
    return fail("Başvuru silinemedi.");
  }
}

export async function loadApplicationSubmissions(cursor: string | null): Promise<ApplicationSubmissionPage> {
  await requireAdmin();
  return getApplicationSubmissionsPage({ cursor: typeof cursor === "string" ? cursor : null });
}

export async function loadApplicationSubmission(id: string): Promise<ApplicationSubmissionDetail | null> {
  await requireAdmin();
  const submissionId = text(id);
  if (!submissionId) return null;
  return getApplicationSubmission(submissionId);
}
