import { useEffect } from "react";
import { trackAnchorConversion } from "@/lib/analytics";

const ConversionTracking = () => {
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (!(event.target instanceof Element)) return;
      const anchor = event.target.closest<HTMLAnchorElement>("a[href]");
      if (anchor) trackAnchorConversion(anchor);
    };
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return null;
};

export default ConversionTracking;
