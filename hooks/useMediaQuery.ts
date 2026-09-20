"use client";

import { useEffect, useState } from "react";

/** SSR-safe media query hook. Returns false on the server + first paint. */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    const update = () => setMatches(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, [query]);

  return matches;
}

/** Convenience: true when the viewport is at least the `md` breakpoint. */
export function useIsDesktop() {
  return useMediaQuery("(min-width: 768px)");
}

/** True when the pointer is fine (mouse), i.e. custom cursor is worth it. */
export function useHasFinePointer() {
  return useMediaQuery("(pointer: fine)");
}
