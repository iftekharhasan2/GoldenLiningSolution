import React, { createContext, useContext } from 'react';

// Stub Lenis context — falls back to native window scroll.
// Replace with a real Lenis setup if smooth scrolling is desired.

const LenisContext = createContext({
  lenis: null,
  isReady: true,
});

export const LenisProvider = ({ children }) => (
  <LenisContext.Provider value={{ lenis: null, isReady: true }}>
    {children}
  </LenisContext.Provider>
);

/** Returns the current Lenis context (or the stub). */
export const useLenisScroll = () => useContext(LenisContext);

/**
 * Returns the scroller element/target for ScrollTrigger.
 * When Lenis is not in use, returns null so ScrollTrigger uses window.
 */
export const getScroller = (ctx) => {
  if (!ctx || !ctx.lenis) return null;
  // If a real Lenis instance is provided, return its wrapper element.
  return ctx.lenis.wrapper ?? null;
};

export default LenisContext;
