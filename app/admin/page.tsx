import { requireAdmin } from "@/lib/admin";
import { getAllArtists, getAllServices } from "@/lib/content";
import AdminDashboard from "@/app/admin/AdminDashboard";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const session = await requireAdmin();
  const [artists, services] = await Promise.all([getAllArtists(), getAllServices()]);
  return <AdminDashboard userName={session.user.name} initialArtists={artists} initialServices={services} />;
}
