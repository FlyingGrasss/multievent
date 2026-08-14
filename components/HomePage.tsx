import Image from "next/image";
import Link from "next/link";
import Marquee from "react-fast-marquee";
import AOSWrapper from "@/components/AOSWrapper";
import Card from "@/components/Card";
import { Localized } from "@/components/Localized";
import { getArtists } from "@/lib/content";

export default async function HomePage() {
  const artists = await getArtists();
  return (
    <main>
      <section className="px-8 pt-16 max-sm:px-4 max-sm:pt-12" aria-labelledby="hero-title">
        <h1 id="hero-title" className="sr-only">Bodrum etkinlik organizasyon ve canlı müzik</h1>
        <div className="hero-locale lang-en" lang="en">
          <AOSWrapper animation="fade-left" delay={100}><p className="text-5xl font-extralight max-sm:text-[36px]">We provide</p></AOSWrapper>
          <AOSWrapper animation="fade-left" delay={300}><p className="text-6xl font-bold italic text-accent max-sm:text-[40px]">Live Music</p></AOSWrapper>
          <AOSWrapper animation="fade-left" delay={500}><p className="text-5xl font-extralight max-sm:text-[32px]">with our</p></AOSWrapper>
          <AOSWrapper animation="fade-left" delay={700}><p className="text-5xl font-bold italic text-accent max-sm:text-[36px]">outstanding team</p></AOSWrapper>
        </div>
        <div className="hero-locale lang-tr" lang="tr">
          <AOSWrapper animation="fade-left" delay={100}><p className="text-5xl font-bold italic text-accent max-sm:text-[36px]">Olağanüstü</p></AOSWrapper>
          <AOSWrapper animation="fade-left" delay={300}><p className="text-5xl font-extralight max-sm:text-[36px]">ekibimizle</p></AOSWrapper>
          <AOSWrapper animation="fade-left" delay={500}><p className="text-5xl font-bold italic text-accent max-sm:text-[32px]">Canlı Müzik</p></AOSWrapper>
          <AOSWrapper animation="fade-left" delay={700}><p className="text-5xl font-extralight max-sm:text-[36px]">sunuyoruz</p></AOSWrapper>
        </div>
        <AOSWrapper animation="fade-up" delay={900}><p className="mt-12 text-2xl font-bold italic text-text-secondary max-sm:mt-8 max-sm:text-base"><Localized tr={<>Sektörün liderleriyle hazırlanan<br />unutulmaz etkinlikleri deneyimleyin.</>} en={<>Experience unforgettable<br />events crafted by industry leaders.</>} /></p></AOSWrapper>
        <AOSWrapper animation="fade-up" delay={1100}><Link href="/contact" className="group mt-12 inline-flex items-center gap-4 rounded-full bg-[#0C0C0C] px-8 py-4 text-xl transition-colors hover:text-accent max-sm:mt-10 max-sm:px-6 max-sm:text-base"><Localized tr="Bize ulaşın" en="Contact us" /><Image src="/arrow.svg" width={20} height={16} alt="" className="transition-transform duration-400 group-hover:translate-x-2 max-sm:w-[15px]" /></Link></AOSWrapper>
      </section>

      <section className="my-12 ml-8 flex items-start justify-evenly max-sm:my-8 max-sm:ml-4 max-sm:gap-12" aria-label="Multi Event statistics">
        {[{ number: "50+", tr: "Müzisyen", en: "Musicians" }, { number: "250+", tr: "Etkinlik", en: "Events" }, { number: "10+", tr: <>Yıllık<br />Deneyim</>, en: <>Years of<br />Experience</> }].map((stat, index) => (
          <AOSWrapper key={stat.number} animation="fade-up" delay={150 + index * 150} offset={0}><div><p className="text-5xl font-bold max-sm:text-3xl">{stat.number}</p><p className="text-2xl text-text-secondary max-sm:text-base"><Localized tr={stat.tr} en={stat.en} /></p></div></AOSWrapper>
        ))}
      </section>

      <section className="mx-auto pb-16" aria-labelledby="artists-title">
        <AOSWrapper animation="fade-up" offset={100}><h2 id="artists-title" className="mt-16 text-center text-6xl font-bold max-sm:mt-8 max-sm:text-3xl"><Localized tr="Sanatçılarımız" en="Our artists" /></h2></AOSWrapper>
        <AOSWrapper animation="fade-up" offset={120}>
          <div className="mt-12 block sm:mt-16">
            <Marquee speed={50} gradient={false}>
              {artists.map((artist) => <div className="mx-8 max-sm:mx-4" key={artist.id}><Card imageUrl={artist.imageUrl} nameTr={artist.nameTr} nameEn={artist.nameEn} /></div>)}
            </Marquee>
          </div>
        </AOSWrapper>
        <AOSWrapper animation="fade-up" offset={260}><Link href="/team" className="group ml-8 mt-16 inline-flex items-center gap-4 rounded-full bg-[#0C0C0C] px-8 py-4 text-xl transition-colors hover:text-accent max-sm:ml-4 max-sm:mt-12 max-sm:px-6 max-sm:text-base"><Localized tr="Tümünü gör" en="See all" /><Image src="/arrow.svg" width={20} height={16} alt="" className="transition-transform duration-400 group-hover:translate-x-2 max-sm:w-[15px]" /></Link></AOSWrapper>
      </section>
    </main>
  );
}
