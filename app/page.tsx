import Image from "next/image";
import Link from "next/link";
import HomeLayout from "@/app/HomeLayout"
import Card from "@/components/Card";
import { ARTISTS_QUERY } from "@/sanity/lib/queries";
import { client } from "@/sanity/lib/client";
import { ArtistType } from "@/types";

export default async function Home() {
  const allArtists = await client.fetch(ARTISTS_QUERY);
  
  // Shuffle array and pick first 3 (desktop) or 4 (mobile)
  const shuffledArtists = [...allArtists].sort(() => 0.5 - Math.random());
  const desktopArtists = shuffledArtists.slice(0, 3);
  const mobileArtists = shuffledArtists.slice(0, 4);

  return (
    <HomeLayout>
      <div>
      <div className="mt-16 ml-8 max-sm:mt-12 max-sm:ml-4">
          <h1 className="text-5xl max-sm:text-[36px] max-sm:leading-12 font-extralight">We provide</h1>
          <h1 className="text-6xl max-sm:text-[40px] max-sm:leading-12 italic text-accent font-bold">Live Music</h1>
          <h1 className="text-5xl max-sm:text-[32px] max-sm:leading-10 font-extralight">with our</h1>
          <h1 className="text-5xl max-sm:text-[36px] max-sm:leading-12 italic text-accent font-bold">outstanding team</h1>
        </div>
        
        <div className="my-12 ml-8 max-sm:my-8 max-sm:ml-4">
          <p className="text-text-secondary max-sm:text-base font-bold italic text-2xl">
            Experience unforgettable <br />
            events crafted by industry leaders.
          </p>
        </div>

        <Link href="/contact">
          <button className="group ml-8 max-sm:ml-4 max-sm:text-base hover:text-accent text-xl cursor-pointer items-center transition-colors justify-center gap-4 max-sm:gap-2 inline-flex bg-[#0C0C0C] rounded-full px-8 max-sm:px-6 py-4">
            Contact us 
            <Image 
              src="/arrow.svg" 
              width={20} 
              height={16} 
              alt=""
              className="transition-transform duration-400 max-sm:w-[15px] h-auto group-hover:translate-x-2"
            />
          </button>
        </Link>

        <div className="my-12 ml-8 max-sm:ml-4 max-sm:my-8 flex justify-evenly max-sm:gap-12 items-start">
          <div>
            <h1 className="text-white font-bold max-sm:text-3xl text-5xl">50+</h1>
            <h2 className="text-text-secondary max-sm:text-base text-2xl">Musicians</h2>
          </div>
          <div>
            <h1 className="text-white font-bold max-sm:text-3xl text-5xl">250+</h1>
            <h2 className="text-text-secondary max-sm:text-base text-2xl">Events</h2>
          </div>
          <div>
            <h1 className="text-white font-bold max-sm:text-3xl text-5xl">10+</h1>
            <h2 className="text-text-secondary max-sm:text-base text-2xl">Years of <br /> Experience</h2>
          </div>
        </div>

        <div className="mx-auto">
          <h1 className="text-6xl max-sm:text-3xl mt-16 max-sm:mt-8 text-center font-bold">Meet Our Team</h1>

          {/* Desktop: 3 artists */}
          <div className="hidden sm:grid mx-auto grid-cols-3 gap-16 mt-16 ">
            {desktopArtists.map((artist: ArtistType) => (
              <Card 
                key={artist.name}
                imageUrl={artist.imageUrl}
                artistName={artist.name}
              />
            ))}
          </div>

          {/* Mobile: 4 artists */}
          <div className="sm:hidden grid mx-auto grid-cols-2 gap-6 px-4 mt-12 max-sm:mt-6">
            {mobileArtists.map((artist: ArtistType) => (
              <Card 
                key={artist.name}
                imageUrl={artist.imageUrl}
                artistName={artist.name}
              />
            ))}
          </div>

          <Link href="/team">
          <button className="group ml-8 my-16 max-sm:my-12 max-sm:ml-4 max-sm:text-base hover:text-accent text-xl cursor-pointer items-center transition-colors justify-center gap-4 max-sm:gap-2 inline-flex bg-[#0C0C0C] rounded-full px-8 max-sm:px-6 py-4">
            See all
            <Image 
              src="/arrow.svg" 
              width={20} 
              height={16} 
              alt=""
              className="transition-transform duration-400 max-sm:w-[15px] h-auto group-hover:translate-x-2"
            />
          </button>
        </Link>
        </div>
      </div>
    </HomeLayout>
  );
}