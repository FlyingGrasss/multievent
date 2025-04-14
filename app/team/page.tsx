export const revalidate = 60; 

import HomeLayout from "@/app/HomeLayout";
import Card from "@/components/Card";
import { ARTISTS_QUERY } from "@/sanity/lib/queries";
import { client } from "@/sanity/lib/client";
import { ArtistType } from "@/types";

export default async function Team() {
  const allArtists = await client.fetch(ARTISTS_QUERY);

  return (
    <HomeLayout>    
      <div className="mx-auto pb-20 max-sm:pb-12">
        <h1 className="text-6xl max-sm:text-3xl mt-16 max-sm:mt-8 text-center font-bold">Sanatçılarımız</h1>

        {/* Combined responsive grid */}
        <div className="grid place-items-center w-full grid-cols-2 sm:grid-cols-3 gap-6 sm:gap-16 px-4 sm:px-0 mt-12 sm:mt-16">
          {allArtists.map((artist: ArtistType, index: number) => (
            <a className="w-fit" href={`${artist.link || "/"}`} target="_blank" rel="noopener noreferrer" key={index}>
              <Card 
                key={index}
                imageUrl={artist.imageUrl}
                artistName={artist.name}
              />
            </a>
          ))}
        </div>
      </div>
    </HomeLayout>
  );
}