"use client";

import { useMemo, useState } from "react";
import { deleteTodo, saveTodo, toggleTodo } from "@/app/admin/actions";
import type { TodoPriority, TodoType } from "@/types";

const PRIORITIES: TodoPriority[] = ["P1", "P2", "P3", "P4"];
const priorityLabels: Record<TodoPriority, string> = { P1: "P1 · En yüksek", P2: "P2 · Yüksek", P3: "P3 · Normal", P4: "P4 · Düşük" };
const priorityBorderClasses: Record<TodoPriority, string> = { P1: "border-red-400/60", P2: "border-orange-400/60", P3: "border-yellow-400/50", P4: "border-white/25" };

function localDate(value: TodoType["dueDate"]) {
  return new Intl.DateTimeFormat("tr-TR", { dateStyle: "medium", timeZone: "UTC" }).format(new Date(value));
}

function dateInput(value?: TodoType["dueDate"]) {
  const date = value ? new Date(value) : new Date();
  const local = new Date(date.getTime() - date.getTimezoneOffset() * 60_000);
  return local.toISOString().slice(0, 10);
}

function TodoModal({ todo, onClose }: { todo?: TodoType; onClose: () => void }) {
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSaving(true);
    setError("");
    try {
      await saveTodo(new FormData(event.currentTarget));
      window.location.reload();
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Yapılacak kaydedilemedi.");
      setIsSaving(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4" role="dialog" aria-modal="true" aria-labelledby="todo-modal-title">
      <div className="w-full max-w-xl rounded-2xl border border-white/15 bg-[#171717] p-6">
        <div className="mb-5 flex items-center justify-between"><h2 id="todo-modal-title" className="text-2xl font-bold">{todo ? "Yapılacağı düzenle" : "Yeni yapılacak"}</h2><button type="button" onClick={onClose} className="cursor-pointer text-2xl text-white/60 hover:text-white" aria-label="Kapat">×</button></div>
        {error && <p role="alert" className="mb-4 rounded-lg bg-red-950 p-3 text-sm text-red-200">{error}</p>}
        <form onSubmit={submit} className="space-y-4">
          <input type="hidden" name="id" value={todo?.id || ""} />
          <label className="block text-sm"><span className="mb-1 block text-white/70">Başlık</span><input name="title" defaultValue={todo?.title || ""} required maxLength={240} autoFocus className="w-full rounded-lg border border-white/15 bg-black p-3 outline-none focus:border-accent" /></label>
          <label className="block text-sm"><span className="mb-1 block text-white/70">Notlar (opsiyonel)</span><textarea name="notes" defaultValue={todo?.notes || ""} rows={4} maxLength={2000} className="w-full rounded-lg border border-white/15 bg-black p-3 outline-none focus:border-accent" /></label>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block text-sm"><span className="mb-1 block text-white/70">Öncelik</span><select name="priority" defaultValue={todo?.priority || "P3"} className="w-full rounded-lg border border-white/15 bg-black p-3 outline-none focus:border-accent">{PRIORITIES.map((priority) => <option key={priority} value={priority}>{priorityLabels[priority]}</option>)}</select></label>
            <label className="block text-sm"><span className="mb-1 block text-white/70">Tarih</span><input type="date" name="dueDate" defaultValue={dateInput(todo?.dueDate)} required className="w-full rounded-lg border border-white/15 bg-black p-3 outline-none focus:border-accent" /></label>
          </div>
          <div className="flex justify-end gap-3 pt-3"><button type="button" onClick={onClose} className="cursor-pointer rounded-lg border border-white/20 px-4 py-2">Vazgeç</button><button type="submit" disabled={isSaving} className="cursor-pointer rounded-lg bg-accent px-5 py-2 font-semibold text-black disabled:cursor-default disabled:opacity-60">{isSaving ? "Kaydediliyor…" : "Kaydet"}</button></div>
        </form>
      </div>
    </div>
  );
}

export default function TodoManager({ initialTodos }: { initialTodos: TodoType[] }) {
  const [todos, setTodos] = useState(initialTodos);
  const [sort, setSort] = useState<"newest" | "priority">("newest");
  const [editing, setEditing] = useState<TodoType | "new" | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<TodoType | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState("");

  const visibleTodos = useMemo(() => {
    const copy = [...todos];
    if (sort === "priority") {
      const rank = Object.fromEntries(PRIORITIES.map((priority, index) => [priority, index])) as Record<TodoPriority, number>;
      return copy.sort((a, b) => rank[a.priority] - rank[b.priority] || new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }
    return copy.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }, [todos, sort]);

  async function setCompleted(todo: TodoType, completed: boolean) {
    setError("");
    setTodos((items) => items.map((item) => item.id === todo.id ? { ...item, completed, completedAt: completed ? new Date() : null } : item));
    try {
      await toggleTodo(todo.id, completed);
    } catch (cause) {
      setTodos((items) => items.map((item) => item.id === todo.id ? todo : item));
      setError(cause instanceof Error ? cause.message : "Yapılacak güncellenemedi.");
    }
  }

  async function confirmDelete() {
    if (!deleteTarget) return;
    setIsDeleting(true);
    try {
      await deleteTodo(deleteTarget.id);
      setTodos((items) => items.filter((item) => item.id !== deleteTarget.id));
      setDeleteTarget(null);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Yapılacak silinemedi.");
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <section>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-4"><div><h2 className="text-xl font-semibold">Yapılacaklar</h2><p className="text-sm text-white/50">Notlarınızı, önceliklerinizi ve tarihlerinizi takip edin.</p></div><button type="button" onClick={() => setEditing("new")} className="cursor-pointer rounded-lg bg-accent px-4 py-2 font-semibold text-black">Yeni ekle</button></div>
      <div className="mb-4 flex items-center justify-between gap-3"><p className="text-sm text-white/60">{todos.filter((todo) => !todo.completed).length} açık · {todos.filter((todo) => todo.completed).length} tamamlandı</p><label className="flex items-center gap-2 text-sm text-white/70">Sırala<select value={sort} onChange={(event) => setSort(event.target.value as "newest" | "priority")} className="cursor-pointer rounded-lg border border-white/15 bg-black px-3 py-2 outline-none focus:border-accent"><option value="newest">En yeni</option><option value="priority">Öncelik</option></select></label></div>
      {error && <p role="alert" className="mb-4 rounded-lg bg-red-950 p-3 text-sm text-red-200">{error}</p>}
      {visibleTodos.length > 0 ? <ul className="space-y-3">{visibleTodos.map((todo) => <li key={todo.id} className={`rounded-xl border bg-[#121212] p-4 ${priorityBorderClasses[todo.priority]} ${todo.completed ? "opacity-60" : ""}`}><div className="flex items-start gap-3"><input type="checkbox" checked={todo.completed} onChange={(event) => setCompleted(todo, event.target.checked)} className="mt-1 h-5 w-5 cursor-pointer accent-[#4EFEBE]" aria-label={`${todo.title} tamamlandı`} /><div className="min-w-0 flex-1"><h3 className={`font-medium ${todo.completed ? "line-through" : ""}`}>{todo.title}</h3>{todo.notes && <p className="mt-2 whitespace-pre-line text-sm leading-6 text-white/60">{todo.notes}</p>}<p className="mt-2 text-xs text-white/45">Tarih: {localDate(todo.dueDate)} · Oluşturuldu: {localDate(todo.createdAt)}</p></div><div className="flex shrink-0 gap-2"><button type="button" onClick={() => setEditing(todo)} className="cursor-pointer rounded-lg border border-white/20 px-3 py-2 text-sm hover:border-accent hover:text-accent">Düzenle</button><button type="button" onClick={() => setDeleteTarget(todo)} className="cursor-pointer rounded-lg border border-red-400/40 px-3 py-2 text-sm text-red-300 hover:bg-red-950">Sil</button></div></div></li>)}</ul> : <p className="rounded-xl border border-dashed border-white/20 p-8 text-center text-white/50">Henüz yapılacak eklenmedi.</p>}
      {editing && <TodoModal todo={editing === "new" ? undefined : editing} onClose={() => setEditing(null)} />}
      {deleteTarget && <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4" role="dialog" aria-modal="true" aria-labelledby="todo-delete-title"><div className="w-full max-w-md rounded-2xl border border-white/15 bg-[#171717] p-6"><h2 id="todo-delete-title" className="text-xl font-bold">Yapılacağı sil?</h2><p className="mt-2 text-white/70"><strong>{deleteTarget.title}</strong> kalıcı olarak silinecek.</p><div className="mt-6 flex justify-end gap-3"><button type="button" onClick={() => setDeleteTarget(null)} className="cursor-pointer rounded-lg border border-white/20 px-4 py-2">Vazgeç</button><button type="button" onClick={confirmDelete} disabled={isDeleting} className="cursor-pointer rounded-lg bg-red-500 px-4 py-2 font-semibold text-black disabled:cursor-default disabled:opacity-60">{isDeleting ? "Siliniyor…" : "Sil"}</button></div></div></div>}
    </section>
  );
}
