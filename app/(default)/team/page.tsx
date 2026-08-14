import type { Metadata } from "next";
import TeamPage from "@/components/TeamPage";

export const revalidate = 300;
export const metadata: Metadata = {
  title: "Bodrum Canlı Müzik Sanatçıları",
  description: "Multi Event sanatçılarıyla Bodrum etkinlikleriniz için canlı müzik ve sahne performansları.",
  alternates: { canonical: "/team" },
  openGraph: {
    title: "Bodrum Canlı Müzik Sanatçıları | Multi Event",
    description: "Multi Event sanatçılarıyla Bodrum etkinlikleriniz için canlı müzik ve sahne performansları.",
    url: "/team",
    images: ["/logo.jpeg"],
  },
};

export default function Team() {
  return <TeamPage />;
}
