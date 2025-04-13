import HomeLayout from "@/app/HomeLayout";

export default function Team() {
  return (
    <HomeLayout>    
      <div className="mx-auto pb-20 max-sm:pb-12">
        <h1 className="text-6xl max-sm:text-3xl mt-16 max-sm:mt-8 text-center font-bold">Our Services</h1>

        <ul className="mt-12 max-w-2xl flex justify-center flex-col max-sm:items-center max-sm:justify-start mx-auto space-y-4 text-xl max-sm:text-lg">
          <li className="p-4 bg-[#121212] rounded-lg max-sm:w-[85%] border border-accent">
            🎤 Wedding Organizations
          </li>
          <li className="p-4 bg-[#121212] rounded-lg max-sm:w-[85%] border border-accent">
            🎶 Live Music Performances
          </li>
          <li className="p-4 bg-[#121212] rounded-lg max-sm:w-[85%] border border-accent">
            🎭 Corporate Event Planning
          </li>
          <li className="p-4 bg-[#121212] rounded-lg max-sm:w-[85%] border border-accent">
            🎧 Sound System Rentals
          </li>
          <li className="p-4 bg-[#121212] rounded-lg max-sm:w-[85%] border border-accent">
            💡 Lighting & Stage Design
          </li>
          <li className="p-4 bg-[#121212] rounded-lg max-sm:w-[85%] border border-accent">
            🎨 Event Branding & Marketing
          </li>
          <li className="p-4 bg-[#121212] rounded-lg max-sm:w-[85%] border border-accent">
            🍾 VIP Hospitality Services
          </li>
        </ul>
        
      </div>
    </HomeLayout>
  );
}