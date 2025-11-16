'use client'; // Mark as client component

import Image from "next/image";
import { useRef, useState, FormEvent } from 'react';
import emailjs, { EmailJSResponseStatus } from 'emailjs-com';
import Script from 'next/script';



type MessageType = {
  text: string;
  type: 'success' | 'error';
};

export default function Contact() {
  const formRef = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [message, setMessage] = useState<MessageType>({ text: '', type: 'success' });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!formRef.current) {
      setMessage({ text: 'Form reference not found', type: 'error' });
      setIsSubmitting(false);
      return;
    } 

    emailjs.sendForm(
      process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || 'service_5943fyb',
      process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || 'template_vhwxhal',
      formRef.current,
      process.env.NEXT_PUBLIC_EMAILJS_USER_ID || 'CpZZc9RR-eMN08txf'
    )
    .then((result: EmailJSResponseStatus) => {
      console.log('Email successfully  sent:', result.text);
      setMessage({ text: 'Message sent successfully!', type: 'success' });
      if (formRef.current) {
        formRef.current.reset();
      }
    }, (error: EmailJSResponseStatus) => {
      console.error('Failed to send email:', error.text);
      setMessage({ text: 'Failed to send message. Please try again.', type: 'error' });
    })
    .finally(() => {
      setIsSubmitting(false);
    });
  };

  return (
    <>
      <div className="mx-auto pb-12 sm:pb-20 px-4 max-w-4xl">
        <h1 className="text-4xl sm:text-6xl mt-12 sm:mt-16 text-center font-bold">Contact Us</h1>

        {/* Contact Information - Optimized sizing */}
        <div className="mt-8 sm:mt-16 grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-8">
          {/* Phone */}
          <div className="flex flex-col items-center text-center p-3 sm:p-6 bg-[#121212] rounded-lg border border-accent">
            <div className="w-7 h-7 sm:w-12 sm:h-12 relative mb-2 sm:mb-4">
              <Image src="/phone.svg" alt="Phone" fill className="object-contain" />
            </div>
            <h3 className="text-base sm:text-xl font-medium mb-1 sm:mb-2">Phone</h3>
            <a href="tel:+905309576977" className="text-base sm:text-xl text-accent hover:underline">
              +90 530 957 69 77
            </a>
          </div>

          {/* Email - With better text handling */}
          <div className="flex flex-col items-center text-center p-3 sm:p-6 bg-[#121212] rounded-lg border border-accent">
            <div className="w-7 h-7 sm:w-12 sm:h-12 relative mb-2 sm:mb-4">
              <Image src="/mail.svg" alt="Email" fill className="object-contain" />
            </div>
            <h3 className="text-base sm:text-xl font-medium mb-1 sm:mb-2">Email</h3>
            <a 
              href="mailto:sonertirgil@multievent.org" 
              className="text-base sm:text-base text-accent hover:underline break-all"
            >
              sonertirgil@multievent.org
            </a>
          </div>

          {/* Location */}
          <div className="flex flex-col items-center text-center p-3 sm:p-6 bg-[#121212] rounded-lg border border-accent">
            <div className="w-7 h-7 sm:w-12 sm:h-12 relative mb-2 sm:mb-4">
              <Image src="/location.svg" alt="Location" fill className="object-contain" />
            </div>
            <h3 className="text-base sm:text-xl font-medium mb-1 sm:mb-2">Location</h3>
            <address className="not-italic text-sm sm:text-base">
              Yokuşbaşı Mah. Kıbrıs Şehitleri<br />
              Cad.No:1/C Bodrum
            </address>
          </div>
        </div>

        {/* Contact Form - With cursor pointer on button */}
        <div className="mt-12 sm:mt-20 p-6 sm:p-8 bg-[#121212] rounded-lg border border-accent">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-center">Send Us a Message</h2>
          
          {message.text && (
            <div className={`mb-6 p-4 rounded-lg text-center ${
              message.type === 'success' 
                ? 'bg-green-900 text-green-300' 
                : 'bg-red-900 text-red-300'
            }`}>
              {message.text}
            </div>
          )}

          <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block mb-2">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full p-3 bg-[#0C0C0C] border border-[#2A2A2A] rounded-lg focus:border-accent focus:outline-none"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block mb-2">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full p-3 bg-[#0C0C0C] border border-[#2A2A2A] rounded-lg focus:border-accent focus:outline-none"
                  required
                />
              </div>
            </div>
            <div>
              <label htmlFor="subject" className="block mb-2">Subject</label>
              <input
                type="text"
                id="subject"
                name="subject"
                className="w-full p-3 bg-[#0C0C0C] border border-[#2A2A2A] rounded-lg focus:border-accent focus:outline-none"
                required
              />
            </div>
            <div>
              <label htmlFor="message" className="block mb-2">Message</label>
              <textarea
                id="message"
                name="message"
                rows={5}
                className="w-full p-3 bg-[#0C0C0C] border border-[#2A2A2A] rounded-lg focus:border-accent focus:outline-none"
                required
              ></textarea>
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full sm:w-auto px-8 py-3 bg-accent text-[#0C0C0C] font-medium rounded-lg hover:bg-[#4EFEBE]/90 transition-colors cursor-pointer ${
                isSubmitting ? 'opacity-70' : ''
              }`}
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>
      </div>



      <Script id="local-business-schema" type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          "name": "Multi Event",
          "image": "https://yourdomain.com/logo.jpg",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "Yokuşbaşı Mah. Kıbrıs Şehitleri Cad.No:1/C",
            "addressLocality": "Bodrum",
            "addressRegion": "MUĞLA",
            "postalCode": "48400",
            "addressCountry": "TR"
          },
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": "37.0344",
            "longitude": "27.4305"
          },
          "url": "https://yourdomain.com",
          "telephone": "+905309576977",
          "openingHoursSpecification": {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            "opens": "09:00",
            "closes": "18:00"
          },
          "priceRange": "$$" // Add if applicable
        })}
      </Script>
      
    </>
  );
}