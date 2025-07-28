import { useEffect, useState } from "react";

/**
 * Custom hook to listen to media query matches.
 * @param query - The media query string.
 * @returns A boolean indicating if the media query matches.
 */
function useMatchMedia(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mediaQueryList = window.matchMedia(query);
    const documentChangeHandler = () => setMatches(mediaQueryList.matches);

    // Check initial match
    documentChangeHandler();

    // Listen for changes
    mediaQueryList.addListener(documentChangeHandler);

    // Cleanup
    return () => mediaQueryList.removeListener(documentChangeHandler);
  }, [query]);

  return matches;
}

export default useMatchMedia;
