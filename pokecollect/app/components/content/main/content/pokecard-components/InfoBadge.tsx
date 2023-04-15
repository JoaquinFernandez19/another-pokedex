import React, { useContext, useRef } from "react";
import { CurrentPokemonContext } from "../PokeCard";
import { Dispatch, SetStateAction } from "react";
interface InfoBadgeProps {
  setShowStats: Dispatch<SetStateAction<boolean>>;
  showStats: boolean;
}

export const InfoBadge: React.FC<InfoBadgeProps> = ({
  setShowStats,
  showStats,
}) => {
  const { color } = useContext(CurrentPokemonContext);
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
