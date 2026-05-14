import React, { useState, useEffect, useRef } from "react";
import { cn } from "../src/lib/utils";

const ExpandablePanel = ({
  panels,
  className,
  panelClassName,
  expandedWidth = "55%",
  collapsedWidth = "11%",
  minWidth = "80px",
  height = "85vh",
  gap = "0.75rem",
  borderRadius = "1.25rem",
  transitionDuration = "600ms",
  defaultExpanded = 0,
  showOverlay = true,
  overlayOpacity = 0.4,
}) => {
  const [expandedIndex, setExpandedIndex] = useState(defaultExpanded);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const panelRef = useRef(null);

  const handleClick = (index) => {
    setExpandedIndex(index === expandedIndex ? -1 : index);
  };

  // Handle clicks outside to collapse
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
        "flex w-full max-w-7xl items-center justify-center mx-auto",
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
              filter: isCollapsed ? "brightness(0.6) grayscale(0.3)" : "none",
              transform: isHovered && !isExpanded ? "scale(1.02)" : "scale(1)",
            }}
          >
            {/* Image */}
            <img
              src={panel.image}
              alt={panel.alt || `Project ${index + 1}`}
              className="w-full h-full object-cover"
              style={{
                objectPosition: panel.objectPosition || "center top",
              }}
            />

            {/* Dark overlay for text readability */}
            {showOverlay && (
              <div
                className="absolute inset-0 transition-opacity duration-500"
                style={{
                  background: isExpanded
                    ? `linear-gradient(to top, rgba(0,0,0,${overlayOpacity + 0.3}) 0%, rgba(0,0,0,0.1) 50%, transparent 100%)`
                    : `linear-gradient(to top, rgba(0,0,0,${overlayOpacity}) 0%, transparent 60%)`,
                  opacity: isExpanded || isHovered ? 1 : 0.7,
                }}
              />
            )}

            {/* Collapsed state: Vertical title */}
            {!isExpanded && (
              <div className="absolute inset-0 flex items-end justify-center pb-8">
                <h3
                  className="text-white font-semibold tracking-widest uppercase text-sm whitespace-nowrap origin-bottom-left"
                  style={{
                    writingMode: "vertical-rl",
                    textOrientation: "mixed",
                    transform: "rotate(180deg)",
                    opacity: isCollapsed ? 0.5 : 1,
                    transition: "opacity 0.3s ease",
                  }}
                >
                  {panel.title || `Project ${index + 1}`}
                </h3>
              </div>
            )}

            {/* Expanded state: Full project details */}
            {isExpanded && (
              <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12">
                {/* Category tag */}
                {panel.category && (
                  <span className="inline-block self-start px-3 py-1 mb-4 text-xs font-medium tracking-wider text-white uppercase bg-white/20 backdrop-blur-md rounded-full border border-white/30">
                    {panel.category}
                  </span>
                )}

                {/* Title */}
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-3 tracking-tight leading-tight">
                  {panel.title || `Project ${index + 1}`}
                </h2>

                {/* Description */}
                {panel.description && (
                  <p className="text-white/90 text-base md:text-lg max-w-xl mb-6 leading-relaxed line-clamp-3">
                    {panel.description}
                  </p>
                )}

                {/* Metadata row */}
                <div className="flex flex-wrap items-center gap-6 text-white/70 text-sm mb-6">
                  {panel.year && (
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-white/50" />
                      <span>{panel.year}</span>
                    </div>
                  )}
                  {panel.client && (
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-white/50" />
                      <span>{panel.client}</span>
                    </div>
                  )}
                  {panel.role && (
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-white/50" />
                      <span>{panel.role}</span>
                    </div>
                  )}
                </div>

                {/* CTA */}
                {panel.link && (
                  <a
                    href={panel.link}
                    onClick={(e) => e.stopPropagation()}
                    className="inline-flex items-center gap-2 text-white font-medium group/link hover:gap-3 transition-all duration-300"
                  >
                    <span>View Case Study</span>
                    <svg
                      className="w-5 h-5 transition-transform group-hover/link:translate-x-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </a>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ExpandablePanel;