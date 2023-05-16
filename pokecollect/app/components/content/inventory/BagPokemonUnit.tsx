"use client";

import React from "react";
import { Pokemon } from "../../../lib/Types";
import { AnimatePresence, motion } from "framer-motion";
interface BagPokemonUnitProps {
  pokemon?: Pokemon;
  empty?: boolean;
  index: number;
}

export const BagPokemonUnit: React.FC<BagPokemonUnitProps> = ({
  pokemon,
  empty,
  index,
}) => {
  const base_classes = " cursor-pointer relative";
  const className_ = empty
    ? "bg-contain bg-center bg-no-repeat opacity-20" + base_classes
    : "bg-cover" + base_classes;
  const style = empty
    ? { backgroundImage: `url('./empty-pokeball.png')` }
    : { backgroundImage: `url(${pokemon?.sm_img})` };
  if (pokemon?.amount) {
    return (
      <div className={className_} style={style} key={index}>
        <span className="absolute right-2 bottom-0 opacity-30">
          {pokemon.amount > 1 ? pokemon.amount : ""}
        </span>
      </div>
    );
  }
  return <></>;
};
