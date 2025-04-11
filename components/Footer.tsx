import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const socialLinks = [
    { name: "Instagram", icon: "/instagram.svg", url: "https://www.instagram.com/multieventorg?utm_source=qr&igsh=MTlsc2o0bHhmdHRucg==" },
    { name: "Facebook", icon: "/facebook.svg", url: "#" }
  ];

  return (
    <footer className="w-full bg-[#0C0C0C] pt-12 pb-4">
      <div className="container mx-auto ">
        {/* Main content grid - stacked on mobile, 3 columns on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-3 px-4 gap-8 mb-12">
          {/* Socials */}
          <div className="flex flex-col max-sm:items-start sm:items-center">
            <h2 className="text-accent text-2xl max-sm:text-lg font-bold mb-6 max-sm:mb-4">
              Socials
            </h2>
            <div className="flex gap-6 max-sm:gap-4">
              {socialLinks.map((social) => (
                <a 
                  key={social.name}
                  href={social.url}
                  aria-label={`${social.name} link`}
                  className="hover:opacity-80 transition-opacity"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image 
                    src={social.icon}
                    width={40}
                    height={40}
                    alt=""
                    className="w-10 h-10 max-sm:w-8 max-sm:h-8"
                  />
                </a>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div className="flex flex-col max-sm:items-start sm:items-center">
            <h2 className="text-accent text-2xl max-sm:text-lg font-bold mb-6 max-sm:mb-4">
              Contact
            </h2>
            <div className="space-y-4 max-sm:space-y-3 text-center max-sm:text-left">
              <div className="flex items-center gap-3 max-sm:gap-2 justify-center max-sm:justify-start">
                <Image 
                  src="/phone.svg"
                  width={24}
                  height={24}
                  alt="Phone icon"
                  className="max-sm:w-5 max-sm:h-5"
                />
                <a href="tel:+905309576977" className="text-lg max-sm:text-base hover:underline text-accent">
                  +90 530 957 69 77
                </a>
              </div>
              <div className="flex items-center gap-3 max-sm:gap-2 justify-center max-sm:justify-start">
                <Image 
                  src="/mail.svg"
                  width={24}
                  height={24}
                  alt="Email icon"
                  className="max-sm:w-5 max-sm:h-5"
                />
                <a 
                  href="mailto:sonertirgil@multievent.org" 
                  className="text-lg max-sm:text-base hover:underline text-accent break-all"
                >
                  sonertirgil@multievent.org
                </a>
              </div>
            </div>
          </div>

          {/* Services */}
          <div className="flex flex-col max-sm:items-start sm:items-center">
            <h2 className="text-accent text-2xl max-sm:text-lg font-bold mb-6 max-sm:mb-4">
              Services
            </h2>
            <Link 
              href="/services" 
              className="text-lg max-sm:text-base text-accent hover:underline"
            >
              View All Services
            </Link>
          </div>
        </div>

        {/* Address & Copyright */}
        <div className="flex flex-col items-center justify-center text-center border-t border-[#2A2A2A] pt-4">
          <div className="flex items-center mx-auto gap-3 max-sm:gap-2 mb-1 w-full text-center justify-center max-sm:max-w-[390px]">
            <Image 
              src="/location.svg"
              width={24}
              height={24}
              alt="Location icon"
              className="max-sm:w-6 max-sm:h-6"
            />
            <address className="not-italic sm:text-base max-sm:text-start max-sm:text-xs">
              Yokuşbaşı Mah. Kıbrıs Şehitleri Cad.No:1/C Bodrum
            </address>
          </div>
          <p className="text-xl font-bold max-sm:text-base">Multi Event © {currentYear}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;