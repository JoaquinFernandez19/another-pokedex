import { AppContext } from "@/app/lib/AppInitialState";
import React, { useContext, useRef } from "react";
import { FaInfoCircle } from "react-icons/fa";
import { Dispatch, SetStateAction } from "react";
import { useClickInfoBadgeCb } from "./Hooks";
interface InfoBadgeProps {
  setShowStats: Dispatch<SetStateAction<boolean>>;
  showStats: boolean;
}

export const InfoBadge: React.FC<InfoBadgeProps> = ({ setShowStats, showStats }) => {
  const { state } = useContext(AppContext);
  const clickInfoBadgeCB = useClickInfoBadgeCb(setShowStats, showStats);
  return (
    <span onClick={clickInfoBadgeCB} className=" cursor-pointer text-[25px] pt-[2px]">
      <FaInfoCircle
        style={{
          color: state.pokemonCollection[state.currPokemon].color,
          filter: "contrast(0.5)",
        }}
      />
    </span>
  );
};
