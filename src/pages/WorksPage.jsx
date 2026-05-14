import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cn } from '@/lib/utils';

gsap.registerPlugin(ScrollTrigger);

/* ─────────────────────────────────────────────
   WORKS SHOWCASE PAGE — PLAIN REACT
   ───────────────────────────────────────────── */

const ArrowUpRight = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M7 17L17 7M17 7H7M17 7V17" />
  </svg>
);

const ArrowLeft = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 12H5M12 19l-7-7 7-7" />
  </svg>
);

/* ─── FILTER TABS ─── */
const FilterTabs = ({ categories, active, onChange }) => (
  <div className="flex flex-wrap items-center gap-3 justify-center">
    {categories.map((cat) => (
      <button
        key={cat}
        onClick={() => onChange(cat)}
        className={cn(
          "text-[0.7rem] tracking-[0.15em] uppercase px-5 py-2.5 rounded-full border transition-all duration-300",
          active === cat
            ? "bg-[#C8A96E] text-[#0E0E0E] border-[#C8A96E]"
            : "bg-transparent text-[#E8E4DC]/50 border-[#C8A96E]/20 hover:border-[#C8A96E]/50 hover:text-[#E8E4DC]/80"
        )}
      >
        {cat}
      </button>
    ))}
  </div>
);

/* ─── WORK CARD ─── */
const WorkCard = ({ work, index, isReversed }) => {
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (!cardRef.current) return;

    gsap.fromTo(
      cardRef.current,
      { y: 60, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: cardRef.current,
          start: 'top 90%',
        },
      }
    );
  }, []);

  return (
    <div
      ref={cardRef}
      className={cn(
        "group grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center py-16 lg:py-24 border-b border-[#C8A96E]/10",
        isReversed && "lg:[direction:rtl]"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image */}
      <div className={cn("relative overflow-hidden", isReversed && "lg:[direction:ltr]")}>
        <div 
          className="relative aspect-[4/3] overflow-hidden bg-[#141414]"
          style={{ borderRadius: '1.25rem' }}
        >
          <img
            src={work.image}
            alt={work.imageAlt}
            className="w-full h-full object-cover transition-all duration-700 ease-out"
            style={{
              transform: isHovered ? 'scale(1.05)' : 'scale(1)',
              filter: isHovered ? 'brightness(1)' : 'brightness(0.9)',
            }}
          />

          {/* Color tint overlay */}
          <div 
            className="absolute inset-0 transition-opacity duration-500 mix-blend-multiply pointer-events-none"
            style={{
              backgroundColor: work.color,
              opacity: isHovered ? 0.15 : 0.3,
            }}
          />

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0E0E0E]/60 via-transparent to-transparent pointer-events-none" />

          {/* Year badge */}
          <span className="absolute top-5 left-5 px-3 py-1.5 text-[0.6rem] tracking-[0.2em] uppercase text-[#C8A96E] bg-[#0E0E0E]/60 backdrop-blur-sm rounded-full border border-[#C8A96E]/20">
            {work.year}
          </span>

          {/* View project button on hover */}
          <div 
            className="absolute inset-0 flex items-center justify-center transition-all duration-500"
            style={{ opacity: isHovered ? 1 : 0 }}
          >
            <span className="inline-flex items-center gap-2 px-6 py-3 bg-[#C8A96E] text-[#0E0E0E] text-[0.7rem] tracking-[0.12em] uppercase font-medium rounded-full">
              View Project
              <ArrowUpRight className="w-4 h-4" />
            </span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className={cn("flex flex-col gap-5", isReversed && "lg:[direction:ltr]")}>
        <span className="text-[0.62rem] tracking-[0.3em] uppercase text-[#C8A96E]">
          {work.category}
        </span>

        <h3 className="font-serif text-[clamp(1.8rem,3vw,2.8rem)] font-normal text-[#E8E4DC] leading-[1.15] tracking-tight">
          {work.title}
        </h3>

        <p className="text-[0.85rem] font-light text-[#E8E4DC]/50 leading-[1.9] max-w-md">
          {work.description}
        </p>

        <div className="flex flex-wrap gap-2 mt-1">
          {work.tags.map((tag) => (
            <span
              key={tag}
              className="text-[0.6rem] tracking-[0.1em] uppercase px-3 py-1.5 border border-[#C8A96E]/20 text-[#E8E4DC]/40 hover:border-[#C8A96E]/40 hover:text-[#C8A96E] transition-all duration-300"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-4 mt-3 text-[0.7rem] text-[#E8E4DC]/30 tracking-wider">
          <span>{work.client}</span>
          <span className="w-1 h-1 rounded-full bg-[#C8A96E]/40" />
          <span>{work.role}</span>
        </div>

        <a 
          href={`/works/${work.id}`}
          className="mt-4 inline-flex items-center gap-2 text-[0.72rem] tracking-[0.1em] uppercase text-[#C8A96E] group/link"
        >
          <span className="border-b border-[#C8A96E]/40 group-hover/link:border-[#C8A96E] transition-colors pb-px">
            Explore Case Study
          </span>
          <ArrowUpRight className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
        </a>
      </div>
    </div>
  );
};

/* ─── STATS SECTION ─── */
const StatsSection = () => {
  const statsRef = useRef(null);
  const [counts, setCounts] = useState([0, 0, 0, 0]);
  const targets = [127, 48, 15, 340];
  const labels = ['Projects Delivered', 'Happy Clients', 'Industry Awards', 'Cups of Coffee'];
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!statsRef.current || hasAnimated.current) return;

    const st = ScrollTrigger.create({
      trigger: statsRef.current,
      start: 'top 80%',
      once: true,
      onEnter: () => {
        hasAnimated.current = true;
        targets.forEach((target, i) => {
          const obj = { val: 0 };
          gsap.to(obj, {
            val: target,
            duration: 2,
            ease: 'power2.out',
            onUpdate: () => {
              setCounts(prev => {
                const next = [...prev];
                next[i] = Math.round(obj.val);
                return next;
              });
            },
          });
        });
      },
    });

    return () => st.kill();
  }, []);

  return (
    <div ref={statsRef} className="grid grid-cols-2 md:grid-cols-4 gap-8 py-20 border-y border-[#C8A96E]/10">
      {targets.map((_, i) => (
        <div key={i} className="text-center">
          <span className="font-serif text-[clamp(2.5rem,5vw,4rem)] text-[#C8A96E] leading-none">
            {counts[i]}{i === 3 ? '+' : ''}
          </span>
          <p className="text-[0.65rem] tracking-[0.2em] uppercase text-[#E8E4DC]/40 mt-3">
            {labels[i]}
          </p>
        </div>
      ))}
    </div>
  );
};

/* ─── MAIN PAGE ─── */
const WorksPage = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const headerRef = useRef(null);

  const categories = ['All', 'Brand Identity', 'UI/UX Design', 'Web Development', 'Design System', 'Digital Experience'];

  const works = [
    {
      id: 'lumina',
      image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&q=80',
      imageAlt: 'Lumina Brand System',
      title: 'Lumina Brand System',
      category: 'Brand Identity',
      year: '2025',
      client: 'Lumina Atelier',
      role: 'Lead Brand Designer',
      description: 'Complete visual identity overhaul for a sustainable firm, encompassing logo , typographic systems, and comprehensive brand guidelines.',
      tags: ['Positioning', 'Visual Identity', 'Brand Voice', 'Guidelines'],
      color: '#C8A96E',
    },
    {
      id: 'meridian',
      image: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=1200&q=80',
      imageAlt: 'Meridian Finance App',
      title: 'Meridian Finance App',
      category: 'UI/UX Design',
      year: '2025',
      client: 'Meridian Capital',
      role: 'Product Designer',
      description: 'Mobile banking experience redesign focused on simplifying complex financial workflows while maintaining institutional trust and security perception.',
      tags: ['UX Research', 'UI Design', 'Prototyping', 'Design Systems'],
      color: '#4A90D9',
    },
    {
      id: 'artisan',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80',
      imageAlt: 'Artisan E-Commerce',
      title: 'Artisan E-Commerce',
      category: 'Web Development',
      year: '2024',
      client: 'Atelier Forma',
      role: 'Frontend Engineer',
      description: 'Headless Shopify build for a luxury ceramics studio, featuring 3D product configurators and seamless editorial content integration.',
      tags: ['React / Next.js', 'Headless CMS', '3D Configurator', 'Performance'],
      color: '#D94A4A',
    },
    {
      id: 'nova',
      image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=1200&q=80',
      imageAlt: 'Nova SaaS Platform',
      title: 'Nova SaaS Platform',
      category: 'Design System',
      year: '2024',
      client: 'Nova Analytics',
      role: 'Design Systems Lead',
      description: 'End-to-end design system creation for a B2B analytics platform, unifying fragmented UI patterns across 12 product modules.',
      tags: ['Design Tokens', 'Component Library', 'Documentation', 'Figma'],
      color: '#9B4AD9',
    },
    {
      id: 'catalyst',
      image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=1200&q=80',
      imageAlt: 'Catalyst Rebrand',
      title: 'Catalyst Rebrand',
      category: 'Brand Identity',
      year: '2024',
      client: 'Catalyst Ventures',
      role: 'Strategy Director',
      description: 'Strategic repositioning and visual identity for a venture capital firm, balancing institutional credibility with forward-thinking innovation.',
      tags: ['Brand Strategy', 'Visual Identity', 'Messaging', 'Launch'],
      color: '#4AD99B',
    },
    {
      id: 'horizon',
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=80',
      imageAlt: 'Horizon Real Estate',
      title: 'Horizon Real Estate',
      category: 'Digital Experience',
      year: '2023',
      client: 'Horizon Properties',
      role: 'Creative Director',
      description: 'Immersive property showcase platform with virtual staging capabilities and neighbourhood lifestyle integration.',
      tags: ['WebGL', 'Virtual Staging', 'CMS', 'Interactive'],
      color: '#D9A44A',
    },
    {
      id: 'ember',
      image: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=1200&q=80',
      imageAlt: 'Ember Wellness',
      title: 'Ember Wellness',
      category: 'Web Development',
      year: '2023',
      client: 'Ember Wellness',
      role: 'Art Director',
      description: 'Direct-to-consumer launch for a holistic wellness brand, combining editorial storytelling with conversion-optimized product experiences.',
      tags: ['E-Commerce', 'Editorial', 'Conversion', 'CMS'],
      color: '#D94A7A',
    },
    {
      id: 'prism',
      image: 'https://images.unsplash.com/photo-1553877522-43269c4f1d37?w=1200&q=80',
      imageAlt: 'Prism Dashboard',
      title: 'Prism Dashboard',
      category: 'UI/UX Design',
      year: '2023',
      client: 'Prism Data',
      role: 'Product Designer',
      description: 'Enterprise analytics dashboard with real-time data visualization, custom charting components, and collaborative workspace features.',
      tags: ['Data Viz', 'Dashboard', 'Real-time', 'Collaboration'],
      color: '#4A6BD9',
    },
  ];

  const filteredWorks = activeFilter === 'All' 
    ? works 
    : works.filter(w => w.category === activeFilter);

  useEffect(() => {
    if (!headerRef.current) return;

    gsap.fromTo(
      headerRef.current.querySelectorAll('.header-animate'),
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.12,
        ease: 'power3.out',
        delay: 0.2,
      }
    );
  }, []);

  return (
    <div className="bg-[#0E0E0E] min-h-screen font-sans antialiased selection:bg-[#C8A96E]/30 selection:text-[#E8E4DC]">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0E0E0E]/95 backdrop-blur-md border-b border-[#C8A96E]/20 py-4">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <a href="/" className="inline-flex items-center gap-2 text-[0.7rem] tracking-[0.15em] uppercase text-[#E8E4DC]/50 hover:text-[#C8A96E] transition-colors duration-300">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </a>
          <span className="font-serif text-lg tracking-[0.12em] text-[#E8E4DC]">
            Golden Lining <span className="text-[#C8A96E]">.</span>Solutions
          </span>
          <a href="#contact" className="text-[0.7rem] tracking-[0.1em] uppercase px-6 py-2.5 border border-[#C8A96E]/60 text-[#C8A96E] hover:bg-[#C8A96E] hover:text-[#0E0E0E] transition-all duration-300">
            Start a project
          </a>
        </div>
      </nav>

      {/* Hero Header */}
      <header ref={headerRef} className="pt-32 pb-16 md:pt-40 md:pb-24 px-6">
        <div className="max-w-7xl mx-auto">
          <p className="header-animate text-[0.65rem] tracking-[0.35em] uppercase text-[#C8A96E] mb-6">
            Selected Work
          </p>
          <h1 className="header-animate font-serif font-normal text-[clamp(2.5rem,6vw,5rem)] leading-[1.1] text-[#E8E4DC] max-w-3xl">
            Projects that define our <em className="italic text-[#C8A96E]">craft</em>
          </h1>
          <div className="header-animate w-12 h-px bg-[#C8A96E] mt-8 mb-8" />
          <p className="header-animate text-[0.9rem] font-light text-[#E8E4DC]/40 max-w-lg leading-[1.85]">
            Each project represents a deep collaboration with clients who demand excellence. From brand strategy to full-stack engineering.
          </p>
        </div>
      </header>

      {/* Stats */}
      <div className="max-w-7xl mx-auto px-6">
        <StatsSection />
      </div>

      {/* Filter Tabs */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <FilterTabs 
          categories={categories} 
          active={activeFilter} 
          onChange={setActiveFilter} 
        />
      </div>

      {/* Works List */}
      <div className="max-w-7xl mx-auto px-6 pb-32">
        {filteredWorks.map((work, index) => (
          <WorkCard 
            key={work.id} 
            work={work} 
            index={index}
            isReversed={index % 2 === 1}
          />
        ))}
      </div>

      {/* CTA Section */}
      <section className="bg-[#0B0B0F] border-t border-[#C8A96E]/10 py-32">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-[0.65rem] tracking-[0.35em] uppercase text-[#C8A96E] mb-6">
            Next Project
          </p>
          <h2 className="font-serif font-normal text-[clamp(2rem,4vw,3.5rem)] leading-[1.15] text-[#E8E4DC] mb-8">
            Let's create something <em className="italic text-[#C8A96E]">remarkable</em>
          </h2>
          <div className="w-12 h-px bg-[#C8A96E] mx-auto mb-8" />
          <p className="text-[0.85rem] font-light text-[#E8E4DC]/40 max-w-md mx-auto leading-[1.8] mb-10">
            Have a project in mind? We'd love to hear about it. Let's discuss how we can bring your vision to life.
          </p>
          <a 
            href="#contact" 
            className="inline-flex items-center gap-2 text-[0.72rem] tracking-[0.12em] uppercase px-10 py-4 bg-[#C8A96E] text-[#0E0E0E] font-medium hover:opacity-85 transition-opacity rounded-full"
          >
            <span>Start a Conversation</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0E0E0E] border-t border-[#C8A96E]/10 py-12">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <span className="font-serif text-[0.9rem] tracking-[0.12em] text-[#E8E4DC]/60">
            Golden Lining Solutions<span className="text-[#C8A96E]">.</span>STUDIO
          </span>
          <p className="text-[0.65rem] text-[#E8E4DC]/25 tracking-wider">
            © 2026 Golden Lining Solutions. All rights reserved.
          </p>
          <div className="flex gap-6">
            {['Twitter', 'LinkedIn', 'Dribbble'].map((social) => (
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

export default WorksPage;