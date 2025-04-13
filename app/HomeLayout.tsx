import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Mont = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});


export const metadata: Metadata = {
  title: "Multi Event",
  description: "We provide Live Music with our outstanding team",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <div className={`${Mont.variable} from-[#0C0C0C] to-[#1A1A2E] antialiased`}>
        <Navbar />
        {children}
        <Footer />
      </div>
  );
}
