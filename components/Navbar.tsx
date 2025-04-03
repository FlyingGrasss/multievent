"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="bg-[#121212] text-white w-full h-20 flex items-center justify-between px-4 relative">
      <Link href="/" className="w-fit" aria-label="Home">
        <Image 
          src="/logo.svg"
          width={60}
          height={59} 
          alt="Multi Event Logo"
          className="rounded"
          priority
        />
      </Link>

      <h1 className="max-sm:text-[24px] text-3xl leading-[25px] mt-2 max-sm:leading-[20px] font-medium text-center">
        MULTİ <span className="pl-2">EVENT </span>
        <br /> 
        <span className="max-sm:text-[14px] text-xl font-extralight max-sm:leading-[20px] tracking-widest italic">
          ORGANİZASYON
        </span>
      </h1>

      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="z-50 cursor-pointer focus:outline-none"
        aria-label="Toggle menu"
        aria-expanded={isOpen}
      >
        <Image 
          src="/hamburger.svg"
          width={36}
          height={36} 
          alt="Menu"
          priority
        />
      </button>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black opacity-40 z-40" 
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile Menu Sidebar */}
      <div className={`fixed top-0 right-0 h-full w-64 bg-[#121212] z-50 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col h-full pt-20 px-6">
          <Link 
            href="/" 
            className="text-2xl py-4 border-b border-[#2A2A2A] hover:text-accent transition-colors"
            onClick={() => setIsOpen(false)}
            aria-label="Home"
          >
            Home
          </Link>
          <Link 
            href="/team" 
            className="text-2xl py-4 border-b border-[#2A2A2A] hover:text-accent transition-colors"
            onClick={() => setIsOpen(false)}
            aria-label="Our Team"
          >
            Our Team
          </Link>
          <Link 
            href="/services" 
            className="text-2xl py-4 border-b border-[#2A2A2A] hover:text-accent transition-colors"
            onClick={() => setIsOpen(false)}
            aria-label="Services"
          >
            Services
          </Link>
          <Link 
            href="/contact" 
            className="text-2xl py-4 border-b border-[#2A2A2A] hover:text-accent transition-colors"
            onClick={() => setIsOpen(false)}
            aria-label="Contact Us"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Navbar