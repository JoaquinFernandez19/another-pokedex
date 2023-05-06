import { AppContext } from "@/app/lib/AppInitialState";
import React, { useContext, useRef } from "react";

import { Dispatch, SetStateAction } from "react";
interface InfoBadgeProps {
  setShowStats: Dispatch<SetStateAction<boolean>>;
  showStats: boolean;
}

export const InfoBadge: React.FC<InfoBadgeProps> = ({
  setShowStats,
  showStats,
}) => {
  const { state, dispatch } = useContext(AppContext);
  const waitingAnimation = useRef<boolean>(false);
  const handleClick = () => {
    if (!waitingAnimation.current) {
      setShowStats(!showStats);
      waitingAnimation.current = false;
    }
  };
  return (
    <span
      onClick={handleClick}
      style={{ backgroundColor: state.pokemonCollection[state.currPokemon].color }}
      className="px-2 cursor-pointer text-xs pt-[2px]"
    >
      Info
    </span>
  );
};
