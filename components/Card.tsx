import Image from "next/image"

const Card = ({ imageUrl, artistName }: { imageUrl: string, artistName: string }) => {
  return (
    <div className="relative group w-[170px] mx-auto hover:scale-105 transition duration-300 sm:w-[340px] rounded-3xl aspect-square overflow-hidden">
      {/* Image with optimized loading */}
      <Image 
        src={`${imageUrl}?auto=format`} // Sanity image optimization
        alt={artistName}
        width={340}  // Desktop size (2x for retina)
        height={340} // Desktop size
        sizes="(max-width: 639px) 170px, 340px" // Exact pixel control
        className="object-cover rounded-3xl border-2 border-accent transition-transform duration-500 "
      />
      
      {/* Artist name overlay */}
      <div className="absolute inset-0 flex bg-gradient-to-t from-black/80 to-transparent items-end p-4">
        <h1 className="text-white text-2xl max-sm:text-base font-medium w-full text-center">
          {artistName}
        </h1>
      </div>
    </div>
  )
}

export default Card