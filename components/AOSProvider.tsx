// components/AOSProvider.tsx
'use client';

import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function AOSProvider() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: true, // Animations only happen once
      mirror: false, // Don't mirror on scroll up
    });
  }, []);

  return null;
}