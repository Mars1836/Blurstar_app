import React, { useEffect, useState } from "react";
function useMediaQuery(query) {
  const [matches, setMatches] = useState(false);
  useEffect(() => {
    const mediaQuery = window.matchMedia(query);
    setMatches(mediaQuery.matches);
    const handler = () => {
      setMatches(mediaQuery.matches);
    };
    mediaQuery.addEventListener("change", handler);
    return () => {
      mediaQuery.removeEventListener("change", handler);
    };
  }, []);
  return matches;
}

export default useMediaQuery;
