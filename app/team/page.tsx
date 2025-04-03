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
        <h1 className="text-6xl max-sm:text-3xl mt-16 max-sm:mt-8 text-center font-bold">Our Team</h1>

        {/* Combined responsive grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 sm:gap-16 px-4 sm:px-0 mt-12 sm:mt-16">
          {allArtists.map((artist: ArtistType) => (
            <Card 
              key={artist.name}
              imageUrl={artist.imageUrl}
              artistName={artist.name}
            />
          ))}
        </div>
      </div>
    </HomeLayout>
  );
}