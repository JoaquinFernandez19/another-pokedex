import { AppContext } from "@/app/lib/AppInitialState";
import React, { useContext, useRef } from "react";
import { FaInfoCircle } from "react-icons/fa";
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
      waitingAnimation.current = true;
      setTimeout(function () {
        waitingAnimation.current = false;
      }, 500);
    }
  };
  return (
    <span
      onClick={handleClick}
      className=" cursor-pointer text-[25px] pt-[2px]"
    >
      <FaInfoCircle
        style={{
          color: state.pokemonCollection[state.currPokemon].color,
          filter: "contrast(0.5)",
        }}
      />
    </span>
  );
};
