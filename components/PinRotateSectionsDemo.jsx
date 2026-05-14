import React from "react";
import PinRotateSections, {
  PinRotateIntro,
  PinRotateSection,
  PinRotateOutro,
} from "@/ui/components/scroll/PinRotateSections";

const ArrowUpRight = () => (
  <svg className="inline h-[0.85em] w-[0.85em]" viewBox="0 0 24 24" fill="none">
    <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

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

const PinRotateSectionsDemo = () => (
  <PinRotateSections>

    {/* ── INTRO ── */}
    <PinRotateIntro className="!bg-[#0E0E0E] border-b border-[#C8A96E]/20">
      {/* Nav */}
      <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-[8vw] py-5 border-b border-[#C8A96E]/20">
        <span className="font-serif text-[1.05rem] tracking-[0.12em] text-[#E8E4DC]">
          Golden Lining <span className="text-[#C8A96E]">.</span>Solutions
        </span>
        <nav className="hidden md:flex gap-8">
          {["Work", "Services", "About", "Journal"].map((l) => (
            <a key={l} href="#" className="text-[0.72rem] tracking-[0.12em] uppercase text-[#E8E4DC]/45 hover:text-[#C8A96E] transition-colors no-underline">
              {l}
            </a>
          ))}
        </nav>
        <button className="text-[0.72rem] tracking-[0.1em] uppercase px-5 py-2 border border-[#C8A96E]/70 text-[#C8A96E] bg-transparent hover:bg-[#C8A96E] hover:text-[#0E0E0E] transition-all">
          Start a project ↗
        </button>
      </div>

      {/* Eyebrow */}
      <p className="text-[0.65rem] tracking-[0.35em] uppercase text-[#C8A96E] mb-8">
        Web Studio — Est. 2019
      </p>

      {/* Headline */}
      <h1 className="font-serif font-normal text-[clamp(2.6rem,5.5vw,4.5rem)] leading-[1.15] text-[#E8E4DC] max-w-[680px] mb-6">
        We craft{" "}
        <em className="italic text-[#C8A96E]">digital</em>
        <br />experiences that endure
      </h1>

      {/* Divider */}
      <div className="w-10 h-px bg-[#C8A96E] my-6" />

      {/* Sub */}
      <p className="text-[0.9rem] font-light text-[#E8E4DC]/45 max-w-[440px] leading-[1.85]">
        A boutique web agency specialising in strategy, design, and engineering for ambitious brands worldwide.
      </p>

      {/* Scroll hint */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-[0.62rem] tracking-[0.25em] uppercase text-[#E8E4DC]/30">
          Explore services
        </span>
        <div className="w-px h-10 bg-gradient-to-b from-[#C8A96E] to-transparent animate-pulse" />
      </div>
    </PinRotateIntro>

    {/* ── SERVICE SECTIONS ── */}
    {services.map(({ num, tag, title, desc, pills, img, imgAlt, imgLabel, reverse }) => (
      <PinRotateSection
        key={num}
        className="!bg-[#F7F4EE] !border-b !border-[#D4C9B0]/60 min-h-screen !items-center"
      >
        {/* Ghost number */}
        {/* <span className="absolute top-6 right-[4vw] font-serif text-[clamp(5rem,10vw,8rem)] font-normal leading-none text-[#C8A96E]/08 pointer-events-none select-none">
          {num}
        </span> */}

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
              <ArrowUpRight />
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
              {/* Label */}
              <span className="absolute bottom-3 left-3 text-[0.6rem] tracking-[0.2em] uppercase text-[#C8A96E] bg-[#0E0E0E]/75 px-2 py-1">
                {imgLabel}
              </span>
              {/* Corner bracket */}
              <span className="absolute top-3 right-3 w-4 h-4 border-t border-r border-[#C8A96E]" />
            </div>
          </div>
        </div>
      </PinRotateSection>
    ))}

    {/* ── OUTRO ── */}
    <PinRotateOutro className="!bg-[#141414] border-t border-[#C8A96E]/20">
      <p className="text-[0.65rem] tracking-[0.35em] uppercase text-[#C8A96E] mb-6">
        Ready to begin?
      </p>

      <h2 className="font-serif font-normal text-[clamp(2rem,4.5vw,3.5rem)] leading-[1.2] text-[#E8E4DC] mb-4">
        Let's build something
        <br />
        <em className="italic text-[#C8A96E]">remarkable</em> together
      </h2>

      <div className="w-8 h-px bg-[#C8A96E] my-6" />

      <p className="text-[0.88rem] font-light text-[#E8E4DC]/45 max-w-[420px] leading-[1.85] mb-10">
        From the first brief to final launch, we partner with you at every step. Tell us about your project — we'd love to hear from you.
      </p>

      <div className="flex flex-wrap gap-4 justify-center">
        <button className="text-[0.72rem] tracking-[0.12em] uppercase px-8 py-3.5 bg-[#C8A96E] text-[#0E0E0E] font-medium hover:opacity-85 transition-opacity">
          Start a project
        </button>
        <button className="text-[0.72rem] tracking-[0.12em] uppercase px-8 py-3.5 border border-[#E8E4DC]/25 text-[#E8E4DC] hover:border-[#E8E4DC]/60 transition-colors">
          View our work
        </button>
      </div>

      {/* Stats */}
      <div className="flex gap-12 mt-16 pt-10 border-t border-[#C8A96E]/20">
        {[
          { num: "120+", label: "Projects delivered" },
          { num: "6yr",  label: "In operation" },
          { num: "98%",  label: "Client satisfaction" },
        ].map(({ num, label }) => (
          <div key={label} className="flex flex-col items-center gap-1.5">
            <span className="font-serif text-[2rem] font-normal text-[#C8A96E]">{num}</span>
            <span className="text-[0.62rem] tracking-[0.2em] uppercase text-[#E8E4DC]/35">{label}</span>
          </div>
        ))}
      </div>
    </PinRotateOutro>

  </PinRotateSections>
);

export default PinRotateSectionsDemo;
