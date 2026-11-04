import { cache } from "react";
import { Prisma } from "@/generated/prisma/client";
import { prisma } from "@/lib/db";
import {
  APPLICATION_FORM_ID,
  APPLICATION_LIMITS,
  createDefaultApplicationForm,
  isApplicationQuestionType,
  normalizeApplicationOptions,
} from "@/lib/application-form";
import type {
  ApplicationAnswerSnapshot,
  ApplicationAnswerValue,
  ApplicationFormDefinition,
  ApplicationQuestion,
  ApplicationQuestionOption,
  ApplicationSettings,
  ApplicationSubmissionDetail,
  ApplicationSubmissionListItem,
  ApplicationSubmissionPage,
} from "@/types";

type QuestionRow = {
  id: string;
  type: string;
  labelTr: string;
  labelEn: string;
  helpTr: string | null;
  helpEn: string | null;
  required: boolean;
  options: unknown;
  sortOrder: number;
};

type FormRow = {
  id: string;
  titleTr: string;
  titleEn: string;
  descriptionTr: string | null;
  descriptionEn: string | null;
  isOpen: boolean;
  questions: QuestionRow[];
};

type AnswerRow = {
  questionId: string | null;
  questionLabelTr: string;
  questionLabelEn: string;
  questionType: string;
  value: unknown;
  displayTr: string;
  displayEn: string;
  sortOrder: number;
};

const formInclude = {
  questions: { orderBy: { sortOrder: "asc" as const } },
};

export type NormalizedApplicationQuestionInput = {
  type: ApplicationQuestion["type"];
  labelTr: string;
  labelEn: string;
  helpTr: string | null;
  helpEn: string | null;
  required: boolean;
  options: ApplicationQuestionOption[];
};

function mapQuestion(row: QuestionRow): ApplicationQuestion {
  return {
    id: row.id,
    type: isApplicationQuestionType(row.type) ? row.type : "shortText",
    labelTr: row.labelTr,
    labelEn: row.labelEn,
    helpTr: row.helpTr || "",
    helpEn: row.helpEn || "",
    required: row.required,
    options: normalizeApplicationOptions(row.options),
    sortOrder: row.sortOrder,
  };
}

function mapForm(row: FormRow): ApplicationFormDefinition {
  return {
    id: row.id,
    titleTr: row.titleTr,
    titleEn: row.titleEn,
    descriptionTr: row.descriptionTr || "",
    descriptionEn: row.descriptionEn || "",
    isOpen: row.isOpen,
    questions: row.questions.map(mapQuestion),
  };
}

function jsonOptions(options: ApplicationQuestionOption[]) {
  return options.length > 0 ? (options as unknown as Prisma.InputJsonValue) : Prisma.DbNull;
}

async function findForm() {
  return prisma.applicationForm.findUnique({
    where: { id: APPLICATION_FORM_ID },
    include: formInclude,
  });
}

export async function ensureApplicationForm(): Promise<ApplicationFormDefinition> {
  const existing = await findForm();
  if (existing) return mapForm(existing);

  const defaults = createDefaultApplicationForm();
  await prisma.$transaction(async (tx) => {
    await tx.applicationForm.upsert({
      where: { id: APPLICATION_FORM_ID },
      update: {},
      create: {
        id: APPLICATION_FORM_ID,
        titleTr: defaults.titleTr,
        titleEn: defaults.titleEn,
        descriptionTr: defaults.descriptionTr,
        descriptionEn: defaults.descriptionEn,
        isOpen: defaults.isOpen,
      },
    });
    for (const question of defaults.questions) {
      await tx.applicationQuestion.upsert({
        where: { id: question.id },
        update: {},
        create: {
          id: question.id,
          formId: APPLICATION_FORM_ID,
          type: question.type,
          labelTr: question.labelTr,
          labelEn: question.labelEn,
          helpTr: question.helpTr || null,
          helpEn: question.helpEn || null,
          required: question.required,
          options: jsonOptions(question.options),
          sortOrder: question.sortOrder,
        },
      });
    }
  });

  const created = await findForm();
  if (!created) throw new Error("Başvuru formu oluşturulamadı.");
  return mapForm(created);
}

export const getPublicApplicationForm = cache(async (): Promise<ApplicationFormDefinition | null> => {
  if (!process.env.DATABASE_URL) return createDefaultApplicationForm();
  try {
    const row = await findForm();
    return row ? mapForm(row) : createDefaultApplicationForm();
  } catch (error) {
    console.error("Unable to load public application form", error instanceof Error ? error.name : "unknown");
    return null;
  }
});

export async function getAdminApplicationForm(): Promise<ApplicationFormDefinition> {
  return ensureApplicationForm();
}

export async function updateApplicationSettings(input: ApplicationSettings) {
  await ensureApplicationForm();
  await prisma.applicationForm.update({
    where: { id: APPLICATION_FORM_ID },
    data: {
      titleTr: input.titleTr,
      titleEn: input.titleEn,
      descriptionTr: input.descriptionTr || null,
      descriptionEn: input.descriptionEn || null,
      isOpen: input.isOpen,
    },
  });
  return input;
}

export async function insertApplicationQuestion(input: NormalizedApplicationQuestionInput) {
  await ensureApplicationForm();
  const [count, last] = await Promise.all([
    prisma.applicationQuestion.count({ where: { formId: APPLICATION_FORM_ID } }),
    prisma.applicationQuestion.findFirst({
      where: { formId: APPLICATION_FORM_ID },
      orderBy: { sortOrder: "desc" },
      select: { sortOrder: true },
    }),
  ]);
  if (count >= APPLICATION_LIMITS.maxQuestions) throw new Error("Soru sayısı sınırına ulaşıldı.");
  const row = await prisma.applicationQuestion.create({
    data: {
      formId: APPLICATION_FORM_ID,
      type: input.type,
      labelTr: input.labelTr,
      labelEn: input.labelEn,
      helpTr: input.helpTr,
      helpEn: input.helpEn,
      required: input.required,
      options: jsonOptions(input.options),
      sortOrder: (last?.sortOrder ?? -1) + 1,
    },
  });
  return mapQuestion(row);
}

export async function updateApplicationQuestion(id: string, input: NormalizedApplicationQuestionInput) {
  await ensureApplicationForm();
  const result = await prisma.applicationQuestion.updateMany({
    where: { id, formId: APPLICATION_FORM_ID },
    data: {
      type: input.type,
      labelTr: input.labelTr,
      labelEn: input.labelEn,
      helpTr: input.helpTr,
      helpEn: input.helpEn,
      required: input.required,
      options: jsonOptions(input.options),
    },
  });
  if (result.count !== 1) throw new Error("Soru bulunamadı.");
  const row = await prisma.applicationQuestion.findUnique({ where: { id } });
  if (!row) throw new Error("Soru bulunamadı.");
  return mapQuestion(row);
}

export async function removeApplicationQuestion(id: string) {
  await prisma.applicationQuestion.deleteMany({ where: { id, formId: APPLICATION_FORM_ID } });
}

export async function setApplicationQuestionOrder(ids: string[]) {
  await prisma.$transaction(async (tx) => {
    for (const [index, id] of ids.entries()) {
      const result = await tx.applicationQuestion.updateMany({
        where: { id, formId: APPLICATION_FORM_ID },
        data: { sortOrder: index },
      });
      if (result.count !== 1) throw new Error("Soru sırası güncellenemedi.");
    }
  });
}

function normalizeAnswerValue(value: unknown): ApplicationAnswerValue {
  if (typeof value === "string" || typeof value === "number" || typeof value === "boolean") return value;
  if (Array.isArray(value) && value.every((item) => typeof item === "string")) return value as string[];
  return "";
}

function mapAnswer(row: AnswerRow): ApplicationAnswerSnapshot {
  return {
    questionId: row.questionId,
    questionLabelTr: row.questionLabelTr,
    questionLabelEn: row.questionLabelEn,
    questionType: isApplicationQuestionType(row.questionType) ? row.questionType : "shortText",
    value: normalizeAnswerValue(row.value),
    displayTr: row.displayTr,
    displayEn: row.displayEn,
    sortOrder: row.sortOrder,
  };
}

function mapSubmissionDetail(row: {
  id: string;
  submittedAt: Date;
  locale: string;
  answers: AnswerRow[];
}): ApplicationSubmissionDetail {
  return {
    id: row.id,
    submittedAt: row.submittedAt.toISOString(),
    locale: row.locale === "en" ? "en" : "tr",
    answers: row.answers.map(mapAnswer),
  };
}

export async function createApplicationSubmission(input: {
  locale: "tr" | "en";
  submissionKey: string | null;
  answers: ApplicationAnswerSnapshot[];
}) {
  try {
    await prisma.applicationSubmission.create({
      data: {
        formId: APPLICATION_FORM_ID,
        locale: input.locale,
        submissionKey: input.submissionKey,
        answers: {
          create: input.answers.map((answer) => ({
            questionId: answer.questionId,
            questionLabelTr: answer.questionLabelTr,
            questionLabelEn: answer.questionLabelEn,
            questionType: answer.questionType,
            value: answer.value as unknown as Prisma.InputJsonValue,
            displayTr: answer.displayTr,
            displayEn: answer.displayEn,
            sortOrder: answer.sortOrder,
          })),
        },
      },
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") return;
    throw error;
  }
}

function encodeCursor(item: { submittedAt: Date; id: string }) {
  return Buffer.from(JSON.stringify({ at: item.submittedAt.toISOString(), id: item.id })).toString("base64url");
}

function decodeCursor(cursor: string | null | undefined) {
  if (!cursor) return null;
  try {
    const parsed = JSON.parse(Buffer.from(cursor, "base64url").toString("utf8")) as { at?: unknown; id?: unknown };
    if (typeof parsed.at !== "string" || typeof parsed.id !== "string") return null;
    const at = new Date(parsed.at);
    if (Number.isNaN(at.getTime())) return null;
    return { at, id: parsed.id };
  } catch {
    return null;
  }
}

export async function getApplicationSubmissionsPage(input?: {
  cursor?: string | null;
  take?: number;
}): Promise<ApplicationSubmissionPage> {
  const take = Math.min(Math.max(input?.take ?? APPLICATION_LIMITS.pageSize, 1), APPLICATION_LIMITS.maxPageSize);
  const cursor = decodeCursor(input?.cursor);
  const where = cursor
    ? {
        formId: APPLICATION_FORM_ID,
        OR: [
          { submittedAt: { lt: cursor.at } },
          { submittedAt: cursor.at, id: { lt: cursor.id } },
        ],
      }
    : { formId: APPLICATION_FORM_ID };

  const [rows, total] = await Promise.all([
    prisma.applicationSubmission.findMany({
      where,
      orderBy: [{ submittedAt: "desc" }, { id: "desc" }],
      take: take + 1,
      include: {
        answers: {
          orderBy: { sortOrder: "asc" },
          select: { displayTr: true, displayEn: true },
        },
      },
    }),
    prisma.applicationSubmission.count({ where: { formId: APPLICATION_FORM_ID } }),
  ]);

  const hasMore = rows.length > take;
  const visible = hasMore ? rows.slice(0, take) : rows;
  const items: ApplicationSubmissionListItem[] = visible.map((row) => {
    const first = row.answers.find((answer) => answer.displayTr.trim() || answer.displayEn.trim());
    return {
      id: row.id,
      submittedAt: row.submittedAt.toISOString(),
      locale: row.locale === "en" ? "en" : "tr",
      answerCount: row.answers.length,
      previewTr: first?.displayTr || first?.displayEn || "",
      previewEn: first?.displayEn || first?.displayTr || "",
    };
  });

  return {
    items,
    nextCursor: hasMore && visible.length > 0 ? encodeCursor(visible[visible.length - 1]) : null,
    total,
  };
}

export async function getApplicationSubmission(id: string): Promise<ApplicationSubmissionDetail | null> {
  const row = await prisma.applicationSubmission.findFirst({
    where: { id, formId: APPLICATION_FORM_ID },
    include: { answers: { orderBy: { sortOrder: "asc" } } },
  });
  return row ? mapSubmissionDetail(row) : null;
}

export async function removeApplicationSubmission(id: string) {
  await prisma.applicationSubmission.deleteMany({ where: { id, formId: APPLICATION_FORM_ID } });
}

export async function getApplicationSubmissionsForExport(): Promise<ApplicationSubmissionDetail[]> {
  const rows = await prisma.applicationSubmission.findMany({
    where: { formId: APPLICATION_FORM_ID },
    orderBy: [{ submittedAt: "asc" }, { id: "asc" }],
    include: { answers: { orderBy: { sortOrder: "asc" } } },
  });
  return rows.map(mapSubmissionDetail);
}
