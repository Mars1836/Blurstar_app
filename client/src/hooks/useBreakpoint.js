import useMediaQuery from "./useMediaQuery";
import React from "react";

function useBreakpoint() {
  const breakPoints = {
    isPc: useMediaQuery("(min-width:1024px)"),
    isTablet: useMediaQuery("(min-width :740px) and (max-width:1023px) "),
    isMobile: useMediaQuery("(max-width : 739px)"),
  };
  return breakPoints;
}

export default useBreakpoint;
