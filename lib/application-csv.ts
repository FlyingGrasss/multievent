import type {
  ApplicationFormDefinition,
  ApplicationSubmissionDetail,
} from "@/types";

type CsvColumn = { key: string; label: string; order: number };

const dateFormatter = new Intl.DateTimeFormat("tr-TR", {
  timeZone: "Europe/Istanbul",
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
});

function csvCell(value: string) {
  let text = value ?? "";
  if (/^[=+\-@\t\r]/.test(text)) text = `'${text}`;
  if (/[",\r\n]/.test(text)) text = `"${text.replaceAll('"', '""')}"`;
  return text;
}

const fileDateFormatter = new Intl.DateTimeFormat("en-CA", {
  timeZone: "Europe/Istanbul",
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});

export function applicationCsvFilename(now = new Date()) {
  return `basvurular-${fileDateFormatter.format(now)}.csv`;
}

export function buildApplicationCsv(
  form: ApplicationFormDefinition,
  submissions: ApplicationSubmissionDetail[],
) {
  const columns: CsvColumn[] = form.questions.map((question) => ({
    key: question.id,
    label: question.labelTr,
    order: question.sortOrder,
  }));
  const knownKeys = new Set(columns.map((column) => column.key));

  for (const submission of submissions) {
    for (const answer of submission.answers) {
      const key = answer.questionId || `legacy:${answer.questionLabelTr}`;
      if (knownKeys.has(key)) continue;
      knownKeys.add(key);
      columns.push({
        key,
        label: answer.questionLabelTr || answer.questionLabelEn,
        order: answer.sortOrder + 1000,
      });
    }
  }

  columns.sort((a, b) => a.order - b.order);

  const header = ["Gönderim Tarihi", "Dil", ...columns.map((column) => column.label)].map((cell) => csvCell(cell));
  const rows = submissions.map((submission) => {
    const values = new Map<string, string[]>();
    for (const answer of submission.answers) {
      const key = answer.questionId || `legacy:${answer.questionLabelTr}`;
      const list = values.get(key) ?? [];
      list.push(answer.displayTr || answer.displayEn);
      values.set(key, list);
    }
    return [
      dateFormatter.format(new Date(submission.submittedAt)),
      submission.locale.toLocaleUpperCase("tr-TR"),
      ...columns.map((column) => (values.get(column.key) ?? []).join("; ")),
    ].map((cell) => csvCell(cell));
  });

  return `\uFEFF${[header, ...rows].map((row) => row.join(",")).join("\r\n")}\r\n`;
}
