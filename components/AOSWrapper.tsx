"use client";

type AOSWrapperProps = {
  children: React.ReactNode;
  animation?: string;
  delay?: number;
  duration?: number;
  offset?: number;
  mobileDelay?: number;
};

export default function AOSWrapper({ children, animation = "fade-up", delay = 0, duration = 800, offset = 120, mobileDelay }: AOSWrapperProps) {
  const style = mobileDelay === undefined ? undefined : ({ "--aos-mobile-delay": `${mobileDelay}ms` } as React.CSSProperties);

  return (
    <div data-aos={animation} data-aos-delay={delay} data-aos-duration={duration} data-aos-offset={offset} data-aos-mobile-delay={mobileDelay} style={style}>
      {children}
    </div>
  );
}
