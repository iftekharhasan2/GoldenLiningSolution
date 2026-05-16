import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { cn } from '@/lib/utils';
import { motion } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

/* ─────────────────────────────────────────────
   HOME PAGE — Golden Lining Solutions
   ───────────────────────────────────────────── */

const ArrowUpRight = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M7 17L17 7M17 7H7M17 7V17" />
  </svg>
);

/* ─── NAVIGATION ─── */
const Navigation = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: "Work", href: "/works" },
    { label: "Services", href: "#services" },
    { label: "About", href: "#about" },
    { label: "Journal", href: "#journal" },
  ];

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b",
      scrolled 
        ? "bg-[#0E0E0E]/95 backdrop-blur-md border-[#E8D5A3]/20 py-3 md:py-4" 
        : "bg-transparent border-transparent py-4 md:py-6"
    )}>
      <div className="max-w-7xl mx-auto px-4 md:px-6 flex items-center justify-between">
        <a href="/" className="font-serif text-base md:text-lg tracking-[0.12em] text-[#F5F1EA] font-medium drop-shadow-[0_1px_3px_rgba(0,0,0,0.5)]">
          Golden Lining <span className="text-[#E8D5A3]">.</span>Solutions
        </a>

        {/* Mobile menu button */}
        <button 
          className="md:hidden text-[#F5F1EA] p-2 -mr-2" 
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {mobileOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>

        <div className={cn(
          "absolute top-full left-0 right-0 bg-[#0E0E0E]/98 backdrop-blur-md border-b border-[#E8D5A3]/10 flex-col items-center gap-6 py-8 md:static md:flex md:flex-row md:gap-10 md:py-0 md:bg-transparent md:border-none md:backdrop-blur-none",
          mobileOpen ? "flex" : "hidden md:flex"
        )}>
          {navItems.map((item) => (
            <a 
              key={item.label} 
              href={item.href} 
              onClick={() => setMobileOpen(false)}
              className="text-[0.75rem] tracking-[0.15em] uppercase text-[#F5F1EA]/70 hover:text-[#E8D5A3] transition-colors duration-300 font-medium"
            >
              {item.label}
            </a>
          ))}
        </div>
        <a href="#contact" className="hidden md:block text-[0.75rem] tracking-[0.1em] uppercase px-6 py-2.5 border border-[#E8D5A3]/70 text-[#E8D5A3] hover:bg-[#E8D5A3] hover:text-[#0E0E0E] transition-all duration-300 font-medium shadow-[0_0_10px_rgba(232,213,163,0.15)]">
          Start a project
        </a>
      </div>
    </nav>
  );
};

/* ─── PIN ROTATE COMPONENTS ─── */
const PinRotateIntro = ({ className, children }) => (
  <section
    data-pin-rotate-intro
    className={cn(
      'relative flex min-h-screen flex-col items-center justify-center bg-[#1a1a1a] px-4 md:px-[8vw] py-0 text-center text-white',
      className
    )}
  >
    {children}
  </section>
);

const PinRotateSection = ({ className, style = {}, children }) => (
  <section
    data-pin-rotate-section
    className={cn(
      'relative flex flex-col border-b border-black/25 bg-[#fcfcfc] px-4 md:px-[8vw] py-[5vh] md:py-[10vh] [perspective:1000px] md:flex-row md:justify-between md:gap-0',
      className
    )}
    style={{ transformStyle: 'preserve-3d', ...style }}
  >
    <div className="pin-rotate-overlay absolute inset-0 bg-black opacity-0 pointer-events-none" />
    {children}
  </section>
);

const PinRotateSections = ({ children, className }) => {
  const containerRef = useRef(null);

  useGSAP(
    () => {
      if (!containerRef.current) return;
      // Disable complex pin effects on mobile
      if (window.innerWidth < 768) return;

      const sections = Array.from(
        containerRef.current.querySelectorAll('[data-pin-rotate-section]')
      );
      if (sections.length === 0) return;

      const triggers = [];
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
            })
          );
          triggers.push(
            ScrollTrigger.create({
              trigger: sections[index + 1],
              start: 'top bottom',
              end: 'top top',
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
    { scope: containerRef }
  );

  return (
    <main ref={containerRef} className={cn('w-full overflow-x-hidden', className)}>
      {children}
    </main>
  );
};

/* ─── TECH STACK CAROUSEL ─── */
const TechStackCarousel = () => {
  const trackRef = useRef(null);
  const sectionRef = useRef(null);

  const technologies = [
    { name: 'React', icon: '⚛️', category: 'Frontend' },
    { name: 'Next.js', icon: '▲', category: 'Framework' },
    { name: 'TypeScript', icon: '🔷', category: 'Language' },
    { name: 'Tailwind CSS', icon: '🌊', category: 'Styling' },
    { name: 'Node.js', icon: '🟢', category: 'Backend' },
    { name: 'PostgreSQL', icon: '🐘', category: 'Database' },
    { name: 'GraphQL', icon: '◈', category: 'API' },
    { name: 'AWS', icon: '☁️', category: 'Cloud' },
    { name: 'Docker', icon: '🐳', category: 'DevOps' },
    { name: 'Figma', icon: '🎨', category: 'Design' },
    { name: 'GSAP', icon: '🎬', category: 'Animation' },
    { name: 'Three.js', icon: '🔺', category: '3D' },
    { name: 'Redis', icon: '🔴', category: 'Cache' },
    { name: 'Prisma', icon: '◆', category: 'ORM' },
    { name: 'Vercel', icon: '▲', category: 'Deploy' },
  ];

  const tripleTech = [...technologies, ...technologies, ...technologies];

  useGSAP(
    () => {
      if (!trackRef.current || !sectionRef.current) return;
      const track = trackRef.current;
      const totalWidth = track.scrollWidth / 3;
      gsap.set(track, { x: -totalWidth });
      const tween = gsap.to(track, {
        x: -totalWidth * 2,
        duration: 40,
        ease: 'none',
        repeat: -1,
        modifiers: {
          x: gsap.utils.unitize((x) => parseFloat(x) % totalWidth - totalWidth),
        },
      });
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top bottom',
        end: 'bottom top',
        onUpdate: (self) => {
          const velocity = Math.abs(self.getVelocity());
          const speedBoost = Math.min(velocity / 5000, 3);
          tween.timeScale(1 + speedBoost);
        },
      });
      return () => { tween.kill(); };
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="bg-[#0E0E0E] py-16 md:py-24 overflow-hidden border-t border-[#E8D5A3]/10">
      <div className="max-w-7xl mx-auto px-4 md:px-6 mb-8 md:mb-12">
        <p className="text-[0.65rem] tracking-[0.35em] uppercase text-[#E8D5A3] mb-4 md:mb-6">Our Arsenal</p>
        <h2 className="font-serif text-[clamp(1.6rem,4vw,3.5rem)] font-medium text-[#F5F1EA] leading-[1.15] max-w-xl drop-shadow-[0_2px_8px_rgba(0,0,0,0.4)]">
          Technology stack that powers excellence
        </h2>
      </div>
      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-[#0E0E0E] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-[#0E0E0E] to-transparent z-10 pointer-events-none" />
        <div ref={trackRef} className="flex gap-4 md:gap-6 py-6 md:py-8" style={{ width: 'max-content' }}>
          {tripleTech.map((tech, index) => (
            <div key={`${tech.name}-${index}`} className="group relative flex-shrink-0 w-52 md:w-64 bg-[#141414] border border-[#E8D5A3]/10 rounded-xl p-5 md:p-6 hover:border-[#E8D5A3]/40 transition-all duration-500 hover:bg-[#1a1a1a]">
              <div className="flex items-start justify-between mb-4">
                <span className="text-2xl md:text-3xl filter grayscale group-hover:grayscale-0 transition-all duration-500">{tech.icon}</span>
                <span className="text-[0.6rem] tracking-[0.2em] uppercase text-[#E8D5A3]/60 border border-[#E8D5A3]/20 px-2 py-1 rounded">{tech.category}</span>
              </div>
              <h3 className="font-serif text-lg md:text-xl text-[#F5F1EA] mb-1 group-hover:text-[#E8D5A3] transition-colors duration-300 font-medium drop-shadow-[0_1px_3px_rgba(0,0,0,0.5)]">{tech.name}</h3>
              <div className="w-8 h-px bg-[#E8D5A3]/30 group-hover:w-16 group-hover:bg-[#E8D5A3] transition-all duration-500" />
            </div>
          ))}
        </div>
      </div>
      <div className="relative mt-2 md:mt-4">
        <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-[#0E0E0E] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-[#0E0E0E] to-transparent z-10 pointer-events-none" />
        <ReverseCarousel technologies={technologies} />
      </div>
    </section>
  );
};

const ReverseCarousel = ({ technologies }) => {
  const trackRef = useRef(null);
  const tripleTech = [...technologies, ...technologies, ...technologies];

  useGSAP(
    () => {
      if (!trackRef.current) return;
      const track = trackRef.current;
      const totalWidth = track.scrollWidth / 3;
      gsap.set(track, { x: -totalWidth * 2 });
      gsap.to(track, {
        x: -totalWidth,
        duration: 35,
        ease: 'none',
        repeat: -1,
        modifiers: {
          x: gsap.utils.unitize((x) => {
            const val = parseFloat(x);
            return ((val % totalWidth) + totalWidth) % totalWidth - totalWidth;
          }),
        },
      });
    },
    { scope: trackRef }
  );

  return (
    <div ref={trackRef} className="flex gap-4 md:gap-6 py-6 md:py-8" style={{ width: 'max-content' }}>
      {tripleTech.map((tech, index) => (
        <div key={`rev-${tech.name}-${index}`} className="group relative flex-shrink-0 w-48 md:w-56 bg-[#141414] border border-[#E8D5A3]/10 rounded-xl p-4 md:p-5 hover:border-[#E8D5A3]/40 transition-all duration-500 hover:bg-[#1a1a1a]">
          <div className="flex items-center gap-3">
            <span className="text-xl md:text-2xl filter grayscale group-hover:grayscale-0 transition-all duration-500">{tech.icon}</span>
            <div>
              <h3 className="font-serif text-base md:text-lg text-[#F5F1EA] group-hover:text-[#E8D5A3] transition-colors duration-300">{tech.name}</h3>
              <span className="text-[0.6rem] tracking-[0.15em] uppercase text-[#F5F1EA]/40">{tech.category}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

/* ─── EXPANDABLE PANEL ─── */
const ExpandablePanel = ({
  panels, className, panelClassName, expandedWidth = "55%", collapsedWidth = "10%",
  minWidth = "80px", height = "85vh", gap = "0.75rem", borderRadius = "1.25rem",
  transitionDuration = "600ms", defaultExpanded = 0,
}) => {
  const [expandedIndex, setExpandedIndex] = useState(defaultExpanded);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const panelRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleClick = (index) => setExpandedIndex(index === expandedIndex ? -1 : index);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (panelRef.current && !panelRef.current.contains(event.target)) setExpandedIndex(-1);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="w-full overflow-x-auto pb-4 md:overflow-visible md:pb-0">
      <div ref={panelRef} className={cn("flex w-full max-w-[1400px] items-center justify-center mx-auto px-2 md:px-4", className)} style={{ height: isMobile ? '60vh' : height, gap, minWidth: 'fit-content' }}>
        {panels.map((panel, index) => {
          const isExpanded = expandedIndex === index;
          const isCollapsed = expandedIndex !== -1 && !isExpanded;
          const isHovered = hoveredIndex === index;
          return (
            <div
              key={index}
              onClick={() => handleClick(index)}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className={cn("relative h-full cursor-pointer overflow-hidden group", panelClassName)}
              style={{
                width: isExpanded ? (isMobile ? '70%' : expandedWidth) : (isMobile ? '50px' : collapsedWidth), 
                minWidth: isMobile ? '50px' : minWidth, 
                borderRadius, 
                transitionDuration,
                transitionProperty: "width, filter, transform", 
                transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
                filter: isCollapsed ? "brightness(0.5) grayscale(0.4)" : "none",
                transform: isHovered && !isExpanded ? "scale(1.02)" : "scale(1)",
              }}
            >
              <img src={panel.image} alt={panel.alt || panel.title} className="w-full h-full object-cover" style={{ objectPosition: panel.objectPosition || "center center" }} />
              <div className="absolute inset-0 transition-opacity duration-500" style={{
                background: isExpanded
                  ? "linear-gradient(to top, rgba(14,14,14,0.9) 0%, rgba(14,14,14,0.3) 50%, transparent 100%)"
                  : "linear-gradient(to top, rgba(14,14,14,0.7) 0%, transparent 60%)",
                opacity: isExpanded || isHovered ? 1 : 0.6,
              }} />
              {!isExpanded && (
                <div className="absolute inset-0 flex items-end justify-center pb-6 md:pb-10">
                  <h3 className="text-[#ef9904] font-serif font-medium tracking-[0.2em] uppercase text-xs whitespace-nowrap drop-shadow-[0_1px_4px_rgba(0,0,0,0.6)]" style={{ writingMode: "vertical-rl", textOrientation: "mixed", transform: "rotate(180deg)", opacity: isCollapsed ? 0.4 : 0.9, transition: "opacity 0.3s ease" }}>
                    {panel.title}
                  </h3>
                </div>
              )}
              {isExpanded && (
                <div className="absolute inset-0 flex flex-col justify-end p-5 md:p-8 lg:p-12">
                  <span className="inline-block self-start px-3 py-1.5 mb-3 md:mb-4 text-[0.6rem] md:text-[0.65rem] font-medium tracking-[0.2em] text-[#E8D5A3] uppercase bg-[#E8D5A3]/15 backdrop-blur-md rounded-full border border-[#E8D5A3]/30">{panel.category}</span>
                  <h2 className="font-serif text-xl md:text-3xl lg:text-5xl font-medium text-[#F5F1EA] mb-2 md:mb-3 tracking-tight leading-[1.1] drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">{panel.title}</h2>
                  <p className="text-[#F5F1EA]/85 text-xs md:text-sm lg:text-base max-w-lg mb-4 md:mb-6 leading-relaxed line-clamp-3 font-normal drop-shadow-[0_1px_4px_rgba(0,0,0,0.5)]">{panel.description}</p>
                  <div className="flex flex-wrap items-center gap-3 md:gap-5 text-[#F5F1EA]/70 text-[0.65rem] md:text-xs tracking-wider uppercase mb-4 md:mb-6 font-medium">
                    <span>{panel.year}</span><span className="w-1 h-1 rounded-full bg-[#E8D5A3]/50" /><span>{panel.client}</span><span className="w-1 h-1 rounded-full bg-[#E8D5A3]/50" /><span>{panel.role}</span>
                  </div>
                  <a href={panel.link || "#"} onClick={(e) => e.stopPropagation()} className="inline-flex items-center gap-2 text-[#E8D5A3] text-[0.65rem] md:text-xs tracking-[0.15em] uppercase font-semibold group/link hover:gap-3 transition-all duration-300 drop-shadow-[0_1px_4px_rgba(0,0,0,0.5)]">
                    <span className="border-b border-[#E8D5A3]/40 pb-0.5 group-hover/link:border-[#E8D5A3]">View Case Study</span>
                    <ArrowUpRight className="w-3.5 h-3.5 md:w-4 md:h-4" />
                  </a>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

/* ─── CREW SECTION (PROOF OF WORK) ─── */
const CrewSection = ({ title = 'The Crew', works, className }) => {
  const containerRef = useRef(null);
  const cardRefs = useRef([]);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  useGSAP(
    () => {
      const cards = cardRefs.current.filter(Boolean);
      if (cards.length === 0) return;
      gsap.fromTo(cards, { y: 80, opacity: 0, scale: 0.95 }, {
        y: 0, opacity: 1, scale: 1, duration: 0.9, stagger: 0.12, ease: 'power3.out',
        scrollTrigger: { trigger: containerRef.current, start: 'top 85%' },
      });
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className={cn('w-full bg-[#0B0B0F] px-4 md:px-6 py-20 md:py-28 text-white lg:px-12', className)}>
      <div className="mx-auto max-w-[1300px]">
        <div className="text-center mb-12 md:mb-20">
          <p className="text-[0.65rem] tracking-[0.35em] uppercase text-[#E8D5A3] mb-4 md:mb-6">Meet the Team</p>
          <h1 className="font-serif text-[clamp(2rem,5vw,4rem)] font-medium text-[#F5F1EA] leading-[1.15] mb-4 md:mb-6 drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]">The <em className="italic text-[#E8D5A3]">Crew</em></h1>
          <div className="w-12 h-px bg-[#E8D5A3] mx-auto mb-4 md:mb-6" />
          <p className="text-[0.8rem] md:text-[0.85rem] font-normal text-[#F5F1EA]/40 max-w-md mx-auto leading-[1.8]">A collective of strategists, designers, and engineers united by an obsession for craft.</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 lg:gap-5">
          {works.map((work, index) => (
            <div key={index} ref={(el) => { if (el) cardRefs.current[index] = el; }}
              className="group relative overflow-hidden cursor-pointer"
              style={{ borderRadius: '1rem', aspectRatio: '3/4' }}
              onMouseEnter={() => setHoveredIndex(index)} onMouseLeave={() => setHoveredIndex(null)}>
              <img src={work.image} alt={work.imageAlt ?? work.title}
                className="absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-110"
                style={{ filter: hoveredIndex !== null && hoveredIndex !== index ? 'brightness(0.4) grayscale(0.6)' : 'brightness(0.85) grayscale(0.3)', transition: 'filter 0.5s ease, transform 0.7s ease' }} />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(11,11,15,0.95) 0%, rgba(11,11,15,0.5) 40%, transparent 70%)' }} />
              <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#E8D5A3] transition-all duration-500" style={{ transform: hoveredIndex === index ? 'scaleX(1)' : 'scaleX(0)', transformOrigin: 'left' }} />
              <div className="absolute inset-0 flex flex-col justify-end p-4 md:p-5 lg:p-6">
                <span className="inline-block self-start px-2 py-1 md:px-2.5 md:py-1 mb-2 md:mb-3 text-[0.5rem] md:text-[0.55rem] font-medium tracking-[0.2em] text-[#E8D5A3] uppercase bg-[#E8D5A3]/10 backdrop-blur-sm rounded-full border border-[#E8D5A3]/20 transition-all duration-500"
                  style={{ opacity: hoveredIndex === index ? 1 : 0.7, transform: hoveredIndex === index ? 'translateY(0)' : 'translateY(8px)' }}>{work.subtitle}</span>
                <h3 className="font-serif text-base md:text-xl lg:text-2xl font-medium text-[#F5F1EA] tracking-tight leading-tight transition-all duration-500 drop-shadow-[0_1px_4px_rgba(0,0,0,0.5)]"
                  style={{ transform: hoveredIndex === index ? 'translateY(0)' : 'translateY(4px)' }}>{work.title}</h3>
                <div className="overflow-hidden transition-all duration-500" style={{ maxHeight: hoveredIndex === index ? '60px' : '0px', opacity: hoveredIndex === index ? 1 : 0 }}>
                  <p className="text-[0.7rem] md:text-[0.75rem] text-[#F5F1EA]/70 mt-2 leading-relaxed">{work.description || 'Crafting exceptional digital experiences with precision and passion.'}</p>
                </div>
                <div className="flex gap-2 md:gap-3 mt-2 md:mt-3 transition-all duration-500" style={{ opacity: hoveredIndex === index ? 1 : 0, transform: hoveredIndex === index ? 'translateY(0)' : 'translateY(10px)' }}>
                  {['Twitter', 'LinkedIn', 'Dribbble'].map((social) => (
                    <a key={social} href="#" className="text-[0.5rem] md:text-[0.55rem] tracking-[0.1em] uppercase text-[#F5F1EA]/40 hover:text-[#E8D5A3] transition-colors" onClick={(e) => e.stopPropagation()}>{social}</a>
                  ))}
                </div>
              </div>
              <div className="absolute top-3 right-3 md:top-4 md:right-4 w-5 h-5 md:w-6 md:h-6 border-t border-r border-[#E8D5A3]/0 group-hover:border-[#E8D5A3]/60 transition-all duration-500" />
              <div className="absolute top-3 right-3 md:top-4 md:right-4 w-5 h-5 md:w-6 md:h-6 border-t border-r border-[#E8D5A3]/0 group-hover:border-[#E8D5A3]/60 transition-all duration-500 delay-100" style={{ transform: 'translate(4px, -4px)' }} />
            </div>
          ))}
        </div>
        <div className="text-center mt-12 md:mt-20">
          <p className="text-[0.8rem] md:text-[0.85rem] text-[#F5F1EA]/50 mb-4 md:mb-6 font-medium">Want to join the crew?</p>
          <a href="#contact" className="inline-flex items-center gap-2 text-[0.7rem] md:text-[0.75rem] tracking-[0.12em] uppercase px-6 md:px-8 py-3 md:py-3.5 border border-[#E8D5A3]/60 text-[#E8D5A3] hover:bg-[#E8D5A3] hover:text-[#0B0B0F] transition-all duration-300 rounded-full font-semibold shadow-[0_0_15px_rgba(232,213,163,0.15)]">
            <span>Join the Team</span><ArrowUpRight className="w-3 h-3 md:w-3.5 md:h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
};

/* ─── CONTACT SECTION ─── */
const ContactSection = () => {
  const sectionRef = useRef(null);

  useGSAP(() => {
    if (!sectionRef.current) return;
    gsap.fromTo(sectionRef.current.querySelectorAll('.contact-animate'), { y: 60, opacity: 0 }, {
      y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: 'power3.out',
      scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
    });
  }, { scope: sectionRef });

  const handleSubmit = (e) => { e.preventDefault(); };

  return (
    <section ref={sectionRef} id="contact" className="bg-[#0E0E0E] py-20 md:py-32 border-t border-[#E8D5A3]/20">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
          <div className="contact-animate">
            <p className="text-[0.65rem] tracking-[0.35em] uppercase text-[#E8D5A3] mb-4 md:mb-6">Get in Touch</p>
            <h2 className="font-serif font-medium text-[clamp(1.8rem,5vw,4rem)] leading-[1.15] text-[#F5F1EA] mb-4 md:mb-6 drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]">Let&apos;s build something<br /><em className="italic text-[#E8D5A3]">remarkable</em> together</h2>
            <div className="w-10 h-px bg-[#E8D5A3] my-6 md:my-8" />
            <p className="text-[0.9rem] md:text-[0.95rem] font-normal text-[#F5F1EA]/65 max-w-md leading-[1.85] mb-8 md:mb-12">From the first brief to final launch, we partner with you at every step. Tell us about your project — we&apos;d love to hear from you.</p>
            <div className="space-y-5 md:space-y-6">
              {[
                { icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />, label: 'Email', value: 'hello@Golden Lining Solutions', href: 'mailto:hello@Golden Lining Solutions' },
                { icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />, label: 'Phone', value: '+1 (234) 567-890', href: 'tel:+1234567890' },
                { icon: <><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></>, label: 'Location', value: <>123 Design District<br />San Francisco, CA 94102</> },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3 md:gap-4">
                  <div className="w-9 h-9 md:w-10 md:h-10 rounded-full border border-[#E8D5A3]/30 flex items-center justify-center flex-shrink-0">
                    <svg className="w-3.5 h-3.5 md:w-4 md:h-4 text-[#E8D5A3]" fill="none" stroke="currentColor" viewBox="0 0 24 24">{item.icon}</svg>
                  </div>
                  <div>
                    <p className="text-[0.65rem] md:text-[0.7rem] tracking-[0.15em] uppercase text-[#F5F1EA]/40 mb-1">{item.label}</p>
                    {item.href ? <a href={item.href} className="text-sm md:text-base text-[#F5F1EA] hover:text-[#E8D5A3] transition-colors font-medium">{item.value}</a> : <p className="text-sm md:text-base text-[#F5F1EA] font-medium">{item.value}</p>}
                  </div>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-3 md:gap-4 mt-8 md:mt-12">
              {['Twitter', 'LinkedIn', 'Dribbble', 'GitHub'].map((social) => (
                <a key={social} href="#" className="text-[0.6rem] md:text-[0.65rem] tracking-[0.1em] uppercase px-3 md:px-4 py-2 border border-[#E8D5A3]/20 text-[#F5F1EA]/60 hover:border-[#E8D5A3]/60 hover:text-[#E8D5A3] transition-all">{social}</a>
              ))}
            </div>
          </div>
          <div className="contact-animate">
            <form onSubmit={handleSubmit} className="bg-[#141414] border border-[#E8D5A3]/10 rounded-2xl p-6 md:p-8 lg:p-10">
              <div className="space-y-5 md:space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
                  <div>
                    <label className="block text-[0.65rem] md:text-[0.7rem] tracking-[0.15em] uppercase text-[#F5F1EA]/60 mb-2 md:mb-3 font-medium">Name</label>
                    <input type="text" placeholder="John Doe" className="w-full bg-[#0E0E0E] border border-[#E8D5A3]/20 rounded-lg px-4 py-3 text-[#F5F1EA] text-sm placeholder:text-[#F5F1EA]/40 focus:border-[#E8D5A3]/60 focus:outline-none transition-colors" />
                  </div>
                  <div>
                    <label className="block text-[0.65rem] md:text-[0.7rem] tracking-[0.15em] uppercase text-[#F5F1EA]/60 mb-2 md:mb-3 font-medium">Email</label>
                    <input type="email" placeholder="john@company.com" className="w-full bg-[#0E0E0E] border border-[#E8D5A3]/20 rounded-lg px-4 py-3 text-[#F5F1EA] text-sm placeholder:text-[#F5F1EA]/40 focus:border-[#E8D5A3]/60 focus:outline-none transition-colors" />
                  </div>
                </div>
                <div>
                  <label className="block text-[0.65rem] md:text-[0.7rem] tracking-[0.15em] uppercase text-[#F5F1EA]/60 mb-2 md:mb-3 font-medium">Company</label>
                  <input type="text" placeholder="Your company name" className="w-full bg-[#0E0E0E] border border-[#E8D5A3]/20 rounded-lg px-4 py-3 text-[#F5F1EA] text-sm placeholder:text-[#F5F1EA]/40 focus:border-[#E8D5A3]/60 focus:outline-none transition-colors" />
                </div>
                <div>
                  <label className="block text-[0.65rem] md:text-[0.7rem] tracking-[0.15em] uppercase text-[#F5F1EA]/60 mb-2 md:mb-3 font-medium">Service Interest</label>
                  <select className="w-full bg-[#0E0E0E] border border-[#E8D5A3]/20 rounded-lg px-4 py-3 text-[#F5F1EA] text-sm focus:border-[#E8D5A3]/60 focus:outline-none transition-colors appearance-none cursor-pointer">
                    <option value="">Select a service</option>
                    <option value="brand">Brand & Strategy</option>
                    <option value="design">Digital Design</option>
                    <option value="engineering">Web Development</option>
                    <option value="growth">Digital Marketing</option>
                    <option value="retainer">Ongoing Partnership</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[0.65rem] md:text-[0.7rem] tracking-[0.15em] uppercase text-[#F5F1EA]/60 mb-2 md:mb-3 font-medium">Project Details</label>
                  <textarea rows={4} placeholder="Tell us about your project, goals, and timeline..." className="w-full bg-[#0E0E0E] border border-[#E8D5A3]/20 rounded-lg px-4 py-3 text-[#F5F1EA] text-sm placeholder:text-[#F5F1EA]/40 focus:border-[#E8D5A3]/60 focus:outline-none transition-colors resize-none" />
                </div>
                <button type="submit" className="w-full text-[0.7rem] md:text-[0.75rem] tracking-[0.12em] uppercase px-6 md:px-8 py-3.5 md:py-4 bg-[#E8D5A3] text-[#0E0E0E] font-semibold hover:opacity-90 transition-opacity rounded-lg shadow-[0_2px_10px_rgba(232,213,163,0.3)]">Send Message</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ─── DATA ─── */
const services = [
  { num: "(01)", tag: "Brand & Strategy", title: "Strategic Brand Identity", desc: "We build cohesive brand systems that communicate your values with precision — from positioning and visual language to messaging and voice.", pills: ["Positioning", "Visual Identity", "Brand Voice", "Guidelines"], img: "https://images.unsplash.com/photo-1634942537034-2531766767d1?w=900&q=80", imgAlt: "Brand identity design", imgLabel: "Brand Systems", reverse: false },
  { num: "(02)", tag: "Digital Design", title: "Interface & Experience Design", desc: "Every screen is a conversation. We design intuitive digital products that balance aesthetic refinement with functional clarity and usability.", pills: ["UX Research", "UI Design", "Prototyping", "Design Systems"], img: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=900&q=80", imgAlt: "UI/UX design", imgLabel: "UI/UX Design", reverse: true },
  { num: "(03)", tag: "Engineering", title: "Web Development & Engineering", desc: "We engineer performant, scalable digital products — from marketing sites to complex web applications — built to last and grow with your business.", pills: ["React / Next.js", "Headless CMS", "API Integration", "Performance"], img: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=900&q=80", imgAlt: "Web development", imgLabel: "Engineering", reverse: false },
  { num: "(04)", tag: "Growth", title: "Digital Marketing & SEO", desc: "Visibility without compromise. We pair technical SEO rigour with content strategy to drive qualified traffic and sustainable organic growth.", pills: ["Technical SEO", "Content Strategy", "Analytics", "Conversion"], img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900&q=80", imgAlt: "Digital marketing analytics", imgLabel: "Growth & SEO", reverse: true },
  { num: "(05)", tag: "Ongoing Partnership", title: "Retainer & Support", desc: "Long-term partnerships that evolve your digital presence continuously — iterating, optimising, and expanding as your business grows.", pills: ["Monthly Retainer", "Maintenance", "A/B Testing", "Reporting"], img: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=900&q=80", imgAlt: "Team collaboration", imgLabel: "Partnership", reverse: false },
];

const portfolioPanels = [
  { image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&q=80", title: "Lumina Brand System", category: "Brand Identity", description: "Complete visual identity overhaul for a sustainable architecture firm, encompassing logo architecture, typographic systems, and comprehensive brand guidelines.", year: "2025", client: "Lumina Atelier", role: "Lead Brand Designer", link: "#case-lumina", objectPosition: "center 30%" },
  { image: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=1200&q=80", title: "Meridian Finance App", category: "UI/UX Design", description: "Mobile banking experience redesign focused on simplifying complex financial workflows while maintaining institutional trust and security perception.", year: "2025", client: "Meridian Capital", role: "Product Designer", link: "#case-meridian", objectPosition: "center top" },
  { image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80", title: "Artisan E-Commerce", category: "Web Development", description: "Headless Shopify build for a luxury ceramics studio, featuring 3D product configurators and seamless editorial content integration.", year: "2024", client: "Atelier Forma", role: "Frontend Engineer", link: "#case-artisan", objectPosition: "center 40%" },
  { image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=1200&q=80", title: "Nova SaaS Platform", category: "Design System", description: "End-to-end design system creation for a B2B analytics platform, unifying fragmented UI patterns across 12 product modules.", year: "2024", client: "Nova Analytics", role: "Design Systems Lead", link: "#case-nova", objectPosition: "center 20%" },
  { image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=1200&q=80", title: "Catalyst Rebrand", category: "Brand Strategy", description: "Strategic repositioning and visual identity for a venture capital firm, balancing institutional credibility with forward-thinking innovation.", year: "2024", client: "Catalyst Ventures", role: "Strategy Director", link: "#case-catalyst", objectPosition: "center center" },
  { image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=80", title: "Horizon Real Estate", category: "Digital Experience", description: "Immersive property showcase platform with virtual staging capabilities and neighbourhood lifestyle integration.", year: "2023", client: "Horizon Properties", role: "Creative Director", link: "#case-horizon", objectPosition: "center 35%" },
  { image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=1200&q=80", title: "Ember Wellness", category: "E-Commerce", description: "Direct-to-consumer launch for a holistic wellness brand, combining editorial storytelling with conversion-optimized product experiences.", year: "2023", client: "Ember Wellness", role: "Art Director", link: "#case-ember", objectPosition: "center 25%" },
];

const crewMembers = [
  { image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80', imageAlt: 'Marcus Chen - Creative Director', title: 'Marcus Chen', subtitle: 'Creative Director', description: '15 years shaping brands for Fortune 500 companies. Believes design is strategy made visible.' },
  { image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&q=80', imageAlt: 'Elena Vasquez - Lead Designer', title: 'Elena Vasquez', subtitle: 'Lead Designer', description: 'Award-winning UI/UX specialist. Obsessed with micro-interactions and pixel perfection.' },
  { image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=600&q=80', imageAlt: 'James Whitfield - Tech Lead', title: 'James Whitfield', subtitle: 'Tech Lead', description: 'Full-stack architect with a passion for performance and clean, scalable code.' },
  { image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=600&q=80', imageAlt: 'Sophia Nakamura - Brand Strategist', title: 'Sophia Nakamura', subtitle: 'Brand Strategist', description: 'Former brand consultant at Pentagram. Turns business goals into compelling narratives.' },
  { image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&q=80', imageAlt: 'David Okonkwo - Motion Designer', title: 'David Okonkwo', subtitle: 'Motion Designer', description: 'Bringing interfaces to life with purposeful animation and cinematic transitions.' },
  { image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&q=80', imageAlt: 'Aria Lindqvist - UX Researcher', title: 'Aria Lindqvist', subtitle: 'UX Researcher', description: 'Human-centered design advocate. Turns user insights into product decisions.' },
  { image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600&q=80', imageAlt: 'Kai Tanaka - Frontend Engineer', title: 'Kai Tanaka', subtitle: 'Frontend Engineer', description: 'React wizard and WebGL enthusiast. Pushing the boundaries of browser experiences.' },
  { image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600&q=80', imageAlt: 'Maya Patel - Project Manager', title: 'Maya Patel', subtitle: 'Project Manager', description: 'Orchestrating complex projects with calm precision. The glue that holds it all together.' },
  { image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=600&q=80', imageAlt: 'Lucas Bergström - 3D Artist', title: 'Lucas Bergström', subtitle: '3D Artist', description: 'Creating immersive 3D experiences and WebGL environments that captivate and convert.' },
  { image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=600&q=80', imageAlt: 'Zara Hassan - Content Strategist', title: 'Zara Hassan', subtitle: 'Content Strategist', description: 'Wordsmith and SEO expert. Crafting narratives that rank and resonate.' },
  { image: 'https://images.unsplash.com/photo-1504257432389-52343af06ae3?w=600&q=80', imageAlt: 'Noah Fischer - DevOps Engineer', title: 'Noah Fischer', subtitle: 'DevOps Engineer', description: 'Infrastructure architect ensuring our work performs flawlessly at any scale.' },
  { image: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=600&q=80', imageAlt: 'Isla Romano - Art Director', title: 'Isla Romano', subtitle: 'Art Director', description: 'Visual storyteller with an eye for composition that elevates every project.' },
];

const testimonials = [
  { quote: "Golden Lining Solutions transformed our digital presence entirely. Their strategic approach to brand and design resulted in a 140% increase in qualified leads within the first quarter.", author: "Sarah Chen", role: "CMO, Lumina Atelier", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80" },
  { quote: "The attention to detail and technical excellence is unmatched. They didn't just build a website — they engineered a growth platform.", author: "Marcus Webb", role: "Founder, Nova Analytics", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80" },
  { quote: "Working with this team felt like a true partnership. They understood our vision and elevated it beyond what we imagined possible.", author: "Elena Rodriguez", role: "Director, Catalyst Ventures", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80" },
];

/* ─── HOME PAGE ─── */
const HomePage = () => {
  return (
    <div className="bg-[#0E0E0E] min-h-screen font-sans antialiased selection:bg-[#E8D5A3]/30 selection:text-[#F5F1EA]">
      <Navigation />

      {/* ── HERO / PIN ROTATE ── */}
      <PinRotateSections>
        <PinRotateIntro className="!bg-[#0E0E0E] !pt-24 !px-4 md:!px-[8vw] relative">
          <p className="text-[0.6rem] md:text-[0.65rem] tracking-[0.35em] uppercase text-[#E8D5A3] mb-6 md:mb-8">Web Studio — Est. 2019</p>
          <h1 className="font-serif font-normal text-[clamp(1.8rem,5.5vw,4.5rem)] leading-[1.15] text-[#F5F1EA] max-w-[680px] mb-4 md:mb-6 px-2 drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]">
            We craft <em className="italic text-[#E8D5A3]">digital</em><br />experiences that endure
          </h1>

          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
              className="text-[0.7rem] md:text-[1.25rem] tracking-[0.25em] uppercase text-[#F5F1EA]/30"
            >
              Scroll Down to explore
            </motion.span>
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 40, opacity: 1 }}
              transition={{
                duration: 1.2,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
              }}
              className="w-px bg-gradient-to-b from-[#C8A96E] to-transparent"
            />
            <motion.div
              animate={{ y: [0, 6, 0], opacity: [0.3, 1, 0.3] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="w-1.5 h-1.5 rounded-full bg-[#E8D5A3]"
            />
          </div>
        </PinRotateIntro>

        {services.map(({ num, tag, title, desc, pills, img, imgAlt, imgLabel, reverse }) => (
          <PinRotateSection key={num} className="!bg-[#F7F4EE] !border-b !border-[#D4C9B0]/60 min-h-screen !items-center !pt-24">
            <div className={`relative z-10 w-full max-w-[1000px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-20 items-center ${reverse ? "md:[direction:rtl]" : ""}`}>
              <div className={`flex flex-col gap-4 md:gap-5 ${reverse ? "md:[direction:ltr]" : ""}`}>
                <span className="text-[1rem] md:text-[1.25rem] tracking-[0.3em] uppercase text-[#ebb01a]">
                  {tag}
                </span>
                <h2 className="font-serif font-medium text-[clamp(1.4rem,3vw,2.6rem)] leading-[1.2] text-[#0F0F0F] drop-shadow-[0_1px_2px_rgba(0,0,0,0.1)]">{title}</h2>
                <p className="text-[0.8rem] md:text-[0.85rem] font-normal text-[#0F0F0F]/55 leading-[1.9] max-w-none md:max-w-[360px]">{desc}</p>
                <div className="flex flex-wrap gap-2 mt-1">
                  {pills.map((p) => <span key={p} className="text-[1rem] md:text-[0.62rem] tracking-[0.1em] uppercase px-3 py-1.5 border border-[#a27606] text-[#0F0F0F]">{p}</span>)}
                </div>
<a
  href="#"
  className="mt-2 inline-flex items-center gap-2 text-[0.7rem] md:text-[0.75rem] tracking-[0.1em] uppercase text-[#ffba0c] no-underline group font-semibold relative overflow-hidden"
>
  <span className="relative border-b border-[#E8D5A3]/40 pb-px transition-all duration-300 group-hover:border-[#0f0d07] group-hover:tracking-[0.15em]">
    Learn more
  </span>

  <ArrowUpRight className="w-3 h-3 md:w-3.5 md:h-3.5 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:rotate-12" />

  {/* Glow line */}
  <span className="absolute left-0 bottom-0 h-[1px] w-0 bg-[#ffba0c] transition-all duration-500 group-hover:w-[3px]" />
</a>
              </div>
              <div className={`relative ${reverse ? "md:[direction:ltr]" : ""}`}>
                <div className="relative overflow-hidden aspect-[4/3] border border-[#E8D5A3]/25 bg-[#EDE9E0]">
                  <img src={img} alt={imgAlt} className="w-full h-full object-cover opacity-80 hover:opacity-95 hover:scale-[1.03] transition-all duration-500" />
                  <span className="absolute bottom-3 left-3 text-[0.6rem] md:text-[0.65rem] tracking-[0.2em] uppercase text-[#E8D5A3] bg-[#0E0E0E]/85 px-2 py-1 font-medium shadow-[0_1px_4px_rgba(0,0,0,0.3)]">{imgLabel}</span>
                  <span className="absolute top-3 right-3 w-3 h-3 md:w-4 md:h-4 border-t border-r border-[#E8D5A3]" />
                </div>
              </div>
            </div>
          </PinRotateSection>
        ))}
      </PinRotateSections>

      {/* ── TECH STACK ── */}
      <TechStackCarousel />

      {/* ── PORTFOLIO ── */}
      <section id="work" className="bg-[#0E0E0E] py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 md:px-6 mb-10 md:mb-16">
          <p className="text-[0.65rem] md:text-[0.7rem] tracking-[0.35em] uppercase text-[#E8D5A3] mb-4 md:mb-6 font-semibold">Selected Work</p>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 md:gap-6">
            <h2 className="font-serif text-[clamp(1.6rem,4vw,3.5rem)] font-medium text-[#F5F1EA] leading-[1.15] max-w-xl drop-shadow-[0_2px_8px_rgba(0,0,0,0.4)]">Projects that define our craft</h2>
            <p className="text-[0.8rem] md:text-[0.85rem] text-[#F5F1EA]/40 max-w-sm leading-[1.8]">Each project represents a deep collaboration with clients who demand excellence. Click to explore.</p>
          </div>
        </div>
        <ExpandablePanel panels={portfolioPanels} height="80vh" gap="0.5rem md:0.75rem" borderRadius="1rem md:1.25rem" expandedWidth="58%" collapsedWidth="9%" minWidth="70px" />
        <div className="max-w-7xl mx-auto px-4 md:px-6 mt-10 md:mt-16 text-center">
          <a href="/works" className="inline-flex items-center gap-2 md:gap-3 text-[0.7rem] md:text-[0.75rem] tracking-[0.12em] uppercase px-8 md:px-10 py-3.5 md:py-4 border border-[#E8D5A3]/60 text-[#E8D5A3] hover:bg-[#E8D5A3] hover:text-[#0E0E0E] transition-all duration-300 rounded-full font-semibold shadow-[0_0_15px_rgba(232,213,163,0.15)]">
            <span>View All Projects</span><ArrowUpRight className="w-3.5 h-3.5 md:w-4 md:h-4" />
          </a>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="bg-[#F7F4EE] py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center mb-12 md:mb-20">
            <p className="text-[0.65rem] md:text-[0.7rem] tracking-[0.35em] uppercase text-[#E8D5A3] mb-4 md:mb-6 font-semibold">Client Words</p>
            <h2 className="font-serif text-[clamp(1.6rem,4vw,3rem)] font-medium text-[#0F0F0F] drop-shadow-[0_1px_2px_rgba(0,0,0,0.1)]">Trusted by industry leaders</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-8">
            {testimonials.map(({ quote, author, role, avatar }, index) => (
              <div key={index} className="bg-white border border-[#E8D5A3]/15 p-6 md:p-8 lg:p-10 flex flex-col hover:shadow-lg hover:shadow-[#C8A96E]/5 transition-shadow duration-500">
                <div className="text-[#E8D5A3] text-4xl md:text-5xl font-serif leading-none mb-4 md:mb-6">&ldquo;</div>
                <p className="text-[0.85rem] md:text-[0.9rem] text-[#0F0F0F]/80 leading-[1.9] mb-6 md:mb-8 flex-grow font-normal">{quote}</p>
                <div className="flex items-center gap-3 md:gap-4 pt-5 md:pt-6 border-t border-[#E8D5A3]/10">
                  <img src={avatar} alt={author} className="w-9 h-9 md:w-10 md:h-10 rounded-full object-cover grayscale" />
                  <div>
                    <p className="text-[0.8rem] md:text-[0.85rem] font-semibold text-[#0F0F0F]">{author}</p>
                    <p className="text-[0.65rem] md:text-[0.7rem] text-[#0F0F0F]/40">{role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CREW ── */}
      <CrewSection title="The Crew" works={crewMembers} className="border-t border-[#E8D5A3]/10" />

      {/* ── CONTACT ── */}
      <ContactSection />

      {/* ── FOOTER ── */}
      <footer className="bg-[#0E0E0E] border-t border-[#E8D5A3]/10 py-8 md:py-12">
        <div className="max-w-7xl mx-auto px-4 md:px-6 flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6">
          <span className="font-serif text-[0.8rem] md:text-[0.9rem] tracking-[0.12em] text-[#F5F1EA]/60">Golden Lining Solutions<span className="text-[#E8D5A3]">.</span>STUDIO</span>
          <p className="text-[0.6rem] md:text-[0.65rem] text-[#F5F1EA]/25 tracking-wider">&copy; 2026 Golden Lining Solutions. All rights reserved.</p>
          <div className="flex gap-4 md:gap-6">
            {["Twitter", "LinkedIn", "Dribbble"].map((social) => (
              <a key={social} href="#" className="text-[0.6rem] md:text-[0.65rem] tracking-[0.1em] uppercase text-[#F5F1EA]/30 hover:text-[#E8D5A3] transition-colors">{social}</a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;