// components/AOSWrapper.tsx
'use client';

import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

type AOSWrapperProps = {
  children: React.ReactNode;
  animation?: string;
  delay?: number;
  duration?: number;
  offset?: number;
  anchor?: string;
};

export default function AOSWrapper({
  children,
  animation = 'fade-up',
  delay = 0,
  duration = 800,
  offset = 0,
}: AOSWrapperProps) {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  return (
    <div
      data-aos={animation}
      data-aos-delay={delay}
      data-aos-duration={duration}
      data-aos-offset={offset}
    >
      {children}
    </div>
  );
}