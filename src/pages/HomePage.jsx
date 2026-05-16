import React, { useRef, useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

const ArrowUpRight = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M7 17L17 7M17 7H7M17 7V17" />
  </svg>
);

/* ─── EXPANDABLE PANEL (RESPONSIVE) ─── */
const ExpandablePanel = ({
  panels, className, panelClassName, 
  expandedWidth = "55%", collapsedWidth = "10%",
  minWidth = "80px", height = "85vh", gap = "0.75rem", 
  borderRadius = "1.25rem",
  transitionDuration = "600ms", defaultExpanded = 0,
}) => {
  const [expandedIndex, setExpandedIndex] = useState(defaultExpanded);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const panelRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    const checkDevice = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      setIsTablet(width >= 768 && width < 1024);
    };
    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  const handleClick = (index) => {
    if (isMobile) {
      setExpandedIndex(index === expandedIndex ? -1 : index);
    } else {
      setExpandedIndex(index);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (panelRef.current && !panelRef.current.contains(event.target)) {
        if (!isMobile) setExpandedIndex(-1);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMobile]);

  // Calculate dimensions based on device
  const getPanelWidth = (index) => {
    if (isMobile) {
      // Mobile: vertical stack or horizontal scroll
      return expandedIndex === index ? '100%' : (expandedIndex === -1 ? '100%' : '80px');
    }
    if (isTablet) {
      return expandedIndex === index ? '50%' : (expandedIndex !== -1 && expandedIndex !== index ? '8%' : '15%');
    }
    // Desktop
    return expandedIndex === index ? expandedWidth : (expandedIndex !== -1 && expandedIndex !== index ? collapsedWidth : '15%');
  };

  return (
    <div className="w-full">
      {/* Mobile View: Accordion Style */}
      {isMobile && (
        <div className="flex flex-col gap-3 px-4">
          {panels.map((panel, index) => {
            const isExpanded = expandedIndex === index;
            return (
              <div
                key={index}
                onClick={() => handleClick(index)}
                className={cn(
                  "relative overflow-hidden cursor-pointer transition-all duration-500",
                  panelClassName
                )}
                style={{
                  borderRadius: '1rem',
                  height: isExpanded ? '400px' : '120px',
                  transitionProperty: 'height, filter',
                  transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
                }}
              >
                <img 
                  src={panel.image} 
                  alt={panel.alt || panel.title} 
                  className="absolute inset-0 w-full h-full object-cover"
                  style={{ objectPosition: panel.objectPosition || "center center" }}
                />
                <div 
                  className="absolute inset-0"
                  style={{
                    background: isExpanded
                      ? "linear-gradient(to top, rgba(14,14,14,0.95) 0%, rgba(14,14,14,0.4) 50%, transparent 100%)"
                      : "linear-gradient(to top, rgba(14,14,14,0.8) 0%, transparent 60%)",
                  }}
                />
                
                {/* Collapsed State */}
                {!isExpanded && (
                  <div className="absolute inset-0 flex items-end p-5">
                    <div className="flex items-center justify-between w-full">
                      <div>
                        <span className="text-[0.6rem] tracking-[0.2em] uppercase text-[#E8D5A3]/80 border border-[#E8D5A3]/30 px-2 py-1 rounded mb-2 inline-block">
                          {panel.category}
                        </span>
                        <h3 className="font-serif text-lg text-[#F5F1EA] font-medium drop-shadow-[0_1px_4px_rgba(0,0,0,0.6)]">
                          {panel.title}
                        </h3>
                      </div>
                      <div className="w-8 h-8 rounded-full border border-[#E8D5A3]/40 flex items-center justify-center">
                        <svg className="w-4 h-4 text-[#E8D5A3]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Expanded State */}
                {isExpanded && (
                  <div className="absolute inset-0 flex flex-col justify-end p-6">
                    <span className="inline-block self-start px-3 py-1.5 mb-3 text-[0.6rem] font-medium tracking-[0.2em] text-[#E8D5A3] uppercase bg-[#E8D5A3]/15 backdrop-blur-md rounded-full border border-[#E8D5A3]/30">
                      {panel.category}
                    </span>
                    <h2 className="font-serif text-2xl font-medium text-[#F5F1EA] mb-2 tracking-tight leading-[1.1] drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">
                      {panel.title}
                    </h2>
                    <p className="text-[#F5F1EA]/85 text-sm max-w-lg mb-4 leading-relaxed line-clamp-3 font-normal drop-shadow-[0_1px_4px_rgba(0,0,0,0.5)]">
                      {panel.description}
                    </p>
                    <div className="flex flex-wrap items-center gap-3 text-[#F5F1EA]/70 text-[0.6rem] tracking-wider uppercase mb-4 font-medium">
                      <span>{panel.year}</span>
                      <span className="w-1 h-1 rounded-full bg-[#E8D5A3]/50" />
                      <span>{panel.client}</span>
                      <span className="w-1 h-1 rounded-full bg-[#E8D5A3]/50" />
                      <span>{panel.role}</span>
                    </div>
                    <a 
                      href={panel.link || "#"} 
                      onClick={(e) => e.stopPropagation()} 
                      className="inline-flex items-center gap-2 text-[#E8D5A3] text-[0.65rem] tracking-[0.15em] uppercase font-semibold group/link"
                    >
                      <span className="border-b border-[#E8D5A3]/40 pb-0.5">View Case Study</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Tablet & Desktop: Horizontal Accordion */}
      {!isMobile && (
        <div ref={panelRef} 
          className={cn(
            "flex w-full max-w-[1400px] items-center justify-center mx-auto px-4",
            className
          )} 
          style={{ 
            height: isTablet ? '70vh' : height, 
            gap, 
            minWidth: 'fit-content' 
          }}
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
                  width: getPanelWidth(index),
                  minWidth: isTablet ? '60px' : minWidth,
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
                
                {/* Collapsed State */}
                {!isExpanded && (
                  <div className="absolute inset-0 flex items-end justify-center pb-10">
                    <h3 
                      className="text-[#ef9904] font-serif font-medium tracking-[0.2em] uppercase text-xs whitespace-nowrap drop-shadow-[0_1px_4px_rgba(0,0,0,0.6)]" 
                      style={{ 
                        writingMode: "vertical-rl", 
                        textOrientation: "mixed", 
                        transform: "rotate(180deg)", 
                        opacity: isCollapsed ? 0.4 : 0.9, 
                        transition: "opacity 0.3s ease" 
                      }}
                    >
                      {panel.title}
                    </h3>
                  </div>
                )}
                
                {/* Expanded State */}
                {isExpanded && (
                  <div className="absolute inset-0 flex flex-col justify-end p-8 lg:p-12">
                    <span className="inline-block self-start px-3 py-1.5 mb-4 text-[0.65rem] font-medium tracking-[0.2em] text-[#E8D5A3] uppercase bg-[#E8D5A3]/15 backdrop-blur-md rounded-full border border-[#E8D5A3]/30">
                      {panel.category}
                    </span>
                    <h2 className="font-serif text-3xl lg:text-5xl font-medium text-[#F5F1EA] mb-3 tracking-tight leading-[1.1] drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">
                      {panel.title}
                    </h2>
                    <p className="text-[#F5F1EA]/85 text-sm lg:text-base max-w-lg mb-6 leading-relaxed line-clamp-3 font-normal drop-shadow-[0_1px_4px_rgba(0,0,0,0.5)]">
                      {panel.description}
                    </p>
                    <div className="flex flex-wrap items-center gap-5 text-[#F5F1EA]/70 text-xs tracking-wider uppercase mb-6 font-medium">
                      <span>{panel.year}</span>
                      <span className="w-1 h-1 rounded-full bg-[#E8D5A3]/50" />
                      <span>{panel.client}</span>
                      <span className="w-1 h-1 rounded-full bg-[#E8D5A3]/50" />
                      <span>{panel.role}</span>
                    </div>
                    <a 
                      href={panel.link || "#"} 
                      onClick={(e) => e.stopPropagation()} 
                      className="inline-flex items-center gap-2 text-[#E8D5A3] text-xs tracking-[0.15em] uppercase font-semibold group/link hover:gap-3 transition-all duration-300 drop-shadow-[0_1px_4px_rgba(0,0,0,0.5)]"
                    >
                      <span className="border-b border-[#E8D5A3]/40 pb-0.5 group-hover/link:border-[#E8D5A3]">View Case Study</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </a>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ExpandablePanel;