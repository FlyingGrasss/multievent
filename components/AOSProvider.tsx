// components/AOSProvider.tsx
'use client';

import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useLanguage } from '@/components/LanguageProvider';

export default function AOSProvider() {
  const { locale } = useLanguage();

  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      offset: 120,
      once: true, // Animations only happen once
      mirror: false, // Don't mirror on scroll up
    });
  }, []);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => AOS.refreshHard());
    return () => window.cancelAnimationFrame(frame);
  }, [locale]);

  return null;
}
