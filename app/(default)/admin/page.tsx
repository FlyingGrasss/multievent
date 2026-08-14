import { requireAdmin } from "@/lib/admin";
import { getAllArtists, getAllEvents, getAllServices, getAllTodos } from "@/lib/content";
import AdminDashboard from "@/app/admin/AdminDashboard";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const session = await requireAdmin();
  const [artists, services, events, todos] = await Promise.all([getAllArtists(), getAllServices(), getAllEvents(), getAllTodos()]);
  return <AdminDashboard userName={session.user.name} initialArtists={artists} initialServices={services} initialEvents={events} initialTodos={todos} />;
}
