import Image from "next/image";
import Link from "next/link";
import HomeLayout from "@/app/HomeLayout"
import Card from "@/components/Card";
import { ARTISTS_QUERY } from "@/sanity/lib/queries";
import { client } from "@/sanity/lib/client";
import { ArtistType } from "@/types";
import AOSWrapper from '@/components/AOSWrapper';
import Marquee from "react-fast-marquee";


export default async function Home() {
  const allArtists = await client.fetch(ARTISTS_QUERY);
  
  return (
    <HomeLayout>
      <div>
      <div className="mt-16 ml-8 max-sm:mt-12 max-sm:ml-4">
          <AOSWrapper animation="fade-left" delay={100}>
            <h2 className="text-5xl max-sm:text-[36px] max-sm:leading-12 font-extralight">We provide</h2>
          </AOSWrapper>
          <AOSWrapper animation="fade-left" delay={300}>
            <h2 className="text-6xl max-sm:text-[40px] max-sm:leading-12 italic text-accent font-bold">Live Music</h2>
          </AOSWrapper>
          <AOSWrapper animation="fade-left" delay={500}>
            <h2 className="text-5xl max-sm:text-[32px] max-sm:leading-10 font-extralight">with our</h2>
          </AOSWrapper>
          <AOSWrapper animation="fade-left" delay={700}>
            <h2 className="text-5xl max-sm:text-[36px] max-sm:leading-12 italic text-accent font-bold">outstanding team</h2>
          </AOSWrapper>
        </div>
        
        <div className="my-12 ml-8 max-sm:my-8 max-sm:ml-4">
          <AOSWrapper animation="fade-up" delay={900}>
            <p className="text-text-secondary max-sm:text-base font-bold italic text-2xl">
              Experience unforgettable <br />
              events crafted by industry leaders.
            </p>
          </AOSWrapper>
        </div>
        <AOSWrapper animation="fade-up" delay={1100}>
          <Link href="/contact" className="w-fit">
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
        </AOSWrapper>




        <div className="max-sm:hidden">
          <div className="my-12 ml-8 max-sm:ml-4 max-sm:my-8 flex justify-evenly max-sm:gap-12 items-start">          
            <AOSWrapper 
              animation="fade-up" 
              delay={0}
            >
              <div>
                <h2 className="text-white font-bold max-sm:text-3xl text-5xl">50+</h2>
                <h2 className="text-text-secondary max-sm:text-base text-2xl">Musicians</h2>
              </div>
            </AOSWrapper>

            <AOSWrapper 
              animation="fade-up" 
              delay={150}
            >
              <div>
                <h2 className="text-white font-bold max-sm:text-3xl text-5xl">250+</h2>
                <h2 className="text-text-secondary max-sm:text-base text-2xl">Events</h2>
              </div>
            </AOSWrapper>

            <AOSWrapper 
              animation="fade-up" 
              delay={300}
            >
              <div>
                <h2 className="text-white font-bold max-sm:text-3xl text-5xl">10+</h2>
                <h2 className="text-text-secondary max-sm:text-base text-2xl">Years of <br /> Experience</h2>
              </div>
            </AOSWrapper>          
          </div>
        </div>

        <div className="sm:hidden">
          <div className="my-12 ml-8 max-sm:ml-4 max-sm:my-8 flex justify-evenly max-sm:gap-12 items-start">          
            <AOSWrapper 
              animation="fade-up" 
              delay={1300}
            >
              <div>
                <h2 className="text-white font-bold max-sm:text-3xl text-5xl">50+</h2>
                <h2 className="text-text-secondary max-sm:text-base text-2xl">Musicians</h2>
              </div>
            </AOSWrapper>

            <AOSWrapper 
              animation="fade-up" 
              delay={1500}
            >
              <div>
                <h2 className="text-white font-bold max-sm:text-3xl text-5xl">250+</h2>
                <h2 className="text-text-secondary max-sm:text-base text-2xl">Events</h2>
              </div>
            </AOSWrapper>

            <AOSWrapper 
              animation="fade-up" 
              delay={1700}
            >
              <div>
                <h2 className="text-white font-bold max-sm:text-3xl text-5xl">10+</h2>
                <h2 className="text-text-secondary max-sm:text-base text-2xl">Years of <br /> Experience</h2>
              </div>
            </AOSWrapper>          
          </div>
        </div>



        <div className="mx-auto sm:hidden">
          <AOSWrapper animation="fade-up" delay={1900}>
            <h2 className="text-6xl max-sm:text-3xl mt-16 max-sm:mt-8 text-center font-bold">Meet Our Team</h2>
          </AOSWrapper>
          <AOSWrapper animation="fade-up" delay={2100}>
            <div className="block mx-auto max-sm:gap-6 max-sm:mt-6 gap-16 mt-16 ">
              <Marquee speed={50}>
                {allArtists.map((artist: ArtistType) => (
                  <Card
                    key={artist.name}
                    imageUrl={artist.imageUrl}
                    artistName={artist.name}
                  />
                ))}
              </Marquee>
            </div>
          </AOSWrapper>
          <AOSWrapper animation="fade-up" delay={0}>      
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
          </AOSWrapper>

        </div>

        <div className="mx-auto max-sm:hidden">
          <AOSWrapper animation="fade-up" offset={100}>
            <h2 className="text-6xl max-sm:text-3xl mt-16 max-sm:mt-8 text-center font-bold">Meet Our Team</h2>
          </AOSWrapper>
          <AOSWrapper animation="fade-up" offset={300}>
            <div className="block mx-auto max-sm:gap-6 max-sm:mt-6 gap-16 mt-16 ">
              <Marquee speed={50}>
                {allArtists.map((artist: ArtistType) => (
                  <Card
                    key={artist.name}
                    imageUrl={artist.imageUrl}
                    artistName={artist.name}
                  />
                ))}
              </Marquee>
            </div>
          </AOSWrapper>
          <AOSWrapper animation="fade-up" offset={400}>      
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
          </AOSWrapper>

        </div>
        
      </div>
    </HomeLayout>
  );
}