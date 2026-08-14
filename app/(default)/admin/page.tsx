import { requireAdmin } from "@/lib/admin";
import { getAllArtists, getAllEvents, getAllServices } from "@/lib/content";
import AdminDashboard from "@/app/admin/AdminDashboard";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const session = await requireAdmin();
  const [artists, services, events] = await Promise.all([getAllArtists(), getAllServices(), getAllEvents()]);
  return <AdminDashboard userName={session.user.name} initialArtists={artists} initialServices={services} initialEvents={events} />;
}
