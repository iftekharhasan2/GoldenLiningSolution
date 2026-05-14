import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { cn } from '@/lib/utils';

gsap.registerPlugin(ScrollTrigger);

/* ─────────────────────────────────────────────
   PIN ROTATE SECTIONS COMPONENT
   ───────────────────────────────────────────── */
export const PinRotateIntro = ({ className, children }) => (
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

export const PinRotateSection = ({ className, style = {}, children }) => (
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

const PinRotateSections = ({ children, className }) => {
  const containerRef = useRef(null);

  useGSAP(
    () => {
      if (!containerRef.current) return;

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

/* ─────────────────────────────────────────────
   TECHNOLOGY STACK CAROUSEL
   ───────────────────────────────────────────── */
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

      return () => {
        tween.kill();
      };
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="bg-[#0E0E0E] py-24 overflow-hidden border-t border-[#C8A96E]/10">
      <div className="max-w-7xl mx-auto px-6 mb-12">
        <p className="text-[0.65rem] tracking-[0.35em] uppercase text-[#C8A96E] mb-6">
          Our Arsenal
        </p>
        <h2 className="font-serif text-[clamp(2rem,4vw,3.5rem)] font-normal text-[#E8E4DC] leading-[1.15] max-w-xl">
          Technology stack that powers excellence
        </h2>
      </div>

      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#0E0E0E] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#0E0E0E] to-transparent z-10 pointer-events-none" />

        <div
          ref={trackRef}
          className="flex gap-6 py-8"
          style={{ width: 'max-content' }}
        >
          {tripleTech.map((tech, index) => (
            <div
              key={`${tech.name}-${index}`}
              className="group relative flex-shrink-0 w-64 bg-[#141414] border border-[#C8A96E]/10 rounded-xl p-6 hover:border-[#C8A96E]/40 transition-all duration-500 hover:bg-[#1a1a1a]"
            >
              <div className="flex items-start justify-between mb-4">
                <span className="text-3xl filter grayscale group-hover:grayscale-0 transition-all duration-500">
                  {tech.icon}
                </span>
                <span className="text-[0.6rem] tracking-[0.2em] uppercase text-[#C8A96E]/60 border border-[#C8A96E]/20 px-2 py-1 rounded">
                  {tech.category}
                </span>
              </div>
              <h3 className="font-serif text-xl text-[#E8E4DC] mb-1 group-hover:text-[#C8A96E] transition-colors duration-300">
                {tech.name}
              </h3>
              <div className="w-8 h-px bg-[#C8A96E]/30 group-hover:w-16 group-hover:bg-[#C8A96E] transition-all duration-500" />
            </div>
          ))}
        </div>
      </div>

      <div className="relative mt-4">
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#0E0E0E] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#0E0E0E] to-transparent z-10 pointer-events-none" />

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
    <div
      ref={trackRef}
      className="flex gap-6 py-8"
      style={{ width: 'max-content' }}
    >
      {tripleTech.map((tech, index) => (
        <div
          key={`rev-${tech.name}-${index}`}
          className="group relative flex-shrink-0 w-56 bg-[#141414] border border-[#C8A96E]/10 rounded-xl p-5 hover:border-[#C8A96E]/40 transition-all duration-500 hover:bg-[#1a1a1a]"
        >
          <div className="flex items-center gap-3">
            <span className="text-2xl filter grayscale group-hover:grayscale-0 transition-all duration-500">
              {tech.icon}
            </span>
            <div>
              <h3 className="font-serif text-lg text-[#E8E4DC] group-hover:text-[#C8A96E] transition-colors duration-300">
                {tech.name}
              </h3>
              <span className="text-[0.6rem] tracking-[0.15em] uppercase text-[#E8E4DC]/40">
                {tech.category}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

/* ─────────────────────────────────────────────
   PROOF OF WORK (CREW SECTION)
   ───────────────────────────────────────────── */
const ProofOfWork = ({
  title = 'My Works',
  works,
  className,
}) => {
  const containerRef = useRef(null);
  const imageRefs = useRef([]);
  const [isDesktop, setIsDesktop] = useState(true);

  useEffect(() => {
    const check = () => setIsDesktop(typeof window !== 'undefined' ? window.innerWidth > 768 : true);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  useEffect(() => {
    const images = imageRefs.current.filter(Boolean);
    if (images.length === 0) return;

    const yOffset = isDesktop ? 500 : 350;
    const startTrigger = isDesktop ? 'top 100%' : 'top 120%';

    const triggers = [];

    images.forEach((imgEl, index) => {
      if (!imgEl) return;

      gsap.set(imgEl, {
        rotation: index % 2 === 0 ? -50 : 50,
        transformOrigin: 'center center',
        y: yOffset,
        opacity: 0,
      });

      const st = ScrollTrigger.create({
        trigger: imgEl,
        start: startTrigger,
        onEnter: () => {
          gsap.to(imgEl, {
            rotation: 0,
            y: 0,
            opacity: 1,
            duration: 1,
            ease: 'power2.inOut',
            delay: isDesktop && index % 2 === 1 ? 0.25 : 0,
          });
        },
      });
      triggers.push(st);
    });

    return () => triggers.forEach((t) => t.kill());
  }, [works, isDesktop]);

  return (
    <div ref={containerRef} className={cn('w-full bg-[#0B0B0F] px-6 py-20 text-white md:px-12 md:py-20', className)}>
      <div className="mx-auto max-w-[1200px]">
        <h1 className="mb-16 text-center text-3xl font-normal md:text-5xl font-serif tracking-tight">
          {title}
        </h1>
        <div className="flex flex-wrap gap-16">
          {works.map((work, index) => (
            <div
              key={index}
              className="mt-16 flex w-full flex-col md:w-[calc(50%-2rem)]"
            >
              <div
                ref={(el) => {
                  if (el) imageRefs.current[index] = el;
                }}
                className="relative w-full overflow-hidden"
              >
                <img
                  src={work.image}
                  alt={work.imageAlt ?? work.title}
                  className="aspect-square w-full object-cover object-top"
                />
              </div>
              <p className="mt-4 font-serif text-lg uppercase tracking-wider text-[#C8A96E]">{work.title}</p>
              <span className="mt-1 text-sm text-white/50 tracking-wide">{work.subtitle}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────
   CONTACT SECTION
   ───────────────────────────────────────────── */
const ContactSection = () => {
  const sectionRef = useRef(null);
  const formRef = useRef(null);

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      gsap.fromTo(
        sectionRef.current.querySelectorAll('.contact-animate'),
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
        }
      );
    },
    { scope: sectionRef }
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="bg-[#0E0E0E] py-32 border-t border-[#C8A96E]/20"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left: Info */}
          <div className="contact-animate">
            <p className="text-[0.65rem] tracking-[0.35em] uppercase text-[#C8A96E] mb-6">
              Get in Touch
            </p>
            <h2 className="font-serif font-normal text-[clamp(2.2rem,5vw,4rem)] leading-[1.15] text-[#E8E4DC] mb-6">
              Let's build something
              <br />
              <em className="italic text-[#C8A96E]">remarkable</em> together
            </h2>
            <div className="w-10 h-px bg-[#C8A96E] my-8" />
            <p className="text-[0.9rem] font-light text-[#E8E4DC]/45 max-w-md leading-[1.85] mb-12">
              From the first brief to final launch, we partner with you at every step. Tell us about your project — we'd love to hear from you.
            </p>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full border border-[#C8A96E]/30 flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4 text-[#C8A96E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-[0.7rem] tracking-[0.15em] uppercase text-[#E8E4DC]/40 mb-1">Email</p>
                  <a href="mailto:hello@Golden Lining Solutions" className="text-[#E8E4DC] hover:text-[#C8A96E] transition-colors">
                    hello@Golden Lining Solutions
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full border border-[#C8A96E]/30 flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4 text-[#C8A96E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <p className="text-[0.7rem] tracking-[0.15em] uppercase text-[#E8E4DC]/40 mb-1">Phone</p>
                  <a href="tel:+1234567890" className="text-[#E8E4DC] hover:text-[#C8A96E] transition-colors">
                    +1 (234) 567-890
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full border border-[#C8A96E]/30 flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4 text-[#C8A96E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-[0.7rem] tracking-[0.15em] uppercase text-[#E8E4DC]/40 mb-1">Location</p>
                  <p className="text-[#E8E4DC]">
                    123 Design District<br />
                    San Francisco, CA 94102
                  </p>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex gap-4 mt-12">
              {['Twitter', 'LinkedIn', 'Dribbble', 'GitHub'].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="text-[0.65rem] tracking-[0.1em] uppercase px-4 py-2 border border-[#C8A96E]/20 text-[#E8E4DC]/60 hover:border-[#C8A96E]/60 hover:text-[#C8A96E] transition-all"
                >
                  {social}
                </a>
              ))}
            </div>
          </div>

          {/* Right: Form */}
          <div ref={formRef} className="contact-animate">
            <form onSubmit={handleSubmit} className="bg-[#141414] border border-[#C8A96E]/10 rounded-2xl p-8 md:p-10">
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[0.65rem] tracking-[0.15em] uppercase text-[#E8E4DC]/40 mb-3">
                      Name
                    </label>
                    <input
                      type="text"
                      placeholder="John Doe"
                      className="w-full bg-[#0E0E0E] border border-[#C8A96E]/20 rounded-lg px-4 py-3 text-[#E8E4DC] text-sm placeholder:text-[#E8E4DC]/20 focus:border-[#C8A96E]/60 focus:outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-[0.65rem] tracking-[0.15em] uppercase text-[#E8E4DC]/40 mb-3">
                      Email
                    </label>
                    <input
                      type="email"
                      placeholder="john@company.com"
                      className="w-full bg-[#0E0E0E] border border-[#C8A96E]/20 rounded-lg px-4 py-3 text-[#E8E4DC] text-sm placeholder:text-[#E8E4DC]/20 focus:border-[#C8A96E]/60 focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[0.65rem] tracking-[0.15em] uppercase text-[#E8E4DC]/40 mb-3">
                    Company
                  </label>
                  <input
                    type="text"
                    placeholder="Your company name"
                    className="w-full bg-[#0E0E0E] border border-[#C8A96E]/20 rounded-lg px-4 py-3 text-[#E8E4DC] text-sm placeholder:text-[#E8E4DC]/20 focus:border-[#C8A96E]/60 focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-[0.65rem] tracking-[0.15em] uppercase text-[#E8E4DC]/40 mb-3">
                    Service Interest
                  </label>
                  <select className="w-full bg-[#0E0E0E] border border-[#C8A96E]/20 rounded-lg px-4 py-3 text-[#E8E4DC] text-sm focus:border-[#C8A96E]/60 focus:outline-none transition-colors appearance-none cursor-pointer">
                    <option value="">Select a service</option>
                    <option value="brand">Brand & Strategy</option>
                    <option value="design">Digital Design</option>
                    <option value="engineering">Web Development</option>
                    <option value="growth">Digital Marketing</option>
                    <option value="retainer">Ongoing Partnership</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[0.65rem] tracking-[0.15em] uppercase text-[#E8E4DC]/40 mb-3">
                    Project Details
                  </label>
                  <textarea
                    rows={5}
                    placeholder="Tell us about your project, goals, and timeline..."
                    className="w-full bg-[#0E0E0E] border border-[#C8A96E]/20 rounded-lg px-4 py-3 text-[#E8E4DC] text-sm placeholder:text-[#E8E4DC]/20 focus:border-[#C8A96E]/60 focus:outline-none transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full text-[0.72rem] tracking-[0.12em] uppercase px-8 py-4 bg-[#C8A96E] text-[#0E0E0E] font-medium hover:opacity-85 transition-opacity rounded-lg"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ─────────────────────────────────────────────
   ICONS
   ───────────────────────────────────────────── */
const ArrowUpRight = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M7 17L17 7M17 7H7M17 7V17" />
  </svg>
);

/* ─────────────────────────────────────────────
   DATA
   ───────────────────────────────────────────── */
const services = [
  {
    num: "(01)",
    tag: "Brand & Strategy",
    title: "Strategic Brand Identity",
    desc: "We build cohesive brand systems that communicate your values with precision — from positioning and visual language to messaging and voice.",
    pills: ["Positioning", "Visual Identity", "Brand Voice", "Guidelines"],
    img: "https://images.unsplash.com/photo-1634942537034-2531766767d1?w=900&q=80",
    imgAlt: "Brand identity design",
    imgLabel: "Brand Systems",
    reverse: false,
  },
  {
    num: "(02)",
    tag: "Digital Design",
    title: "Interface & Experience Design",
    desc: "Every screen is a conversation. We design intuitive digital products that balance aesthetic refinement with functional clarity and usability.",
    pills: ["UX Research", "UI Design", "Prototyping", "Design Systems"],
    img: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=900&q=80",
    imgAlt: "UI/UX design",
    imgLabel: "UI/UX Design",
    reverse: true,
  },
  {
    num: "(03)",
    tag: "Engineering",
    title: "Web Development & Engineering",
    desc: "We engineer performant, scalable digital products — from marketing sites to complex web applications — built to last and grow with your business.",
    pills: ["React / Next.js", "Headless CMS", "API Integration", "Performance"],
    img: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=900&q=80",
    imgAlt: "Web development",
    imgLabel: "Engineering",
    reverse: false,
  },
  {
    num: "(04)",
    tag: "Growth",
    title: "Digital Marketing & SEO",
    desc: "Visibility without compromise. We pair technical SEO rigour with content strategy to drive qualified traffic and sustainable organic growth.",
    pills: ["Technical SEO", "Content Strategy", "Analytics", "Conversion"],
    img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900&q=80",
    imgAlt: "Digital marketing analytics",
    imgLabel: "Growth & SEO",
    reverse: true,
  },
  {
    num: "(05)",
    tag: "Ongoing Partnership",
    title: "Retainer & Support",
    desc: "Long-term partnerships that evolve your digital presence continuously — iterating, optimising, and expanding as your business grows.",
    pills: ["Monthly Retainer", "Maintenance", "A/B Testing", "Reporting"],
    img: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=900&q=80",
    imgAlt: "Team collaboration",
    imgLabel: "Partnership",
    reverse: false,
  },
];

const portfolioPanels = [
  {
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&q=80",
    title: "Lumina Brand System",
    category: "Brand Identity",
    description: "Complete visual identity overhaul for a sustainable  firm, encompassing logo , typographic systems, and comprehensive brand guidelines.",
    year: "2025",
    client: "Lumina Atelier",
    role: "Lead Brand Designer",
    link: "#case-lumina",
    objectPosition: "center 30%",
  },
  {
    image: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=1200&q=80",
    title: "Meridian Finance App",
    category: "UI/UX Design",
    description: "Mobile banking experience redesign focused on simplifying complex financial workflows while maintaining institutional trust and security perception.",
    year: "2025",
    client: "Meridian Capital",
    role: "Product Designer",
    link: "#case-meridian",
    objectPosition: "center top",
  },
  {
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80",
    title: "Artisan E-Commerce",
    category: "Web Development",
    description: "Headless Shopify build for a luxury ceramics studio, featuring 3D product configurators and seamless editorial content integration.",
    year: "2024",
    client: "Atelier Forma",
    role: "Frontend Engineer",
    link: "#case-artisan",
    objectPosition: "center 40%",
  },
  {
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=1200&q=80",
    title: "Nova SaaS Platform",
    category: "Design System",
    description: "End-to-end design system creation for a B2B analytics platform, unifying fragmented UI patterns across 12 product modules.",
    year: "2024",
    client: "Nova Analytics",
    role: "Design Systems Lead",
    link: "#case-nova",
    objectPosition: "center 20%",
  },
  {
    image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=1200&q=80",
    title: "Catalyst Rebrand",
    category: "Brand Strategy",
    description: "Strategic repositioning and visual identity for a venture capital firm, balancing institutional credibility with forward-thinking innovation.",
    year: "2024",
    client: "Catalyst Ventures",
    role: "Strategy Director",
    link: "#case-catalyst",
    objectPosition: "center center",
  },
  {
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=80",
    title: "Horizon Real Estate",
    category: "Digital Experience",
    description: "Immersive property showcase platform with virtual staging capabilities and neighbourhood lifestyle integration.",
    year: "2023",
    client: "Horizon Properties",
    role: "Creative Director",
    link: "#case-horizon",
    objectPosition: "center 35%",
  },
  {
    image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=1200&q=80",
    title: "Ember Wellness",
    category: "E-Commerce",
    description: "Direct-to-consumer launch for a holistic wellness brand, combining editorial storytelling with conversion-optimized product experiences.",
    year: "2023",
    client: "Ember Wellness",
    role: "Art Director",
    link: "#case-ember",
    objectPosition: "center 25%",
  },
];

const crewMembers = [
  { image: 'https://images.unsplash.com/photo-1540573133985-87b6da6dce60?w=600&q=80', imageAlt: 'Gori the Gorilla', title: 'Gori', subtitle: 'Jungle Sage' },
  { image: 'https://images.unsplash.com/photo-1535970793482-07de93762dc4?w=600&q=80', imageAlt: 'Snap the Croc', title: 'Snap', subtitle: 'Swamp King' },
  { image: 'https://images.unsplash.com/photo-1504625341345-84c620c9cd36?w=600&q=80', imageAlt: 'Crowley the Crow', title: 'Crowley', subtitle: 'Night Watcher' },
  { image: 'https://images.unsplash.com/photo-1474511320723-9a56873571b7?w=600&q=80', imageAlt: 'Foxy the Fox', title: 'Foxy', subtitle: 'Forest Trickster' },
  { image: 'https://images.unsplash.com/photo-1531386813184-11a22d6c96c5?w=600&q=80', imageAlt: 'Slither the Snake', title: 'Slither', subtitle: 'Desert Whisper' },
  { image: 'https://images.unsplash.com/photo-1530595467537-0b5996c41f2d?w=600&q=80', imageAlt: 'Bruno the Bear', title: 'Bruno', subtitle: 'Mountain Guardian' },
  { image: 'https://images.unsplash.com/photo-1516233758813-a3d1ce5c0d75?w=600&q=80', imageAlt: 'Hoot the Owl', title: 'Hoot', subtitle: 'Wise Watcher' },
  { image: 'https://images.unsplash.com/photo-1522606560942-8367d3c0c45b?w=600&q=80', imageAlt: 'Chompy the Croc', title: 'Chompy', subtitle: 'River Sentinel' },
  { image: 'https://images.unsplash.com/photo-1508817628294-5a453fa0b8fb?w=600&q=80', imageAlt: 'Rajah the Tiger', title: 'Rajah', subtitle: 'Jungle Emperor' },
  { image: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=600&q=80', imageAlt: 'Tank the Bulldog', title: 'Tank', subtitle: 'Street Enforcer' },
  { image: 'https://images.unsplash.com/photo-1543337212-5c3d3634a4c7?w=600&q=80', imageAlt: 'Rusty the Red Panda', title: 'Rusty', subtitle: 'Smooth Operator' },
  { image: 'https://images.unsplash.com/photo-1562551689-dcff9c31894c?w=600&q=80', imageAlt: 'Blaze the Tiger', title: 'Blaze', subtitle: 'Street King' },
];

const testimonials = [
  {
    quote: "Golden Lining Solutions transformed our digital presence entirely. Their strategic approach to brand and design resulted in a 140% increase in qualified leads within the first quarter.",
    author: "Sarah Chen",
    role: "CMO, Lumina Atelier",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80",
  },
  {
    quote: "The attention to detail and technical excellence is unmatched. They didn't just build a website — they engineered a growth platform.",
    author: "Marcus Webb",
    role: "Founder, Nova Analytics",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80",
  },
  {
    quote: "Working with this team felt like a true partnership. They understood our vision and elevated it beyond what we imagined possible.",
    author: "Elena Rodriguez",
    role: "Director, Catalyst Ventures",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80",
  },
];

/* ─────────────────────────────────────────────
   EXPANDABLE PANEL
   ───────────────────────────────────────────── */
const ExpandablePanel = ({
  panels,
  className,
  panelClassName,
  expandedWidth = "55%",
  collapsedWidth = "10%",
  minWidth = "80px",
  height = "85vh",
  gap = "0.75rem",
  borderRadius = "1.25rem",
  transitionDuration = "600ms",
  defaultExpanded = 0,
}) => {
  const [expandedIndex, setExpandedIndex] = useState(defaultExpanded);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const panelRef = useRef(null);

  const handleClick = (index) => {
    setExpandedIndex(index === expandedIndex ? -1 : index);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (panelRef.current && !panelRef.current.contains(event.target)) {
        setExpandedIndex(-1);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      ref={panelRef}
      className={cn(
        "flex w-full max-w-[1400px] items-center justify-center mx-auto px-4",
        className
      )}
      style={{ height, gap }}
    >
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
            className={cn(
              "relative h-full cursor-pointer overflow-hidden group",
              panelClassName
            )}
            style={{
              width: isExpanded ? expandedWidth : collapsedWidth,
              minWidth,
              borderRadius,
              transitionDuration,
              transitionProperty: "width, filter, transform",
              transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
              filter: isCollapsed ? "brightness(0.5) grayscale(0.4)" : "none",
              transform: isHovered && !isExpanded ? "scale(1.02)" : "scale(1)",
            }}
          >
            <img
              src={panel.image}
              alt={panel.alt || panel.title}
              className="w-full h-full object-cover"
              style={{ objectPosition: panel.objectPosition || "center center" }}
            />

            <div
              className="absolute inset-0 transition-opacity duration-500"
              style={{
                background: isExpanded
                  ? "linear-gradient(to top, rgba(14,14,14,0.9) 0%, rgba(14,14,14,0.3) 50%, transparent 100%)"
                  : "linear-gradient(to top, rgba(14,14,14,0.7) 0%, transparent 60%)",
                opacity: isExpanded || isHovered ? 1 : 0.6,
              }}
            />

            {!isExpanded && (
              <div className="absolute inset-0 flex items-end justify-center pb-10">
                <h3
                  className="text-[#E8E4DC] font-serif font-normal tracking-[0.2em] uppercase text-sm whitespace-nowrap"
                  style={{
                    writingMode: "vertical-rl",
                    textOrientation: "mixed",
                    transform: "rotate(180deg)",
                    opacity: isCollapsed ? 0.4 : 0.9,
                    transition: "opacity 0.3s ease",
                  }}
                >
                  {panel.title}
                </h3>
              </div>
            )}

            {isExpanded && (
              <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12">
                <span className="inline-block self-start px-3 py-1.5 mb-4 text-[0.65rem] font-medium tracking-[0.2em] text-[#C8A96E] uppercase bg-[#C8A96E]/15 backdrop-blur-md rounded-full border border-[#C8A96E]/30">
                  {panel.category}
                </span>
                <h2 className="font-serif text-3xl md:text-5xl font-normal text-[#E8E4DC] mb-3 tracking-tight leading-[1.1]">
                  {panel.title}
                </h2>
                <p className="text-[#E8E4DC]/70 text-sm md:text-base max-w-lg mb-6 leading-relaxed line-clamp-3">
                  {panel.description}
                </p>
                <div className="flex flex-wrap items-center gap-5 text-[#E8E4DC]/50 text-xs tracking-wider uppercase mb-6">
                  <span>{panel.year}</span>
                  <span className="w-1 h-1 rounded-full bg-[#C8A96E]/50" />
                  <span>{panel.client}</span>
                  <span className="w-1 h-1 rounded-full bg-[#C8A96E]/50" />
                  <span>{panel.role}</span>
                </div>
                <a
                  href={panel.link || "#"}
                  onClick={(e) => e.stopPropagation()}
                  className="inline-flex items-center gap-2 text-[#C8A96E] text-xs tracking-[0.15em] uppercase font-medium group/link hover:gap-3 transition-all duration-300"
                >
                  <span className="border-b border-[#C8A96E]/40 pb-0.5 group-hover/link:border-[#C8A96E]">
                    View Case Study
                  </span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

/* ─────────────────────────────────────────────
   NAVIGATION
   ───────────────────────────────────────────── */
const Navigation = () => {
  const [scrolled, setScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b",
      scrolled 
        ? "bg-[#0E0E0E]/95 backdrop-blur-md border-[#C8A96E]/20 py-4" 
        : "bg-transparent border-transparent py-6"
    )}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <a href="#" className="font-serif text-lg tracking-[0.12em] text-[#E8E4DC]">
          Golden Lining <span className="text-[#C8A96E]">.</span>Solutions
        </a>
        <div className="hidden md:flex items-center gap-10">
          {["Work", "Services", "About", "Journal"].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className="text-[0.7rem] tracking-[0.15em] uppercase text-[#E8E4DC]/50 hover:text-[#C8A96E] transition-colors duration-300">
              {item}
            </a>
          ))}
        </div>
        <a href="#contact" className="text-[0.7rem] tracking-[0.1em] uppercase px-6 py-2.5 border border-[#C8A96E]/60 text-[#C8A96E] hover:bg-[#C8A96E] hover:text-[#0E0E0E] transition-all duration-300">
          Start a project
        </a>
      </div>
    </nav>
  );
};

/* ─────────────────────────────────────────────
   MAIN APP
   ───────────────────────────────────────────── */
const App = () => {
  return (
    <div className="bg-[#0E0E0E] min-h-screen font-sans antialiased selection:bg-[#C8A96E]/30 selection:text-[#E8E4DC]">
      <Navigation />

      {/* ── PIN ROTATE CONTAINER ── */}
      <PinRotateSections>
        
        {/* ── INTRO ── */}
        <PinRotateIntro className="!bg-[#0E0E0E] !pt-24">
          <p className="text-[0.65rem] tracking-[0.35em] uppercase text-[#C8A96E] mb-8">
            Web Studio — Est. 2019
          </p>

          <h1 className="font-serif font-normal text-[clamp(2.6rem,5.5vw,4.5rem)] leading-[1.15] text-[#E8E4DC] max-w-[680px] mb-6">
            We craft{" "}
            <em className="italic text-[#C8A96E]">digital</em>
            <br />experiences that endure
          </h1>

          <div className="w-10 h-px bg-[#C8A96E] my-6" />

          <p className="text-[0.9rem] font-light text-[#E8E4DC]/45 max-w-[440px] leading-[1.85]">
            A boutique web agency specialising in strategy, design, and engineering for ambitious brands worldwide.
          </p>

          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
            <span className="text-[0.62rem] tracking-[0.25em] uppercase text-[#E8E4DC]/30">
              Explore services
            </span>
            <div className="w-px h-10 bg-gradient-to-b from-[#C8A96E] to-transparent" />
          </div>
        </PinRotateIntro>

        {/* ── SERVICE SECTIONS ── */}
        {services.map(({ num, tag, title, desc, pills, img, imgAlt, imgLabel, reverse }) => (
          <PinRotateSection
            key={num}
            className="!bg-[#F7F4EE] !border-b !border-[#D4C9B0]/60 min-h-screen !items-center !pt-24"
          >
            <div
              className={`relative z-10 w-full max-w-[1000px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center ${
                reverse ? "md:[direction:rtl]" : ""
              }`}
            >
              {/* Text */}
              <div className={`flex flex-col gap-5 ${reverse ? "md:[direction:ltr]" : ""}`}>
                <span className="text-[0.62rem] tracking-[0.3em] uppercase text-[#C8A96E]">
                  {tag}
                </span>
                <h2 className="font-serif font-normal text-[clamp(1.7rem,3vw,2.6rem)] leading-[1.2] text-[#1A1A1A]">
                  {title}
                </h2>
                <p className="text-[0.85rem] font-light text-[#1A1A1A]/55 leading-[1.9] max-w-[360px]">
                  {desc}
                </p>
                <div className="flex flex-wrap gap-2 mt-1">
                  {pills.map((p) => (
                    <span
                      key={p}
                      className="text-[0.62rem] tracking-[0.1em] uppercase px-3 py-1.5 border border-[#C8A96E]/30 text-[#1A1A1A]/45"
                    >
                      {p}
                    </span>
                  ))}
                </div>
                <a href="#" className="mt-2 inline-flex items-center gap-2 text-[0.72rem] tracking-[0.1em] uppercase text-[#C8A96E] no-underline group">
                  <span className="border-b border-[#C8A96E]/40 group-hover:border-[#C8A96E] transition-colors pb-px">
                    Learn more
                  </span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* Image */}
              <div className={`relative ${reverse ? "md:[direction:ltr]" : ""}`}>
                <div className="relative overflow-hidden aspect-[4/3] border border-[#C8A96E]/25 bg-[#EDE9E0]">
                  <img
                    src={img}
                    alt={imgAlt}
                    className="w-full h-full object-cover opacity-80 hover:opacity-95 hover:scale-[1.03] transition-all duration-500"
                  />
                  <span className="absolute bottom-3 left-3 text-[0.6rem] tracking-[0.2em] uppercase text-[#C8A96E] bg-[#0E0E0E]/75 px-2 py-1">
                    {imgLabel}
                  </span>
                  <span className="absolute top-3 right-3 w-4 h-4 border-t border-r border-[#C8A96E]" />
                </div>
              </div>
            </div>
          </PinRotateSection>
        ))}

      </PinRotateSections>

      {/* ── TECHNOLOGY STACK CAROUSEL ── */}
      <TechStackCarousel />

      {/* ── PORTFOLIO SECTION ── */}
      <section id="work" className="bg-[#0E0E0E] py-32">
        <div className="max-w-7xl mx-auto px-6 mb-16">
          <p className="text-[0.65rem] tracking-[0.35em] uppercase text-[#C8A96E] mb-6">Selected Work</p>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <h2 className="font-serif text-[clamp(2rem,4vw,3.5rem)] font-normal text-[#E8E4DC] leading-[1.15] max-w-xl">
              Projects that define our craft
            </h2>
            <p className="text-[0.85rem] text-[#E8E4DC]/40 max-w-sm leading-[1.8]">
              Each project represents a deep collaboration with clients who demand excellence. Click to explore.
            </p>
          </div>
        </div>
        <ExpandablePanel
          panels={portfolioPanels}
          height="80vh"
          gap="1rem"
          borderRadius="1.5rem"
          expandedWidth="58%"
          collapsedWidth="9%"
          minWidth="70px"
        />

        {/* View All Projects CTA */}
        <div className="max-w-7xl mx-auto px-6 mt-16 text-center">
          <a 
            href="/works" 
            className="inline-flex items-center gap-3 text-[0.72rem] tracking-[0.12em] uppercase px-10 py-4 border border-[#C8A96E]/40 text-[#C8A96E] hover:bg-[#C8A96E] hover:text-[#0E0E0E] transition-all duration-300 rounded-full"
          >
            <span>View All Projects</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="bg-[#F7F4EE] py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <p className="text-[0.65rem] tracking-[0.35em] uppercase text-[#C8A96E] mb-6">Client Words</p>
            <h2 className="font-serif text-[clamp(2rem,4vw,3rem)] font-normal text-[#1A1A1A]">
              Trusted by industry leaders
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map(({ quote, author, role, avatar }, index) => (
              <div key={index} className="bg-white border border-[#C8A96E]/15 p-8 md:p-10 flex flex-col hover:shadow-lg hover:shadow-[#C8A96E]/5 transition-shadow duration-500">
                <div className="text-[#C8A96E] text-5xl font-serif leading-none mb-6">"</div>
                <p className="text-[0.85rem] text-[#1A1A1A]/60 leading-[1.9] mb-8 flex-grow">
                  {quote}
                </p>
                <div className="flex items-center gap-4 pt-6 border-t border-[#C8A96E]/10">
                  <img src={avatar} alt={author} className="w-10 h-10 rounded-full object-cover grayscale" />
                  <div>
                    <p className="text-[0.8rem] font-medium text-[#1A1A1A]">{author}</p>
                    <p className="text-[0.7rem] text-[#1A1A1A]/40">{role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CREW SECTION (ProofOfWork) ── */}
      <ProofOfWork 
        title="The Crew" 
        works={crewMembers}
        className="border-t border-[#C8A96E]/10"
      />

      {/* ── CONTACT SECTION ── */}
      <ContactSection />

      {/* ── FOOTER ── */}
      <footer className="bg-[#0E0E0E] border-t border-[#C8A96E]/10 py-12">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <span className="font-serif text-[0.9rem] tracking-[0.12em] text-[#E8E4DC]/60">
            Golden Lining Solutions<span className="text-[#C8A96E]">.</span>STUDIO
          </span>
          <p className="text-[0.65rem] text-[#E8E4DC]/25 tracking-wider">
            © 2026 Golden Lining Solutions. All rights reserved.
          </p>
          <div className="flex gap-6">
            {["Twitter", "LinkedIn", "Dribbble"].map((social) => (
              <a key={social} href="#" className="text-[0.65rem] tracking-[0.1em] uppercase text-[#E8E4DC]/30 hover:text-[#C8A96E] transition-colors">
                {social}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;