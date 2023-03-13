import React, { useRef } from "react";
import { Pokemon } from "../../Types";
import { motion } from "framer-motion";

import { Dispatch, SetStateAction } from "react";
interface InfoBadgeProps {
  currPokemon: Pokemon;
  setShowStats: Dispatch<SetStateAction<boolean>>;
  showStats: boolean;
}

export const InfoBadge: React.FC<InfoBadgeProps> = ({
  currPokemon,
  setShowStats,
  showStats,
}) => {
  const { color } = currPokemon;
  const waitingAnimation = useRef<boolean>(false);
  const handleClick = () => {
    if (!waitingAnimation.current) {
      setShowStats(!showStats);
      waitingAnimation.current = true;
      setTimeout(() => {
        waitingAnimation.current = false;
      }, 1000);
    }
  };
  return (
    <span
      onClick={handleClick}
      style={{ backgroundColor: color }}
      className="px-2 cursor-pointer text-xs pt-[2px]"
    >
      Info
    </span>
  );
};
