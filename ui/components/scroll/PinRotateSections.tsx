
import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { cn } from '@/lib/utils';
import { useLenisScroll, getScroller } from '@/contexts/LenisContext';

gsap.registerPlugin(ScrollTrigger);

export interface PinRotateIntroProps {
  className?: string;
  children: React.ReactNode;
}

export const PinRotateIntro: React.FC<PinRotateIntroProps> = ({ className, children }) => (
  <section
    data-pin-rotate-intro
    className={cn(
      'flex min-h-screen flex-col items-center justify-center bg-[#1a1a1a] px-[8vw] py-0 text-center text-white',
      className
    )}
  >
    {children}
  </section>
);

export interface PinRotateSectionProps {
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}

export const PinRotateSection: React.FC<PinRotateSectionProps> = ({
  className,
  style = {},
  children,
}) => (
  <section
    data-pin-rotate-section
    className={cn(
      'relative flex flex-col border-b border-black/25 bg-[#fcfcfc] px-[6vw] py-[5vh] [perspective:1000px] md:flex-row md:justify-between md:gap-0 md:px-[8vw] md:py-[10vh]',
      className
    )}
    style={{ transformStyle: 'preserve-3d', ...style }}
  >
    <div className="pin-rotate-overlay absolute inset-0 bg-black opacity-0 pointer-events-none" />
    {children}
  </section>
);

export interface PinRotateOutroProps {
  className?: string;
  children: React.ReactNode;
}

export const PinRotateOutro: React.FC<PinRotateOutroProps> = ({ className, children }) => (
  <section
    data-pin-rotate-outro
    className={cn(
      'flex min-h-screen flex-col items-center justify-center bg-[#1a1a1a] px-[6vw] py-0 text-center text-white md:px-[8vw]',
      className
    )}
  >
    {children}
  </section>
);

interface PinRotateSectionsProps {
  children: React.ReactNode;
  className?: string;
}

const PinRotateSections: React.FC<PinRotateSectionsProps> = ({ children, className }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const lenisContext = useLenisScroll();
  const scroller = getScroller(lenisContext);

  useGSAP(
    () => {
      if (!lenisContext.isReady || !containerRef.current) return;

      const sections = Array.from(
        containerRef.current.querySelectorAll<HTMLElement>('[data-pin-rotate-section]')
      );
      if (sections.length === 0) return;

      const triggers: ScrollTrigger[] = [];

      sections.forEach((section, index) => {
        if (index < sections.length - 1) {
          triggers.push(
            ScrollTrigger.create({
              trigger: section,
              start: 'top top',
              endTrigger: sections[sections.length - 1],
              end: 'top top',
              pin: true,
              pinSpacing: false,
              scroller: scroller || undefined,
            })
          );

          triggers.push(
            ScrollTrigger.create({
              trigger: sections[index + 1],
              start: 'top bottom',
              end: 'top top',
              scroller: scroller || undefined,
              onUpdate: (self) => {
                const progress = self.progress;
                const overlay = section.querySelector('.pin-rotate-overlay');
                gsap.set(section, {
                  scale: 1 - progress * 0.25,
                  rotation: index % 2 === 0 ? progress * 5 : -progress * 5,
                  rotationX: index % 2 === 0 ? progress * 40 : -progress * 40,
                });
                if (overlay) gsap.set(overlay, { opacity: progress * 0.4 });
              },
            })
          );
        }
      });

      ScrollTrigger.refresh();

      return () => triggers.forEach((t) => t.kill());
    },
    { scope: containerRef, dependencies: [lenisContext.isReady, scroller] }
  );

  return (
    <main ref={containerRef} className={cn('w-full overflow-x-hidden', className)}>
      {children}
    </main>
  );
};

export default PinRotateSections;
