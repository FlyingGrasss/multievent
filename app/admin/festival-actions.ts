"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/admin";
import {
  FestivalContentValidationError,
  resetForteFestivalContent,
  saveForteFestivalContent,
  type ForteFestivalContent,
} from "@/lib/forte-festival-store";

type FestivalActionResult =
  | { ok: true; data: ForteFestivalContent }
  | { ok: false; error: string };

function revalidateFestivalPaths() {
  revalidatePath("/bodrum-forte-muzik-festivali");
  revalidatePath("/tr/bodrum-forte-muzik-festivali");
  revalidatePath("/en/bodrum-forte-muzik-festivali");
  revalidatePath("/admin");
}

export async function saveFestivalContent(content: unknown): Promise<FestivalActionResult> {
  await requireAdmin();

  try {
    const data = await saveForteFestivalContent(content);
    revalidateFestivalPaths();
    return { ok: true, data };
  } catch (error) {
    if (error instanceof FestivalContentValidationError) {
      return { ok: false, error: error.message };
    }
    console.error("Unable to save festival content", error instanceof Error ? error.name : "unknown");
    return { ok: false, error: "Festival içeriği kaydedilemedi." };
  }
}

export async function resetFestivalContent(): Promise<FestivalActionResult> {
  await requireAdmin();

  try {
    const data = await resetForteFestivalContent();
    revalidateFestivalPaths();
    return { ok: true, data };
  } catch (error) {
    console.error("Unable to reset festival content", error instanceof Error ? error.name : "unknown");
    return { ok: false, error: "Festival içeriği sıfırlanamadı." };
  }
}
