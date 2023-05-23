import { AppContext } from "@/app/lib/AppInitialState";
import React, { useContext } from "react";
import { InfoBadge } from "./InfoBadge";

interface TitleProps {
  setShowStats: React.Dispatch<React.SetStateAction<boolean>>;
  showStats: boolean;
}

export const Title: React.FC<TitleProps> = ({ setShowStats, showStats }) => {
  const { state } = useContext(AppContext);
  return (
    <>
      <div className="flex justify-center items-end mb-5 md:mb-10">
        <h1 className="text-center text-3xl text-white  w-auto mr-2 leading-[24px]">
          #{state.pokemonCollection[state.currPokemon].id}{" "}
          {state.pokemonCollection[state.currPokemon].name}
        </h1>
        <InfoBadge setShowStats={setShowStats} showStats={showStats} />
      </div>
    </>
  );
};
