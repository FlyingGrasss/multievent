import { requireAdmin } from "@/lib/admin";
import { getAllArtists, getAllEvents, getAllServices, getAllTodos } from "@/lib/content";
import { getAdminApplicationForm, getApplicationSubmissionsPage } from "@/lib/application-form-data";
import { getForteFestivalContent } from "@/lib/forte-festival-store";
import AdminDashboard, { type AdminTab } from "@/app/admin/AdminDashboard";

export const dynamic = "force-dynamic";

type Props = { searchParams: Promise<{ tab?: string | string[] }> };

const queryToTab: Record<string, AdminTab> = { sanatcilar: "artists", hizmetler: "services", etkinlikler: "events", yapilacaklar: "todos", basvurular: "applications", festival: "festival" };

export default async function AdminPage({ searchParams }: Props) {
  const session = await requireAdmin();
  const query = await searchParams;
  const rawTab = Array.isArray(query.tab) ? query.tab[0] : query.tab;
  const initialTab = (rawTab && queryToTab[rawTab]) || "artists";
  const [artists, services, events, todos, applicationForm, applicationSubmissions, festivalContent] = await Promise.all([getAllArtists(), getAllServices(), getAllEvents(), getAllTodos(), getAdminApplicationForm(), getApplicationSubmissionsPage({ take: 50 }), getForteFestivalContent()]);
  return <AdminDashboard userName={session.user.name} initialArtists={artists} initialServices={services} initialEvents={events} initialTodos={todos} initialApplicationForm={applicationForm} initialApplicationSubmissions={applicationSubmissions} initialFestivalContent={festivalContent} initialTab={initialTab} />;
}
