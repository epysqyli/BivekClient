import { useEffect, useState } from "react";

const useMediaQuery = (query: string) => {
  const [isMatch, setIsMatch] = useState<boolean>(false);

  useEffect(() => {
    const media = window.matchMedia(query);

    if (media.matches !== isMatch) setIsMatch(media.matches);
    window.addEventListener("resize", () => setIsMatch(media.matches));

    return () => window.removeEventListener("resize", () => setIsMatch(media.matches));
  }, [isMatch, query]);

  return isMatch;
};

const useIsNarrow = () => useMediaQuery("(max-width: 1024px)");

export { useIsNarrow };
