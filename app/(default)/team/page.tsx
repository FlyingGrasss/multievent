import type { Metadata } from "next";
import Card from "@/components/Card";
import { Localized } from "@/components/Localized";
import { getArtists } from "@/lib/content";

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

export default async function Team() {
  const artists = await getArtists();
  return (
    <main className="mx-auto pb-20 max-sm:pb-12">
      <h1 className="mt-16 text-center text-6xl font-bold max-sm:mt-8 max-sm:text-3xl"><Localized tr="Sanatçılarımız" en="Our artists" /></h1>
      <div className="mt-12 grid w-full grid-cols-2 place-items-center gap-6 px-4 sm:mt-16 sm:grid-cols-3 sm:gap-16 sm:px-0">
        {artists.map((artist) => {
          const card = <Card imageUrl={artist.imageUrl} nameTr={artist.nameTr} nameEn={artist.nameEn} />;
          return artist.link ? <a className="w-fit transition-transform hover:scale-105" href={artist.link} target="_blank" rel="noopener noreferrer" key={artist.id}>{card}</a> : <div key={artist.id}>{card}</div>;
        })}
      </div>
    </main>
  );
}
