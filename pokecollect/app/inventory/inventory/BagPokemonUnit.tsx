"use client";

import React from "react";
import { Pokemon } from "../../lib/Types";
import { AnimatePresence, motion } from "framer-motion";
interface BagPokemonUnitProps {
  pokemon?: Pokemon;
  index: number;
}

export const BagPokemonUnit: React.FC<BagPokemonUnitProps> = ({
  pokemon,
  index,
}) => {
  if (pokemon?.amount) {
    return (
      <div
        className={
          "bag-pokemon-unit cursor-pointer relative bg-cover overflow-hidden"
        }
        style={{ backgroundImage: `url(${pokemon?.sm_img})` }}
        key={index}
      >
        <span
          className="absolute right-2 bottom-0 opacity-30  text-xs md:text-lg  md:right-3 "
          style={{ backgroundColor: pokemon.amount > 1 ? pokemon.color : "" }}
        >
          {pokemon.amount > 1 ? pokemon.amount : ""}
        </span>
      </div>
    );
  }
  return <></>;
};
