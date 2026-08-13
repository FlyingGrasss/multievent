import Image from "next/image";
import { Localized } from "@/components/Localized";

export default function Card({ imageUrl, nameTr, nameEn }: { imageUrl: string; nameTr: string; nameEn: string }) {
  return (
    <div className="group relative aspect-square w-[170px] overflow-hidden rounded-3xl border-2 border-accent transition duration-300 sm:w-[340px]">
      <Image src={imageUrl} alt={nameEn} width={340} height={340} sizes="(max-width: 639px) 170px, 340px" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
      <div className="absolute inset-0 flex items-end bg-linear-to-t from-black/80 to-transparent p-4">
        <h2 className="w-full text-center text-2xl font-medium text-white max-sm:text-base"><Localized tr={nameTr} en={nameEn} /></h2>
      </div>
    </div>
  );
}
