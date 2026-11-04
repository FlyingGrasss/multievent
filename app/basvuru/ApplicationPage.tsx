import Link from "next/link";
import { Localized } from "@/components/Localized";
import { APPLICATION_MESSAGES, type LocalizedMessage } from "@/lib/application-form";
import type { ApplicationFormDefinition } from "@/types";
import ApplicationForm from "@/app/basvuru/ApplicationForm";

function StatusCard({ title, body }: { title: LocalizedMessage; body: LocalizedMessage }) {
  return (
    <div className="mt-8 rounded-xl border border-white/10 bg-[#121212] p-6 text-center sm:mt-10 sm:p-10">
      <h2 className="text-xl font-semibold text-white sm:text-2xl">
        <Localized tr={title.tr} en={title.en} />
      </h2>
      <p className="mt-3 text-sm leading-relaxed text-[#AAAAAA] sm:text-base">
        <Localized tr={body.tr} en={body.en} />
      </p>
    </div>
  );
}

export default function ApplicationPage({ form }: { form: ApplicationFormDefinition | null }) {
  if (!form) {
    return (
      <main className="mx-auto max-w-3xl px-4 pb-16 pt-12 sm:pb-24 sm:pt-16">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            <Localized tr="Başvuru" en="Application" />
          </h1>
        </div>
        <StatusCard title={APPLICATION_MESSAGES.unavailableTitle} body={APPLICATION_MESSAGES.formUnavailable} />
      </main>
    );
  }

  const hasDescription = Boolean(form.descriptionTr.trim() || form.descriptionEn.trim());

  return (
    <main className="mx-auto max-w-3xl px-4 pb-16 pt-12 sm:pb-24 sm:pt-16">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
          <Localized tr={form.titleTr} en={form.titleEn} />
        </h1>
        {hasDescription ? (
          <p className="mt-4 text-sm leading-relaxed text-[#AAAAAA] sm:text-base">
            <Localized tr={form.descriptionTr} en={form.descriptionEn} />
          </p>
        ) : null}
        <Link href="/bodrum-forte-muzik-festivali" className="mt-4 inline-block text-sm font-medium text-accent hover:underline">
          <Localized tr="Festival hakkında bilgi" en="About the festival" />
        </Link>
      </div>

      {!form.isOpen ? (
        <StatusCard title={APPLICATION_MESSAGES.closedTitle} body={APPLICATION_MESSAGES.closedBody} />
      ) : form.questions.length === 0 ? (
        <StatusCard title={APPLICATION_MESSAGES.notReadyTitle} body={APPLICATION_MESSAGES.notReadyBody} />
      ) : (
        <ApplicationForm form={form} />
      )}
    </main>
  );
}
