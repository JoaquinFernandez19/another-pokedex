"use client";

import React from "react";
import { Pokemon } from "../../../lib/Types";
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
        className={"cursor-pointer relative bg-cover"}
        style={{ backgroundImage: `url(${pokemon?.sm_img})` }}
        key={index}
      >
        <span className="absolute right-2 bottom-0 opacity-30">
          {pokemon.amount > 1 ? pokemon.amount : ""}
        </span>
      </div>
    );
  }
  return <></>;
};
