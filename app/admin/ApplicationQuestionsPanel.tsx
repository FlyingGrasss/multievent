"use client";

import { useState } from "react";
import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import AdminModal from "@/app/admin/AdminModal";
import ApplicationQuestionModal from "@/app/admin/ApplicationQuestionModal";
import {
  deleteApplicationQuestion,
  reorderApplicationQuestions,
} from "@/app/admin/application-actions";
import { isOptionQuestionType, questionTypeLabel } from "@/lib/application-form";
import type { ApplicationQuestion } from "@/types";

type Props = {
  questions: ApplicationQuestion[];
  onChange: (questions: ApplicationQuestion[]) => void;
};

const DRAG_HANDLE_LABEL = "Sıralamayı değiştirmek için sürükleyin";

function SortableQuestionRow({
  question,
  disabled,
  onEdit,
  onDelete,
}: {
  question: ApplicationQuestion;
  disabled: boolean;
  onEdit: () => void;
  onDelete: () => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: question.id,
    disabled,
  });

  return (
    <li
      ref={setNodeRef}
      style={{ transform: CSS.Transform.toString(transform), transition }}
      className={`flex items-start gap-3 rounded-xl border border-white/10 bg-[#121212] p-3 ${
        isDragging ? "relative z-10 opacity-70" : ""
      }`}
    >
      <button
        type="button"
        {...attributes}
        {...listeners}
        disabled={disabled}
        className="cursor-grab touch-none rounded p-2 text-xl text-white/50 hover:text-accent disabled:cursor-default disabled:opacity-40"
        aria-label={`${question.labelTr} — ${DRAG_HANDLE_LABEL}`}
      >
        ⠿
      </button>
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full border border-white/15 bg-black/40 px-2 py-0.5 text-xs text-white/70">
            {questionTypeLabel(question.type, "tr")}
          </span>
          {question.required && (
            <span className="rounded-full border border-accent/30 bg-accent/10 px-2 py-0.5 text-xs text-accent">
              Zorunlu
            </span>
          )}
          {isOptionQuestionType(question.type) && (
            <span className="text-xs text-white/50">{question.options.length} seçenek</span>
          )}
        </div>
        <p className="mt-1 truncate font-medium">{question.labelTr}</p>
        {question.labelEn && question.labelEn !== question.labelTr && (
          <p className="truncate text-sm text-white/50">{question.labelEn}</p>
        )}
      </div>
      <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
        <button
          type="button"
          onClick={onEdit}
          disabled={disabled}
          className="cursor-pointer rounded-lg border border-white/20 px-3 py-2 text-sm hover:border-accent hover:text-accent disabled:cursor-default disabled:opacity-50"
        >
          Düzenle
        </button>
        <button
          type="button"
          onClick={onDelete}
          disabled={disabled}
          className="cursor-pointer rounded-lg border border-red-400/40 px-3 py-2 text-sm text-red-300 hover:bg-red-950 disabled:cursor-default disabled:opacity-50"
        >
          Sil
        </button>
      </div>
    </li>
  );
}

export default function ApplicationQuestionsPanel({ questions, onChange }: Props) {
  const [editing, setEditing] = useState<ApplicationQuestion | "new" | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<ApplicationQuestion | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isReordering, setIsReordering] = useState(false);
  const [error, setError] = useState("");
  const [deleteError, setDeleteError] = useState("");
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  );

  async function onDragEnd({ active, over }: DragEndEvent) {
    if (isReordering || !over || active.id === over.id) return;
    const oldIndex = questions.findIndex((question) => question.id === active.id);
    const newIndex = questions.findIndex((question) => question.id === over.id);
    if (oldIndex < 0 || newIndex < 0) return;

    const previous = questions;
    const next = arrayMove(questions, oldIndex, newIndex).map((question, sortOrder) => ({
      ...question,
      sortOrder,
    }));
    setError("");
    setIsReordering(true);
    onChange(next);
    try {
      const result = await reorderApplicationQuestions(next.map((question) => question.id));
      if (!result.ok) {
        onChange(previous);
        setError(result.error);
      }
    } catch {
      onChange(previous);
      setError("Soru sırası güncellenemedi.");
    } finally {
      setIsReordering(false);
    }
  }

  function handleSaved(saved: ApplicationQuestion) {
    if (editing && editing !== "new") {
      onChange(questions.map((question) => (question.id === saved.id ? saved : question)));
    } else {
      onChange([...questions, saved]);
    }
  }

  async function confirmDelete() {
    if (!deleteTarget || isDeleting) return;
    setIsDeleting(true);
    setDeleteError("");
    try {
      const result = await deleteApplicationQuestion(deleteTarget.id);
      if (!result.ok) {
        setDeleteError(result.error);
        return;
      }
      onChange(questions.filter((question) => question.id !== deleteTarget.id));
      setDeleteTarget(null);
    } catch {
      setDeleteError("Soru silinemedi.");
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <section className="rounded-2xl border border-white/10 bg-[#121212] p-4 sm:p-6">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h3 className="text-xl font-semibold">Form soruları</h3>
          <p className="text-sm text-white/50">
            Soruları sürükleyerek sıralayın; metinleri ve seçenekleri düzenleyin.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setEditing("new")}
          disabled={isReordering}
          className="cursor-pointer rounded-lg bg-accent px-4 py-2 font-semibold text-black disabled:cursor-default disabled:opacity-60"
        >
          Yeni soru
        </button>
      </div>

      {error && (
        <p role="alert" className="mb-4 rounded-lg bg-red-950 p-3 text-sm text-red-200">
          {error}
        </p>
      )}

      {questions.length === 0 ? (
        <p className="rounded-xl border border-dashed border-white/20 p-8 text-center text-white/50">
          Henüz soru eklenmedi.
        </p>
      ) : (
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={onDragEnd}>
          <SortableContext
            items={questions.map((question) => question.id)}
            strategy={verticalListSortingStrategy}
          >
            <ul className="space-y-3">
              {questions.map((question) => (
                <SortableQuestionRow
                  key={question.id}
                  question={question}
                  disabled={isReordering}
                  onEdit={() => setEditing(question)}
                  onDelete={() => {
                    setDeleteError("");
                    setDeleteTarget(question);
                  }}
                />
              ))}
            </ul>
          </SortableContext>
        </DndContext>
      )}

      {editing && (
        <ApplicationQuestionModal
          question={editing === "new" ? undefined : editing}
          onClose={() => setEditing(null)}
          onSaved={handleSaved}
        />
      )}

      {deleteTarget && (
        <AdminModal
          titleId="application-question-delete-title"
          onClose={() => {
            if (isDeleting) return;
            setDeleteTarget(null);
            setDeleteError("");
          }}
          pending={isDeleting}
          maxWidthClassName="max-w-md"
        >
          <h2 id="application-question-delete-title" className="text-xl font-bold">
            Soruyu sil?
          </h2>
          <p className="mt-2 text-white/70">
            <strong>{deleteTarget.labelTr}</strong> sorusu formdan kaldırılacak.
          </p>
          <p className="mt-2 text-sm text-white/60">
            Bu soruya verilmiş geçmiş yanıtlar korunur.
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
