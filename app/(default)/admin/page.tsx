import { requireAdmin } from "@/lib/admin";
import { getAllArtists, getAllEvents, getAllServices, getAllTodos } from "@/lib/content";
import AdminDashboard, { type AdminTab } from "@/app/admin/AdminDashboard";

export const dynamic = "force-dynamic";

type Props = { searchParams: Promise<{ tab?: string | string[] }> };

const queryToTab: Record<string, AdminTab> = { sanatcilar: "artists", hizmetler: "services", etkinlikler: "events", yapilacaklar: "todos" };

export default async function AdminPage({ searchParams }: Props) {
  const session = await requireAdmin();
  const query = await searchParams;
  const rawTab = Array.isArray(query.tab) ? query.tab[0] : query.tab;
  const initialTab = (rawTab && queryToTab[rawTab]) || "artists";
  const [artists, services, events, todos] = await Promise.all([getAllArtists(), getAllServices(), getAllEvents(), getAllTodos()]);
  return <AdminDashboard userName={session.user.name} initialArtists={artists} initialServices={services} initialEvents={events} initialTodos={todos} initialTab={initialTab} />;
}
