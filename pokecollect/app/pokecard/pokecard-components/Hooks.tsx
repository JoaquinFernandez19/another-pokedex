import { useRef } from "react";

export const useClickInfoBadgeCb = (
  setShowStats: React.Dispatch<React.SetStateAction<boolean>>,
  showStats: boolean
) => {
  const waitingAnimation = useRef<boolean>(false);
  return () => {
    if (!waitingAnimation.current) {
      setShowStats(!showStats);
      waitingAnimation.current = true;
      setTimeout(function () {
        waitingAnimation.current = false;
      }, 500);
    }
  };
};

export const usePokeStatsOutlineVariants = () => {
  return {
    open: {
      height: ["0%", "100%"],
      transition: {
        height: { duration: 0.5, delay: 0.2, type: "ease-out" },
      },
    },
    openMobile: {
      width: ["0px", "100px"],
      height: ["0%", "100%"],
      transition: {
        width: { duration: 0.5, delay: 0.2, type: "ease-out" },
      },
    },
  };
};

export const pokeStatsVariants = {
  exitDesktop: {
    opacity: [1, 0],
    x: [0, -100],
  },
  exitMobile: {
    opacity: [1, 0],
    height: ["135px", "0px"],
  },
  openDesktop: {
    opacity: [0, 1],
    x: [-100, 0],
  },
  openMobile: {
    opacity: [0, 1],
    height: ["0px", "135px"],
  },
};
