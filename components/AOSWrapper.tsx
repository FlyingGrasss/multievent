"use client";

type AOSWrapperProps = {
  children: React.ReactNode;
  animation?: string;
  delay?: number;
  duration?: number;
  offset?: number;
};

export default function AOSWrapper({ children, animation = "fade-up", delay = 0, duration = 800, offset = 120 }: AOSWrapperProps) {
  return (
    <div data-aos={animation} data-aos-delay={delay} data-aos-duration={duration} data-aos-offset={offset}>
      {children}
    </div>
  );
}
