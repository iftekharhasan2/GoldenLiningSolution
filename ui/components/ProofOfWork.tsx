'use client';

import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { useLenisScroll, getScroller } from '@/contexts/LenisContext';

gsap.registerPlugin(ScrollTrigger);

export interface ProofOfWorkItem {
  image: string;
  imageAlt?: string;
  title: string;
  subtitle: string;
  description?: string;
}

interface ProofOfWorkProps {
  title?: string;
  works: ProofOfWorkItem[];
  className?: string;
}

const ProofOfWork: React.FC<ProofOfWorkProps> = ({
  title = 'The Crew',
  works,
  className,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const lenisContext = useLenisScroll();
  const scroller = getScroller(lenisContext);
  const [isDesktop, setIsDesktop] = useState(true);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    const check = () => setIsDesktop(typeof window !== 'undefined' ? window.innerWidth > 768 : true);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  useEffect(() => {
    if (!containerRef.current || !lenisContext.isReady) return;

    const images = imageRefs.current.filter(Boolean);
    if (images.length === 0) return;

    const yOffset = isDesktop ? 200 : 120;

    // Set initial states - ORIGINAL ANIMATION PRESERVED
    images.forEach((imgEl, index) => {
      if (!imgEl) return;
      gsap.set(imgEl, {
        rotation: index % 2 === 0 ? -25 : 25,
        transformOrigin: 'center center',
        y: yOffset,
        opacity: 0,
      });
    });

    // Single trigger for the whole section - ORIGINAL ANIMATION PRESERVED
    const st = ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top 90%',
      scroller: scroller || undefined,
      onEnter: () => {
        images.forEach((imgEl, index) => {
          if (!imgEl) return;
          gsap.to(imgEl, {
            rotation: 0,
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: 'power2.out',
            delay: index * 0.08,
          });
        });
      },
      once: true,
    });

    return () => st.kill();
  }, [works, lenisContext.isReady, scroller, isDesktop]);

  return (
    <div ref={containerRef} className={cn('w-full bg-[#0E0E0E] px-6 py-32 text-white md:px-12', className)}>
      {/* Section Header */}
      <div ref={headerRef} className="mx-auto max-w-[1200px] mb-20">
        <p className="text-[0.65rem] tracking-[0.35em] uppercase text-[#C8A96E] mb-6 text-center">
          Meet the Team
        </p>
        <h2 className="font-serif font-normal text-[clamp(2rem,4vw,3.5rem)] leading-[1.15] text-[#E8E4DC] text-center">
          The <em className="italic text-[#C8A96E]">Crew</em>
        </h2>
        <div className="w-12 h-px bg-[#C8A96E] mx-auto mt-8" />
        <p className="text-[0.85rem] font-light text-[#E8E4DC]/40 max-w-md mx-auto leading-[1.8] text-center mt-6">
          A collective of strategists, designers, and engineers united by an obsession for craft.
        </p>
      </div>

      {/* Works Grid - ALL SAME SIZE CARDS */}
      <div className="mx-auto max-w-[1200px] grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {works.map((work, index) => (
          <div
            key={index}
            className="group relative"
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {/* Image Container with ORIGINAL ANIMATION */}
            <div
              ref={(el) => {
                if (el) imageRefs.current[index] = el;
              }}
              className="relative w-full overflow-hidden bg-[#141414] border border-[#C8A96E]/10 group-hover:border-[#C8A96E]/30 transition-all duration-700"
              style={{ borderRadius: '1rem' }}
            >
              <Image
                src={work.image}
                alt={work.imageAlt ?? work.title}
                width={600}
                height={600}
                className="aspect-square w-full object-cover opacity-85 group-hover:opacity-100 group-hover:scale-[1.03] transition-all duration-700"
                style={{
                  filter: hoveredIndex !== null && hoveredIndex !== index 
                    ? 'brightness(0.4) grayscale(0.6)' 
                    : 'brightness(0.9) grayscale(0.2)',
                  transition: 'filter 0.5s ease, transform 0.7s ease',
                }}
              />

              {/* Overlay gradient */}
              <div 
                className="absolute inset-0 transition-opacity duration-500"
                style={{
                  background: 'linear-gradient(to top, rgba(14,14,14,0.95) 0%, rgba(14,14,14,0.5) 40%, transparent 70%)',
                }}
              />

              {/* Gold accent line on hover */}
              <div 
                className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#C8A96E] transition-all duration-500"
                style={{
                  transform: hoveredIndex === index ? 'scaleX(1)' : 'scaleX(0)',
                  transformOrigin: 'left',
                }}
              />

              {/* Index number */}
              <span className="absolute top-4 right-4 font-serif text-[#C8A96E]/15 text-4xl font-normal leading-none select-none">
                {String(index + 1).padStart(2, '0')}
              </span>

              {/* Corner brackets */}
              <span className="absolute top-3 right-3 w-5 h-5 border-t border-r border-[#C8A96E]/0 group-hover:border-[#C8A96E]/60 transition-all duration-500" />
              <span className="absolute bottom-3 left-3 w-5 h-5 border-b border-l border-[#C8A96E]/0 group-hover:border-[#C8A96E]/60 transition-all duration-500" />

              {/* Content overlay */}
              <div className="absolute inset-0 flex flex-col justify-end p-5">
                {/* Role badge */}
                <span 
                  className="inline-block self-start px-2.5 py-1 mb-2 text-[0.55rem] font-medium tracking-[0.2em] text-[#C8A96E] uppercase bg-[#C8A96E]/10 backdrop-blur-sm rounded-full border border-[#C8A96E]/20 transition-all duration-500"
                  style={{
                    opacity: hoveredIndex === index ? 1 : 0.7,
                    transform: hoveredIndex === index ? 'translateY(0)' : 'translateY(8px)',
                  }}
                >
                  {work.subtitle}
                </span>

                {/* Name */}
                <h3 
                  className="font-serif text-lg md:text-xl font-normal text-[#E8E4DC] tracking-tight leading-tight transition-all duration-500"
                  style={{
                    transform: hoveredIndex === index ? 'translateY(0)' : 'translateY(4px)',
                  }}
                >
                  {work.title}
                </h3>

                {/* Description on hover */}
                <div 
                  className="overflow-hidden transition-all duration-500"
                  style={{
                    maxHeight: hoveredIndex === index ? '60px' : '0px',
                    opacity: hoveredIndex === index ? 1 : 0,
                  }}
                >
                  <p className="text-[0.65rem] text-[#E8E4DC]/50 mt-2 leading-relaxed">
                    {work.description || 'Crafting exceptional digital experiences with precision and passion.'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom CTA */}
      <div className="text-center mt-20">
        <p className="text-[0.8rem] text-[#E8E4DC]/30 mb-6">
          Want to join the crew?
        </p>
        <a 
          href="#contact" 
          className="inline-flex items-center gap-2 text-[0.72rem] tracking-[0.12em] uppercase px-8 py-3.5 border border-[#C8A96E]/40 text-[#C8A96E] hover:bg-[#C8A96E] hover:text-[#0E0E0E] transition-all duration-300 rounded-full"
        >
          <span>Join the Team</span>
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M7 17L17 7M17 7H7M17 7V17" />
          </svg>
        </a>
      </div>
    </div>
  );
};

export default ProofOfWork;