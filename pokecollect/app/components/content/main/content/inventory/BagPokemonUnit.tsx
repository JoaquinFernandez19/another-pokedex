"use client";

import React from "react";
import { Pokemon } from "../../../../../utils/Types";
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

  const initial = empty ? { y: 100, opacity: 0.2 } : { y: 100, opacity: 1 };
  const animate = empty ? { y: 0, opacity: 0.2 } : { y: 0, opacity: 1 };
  const transition = {
    opacity: { duration: 0.2, type: "linear" },
    y: { duration: 0.2, type: "linear" },
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={initial}
        animate={animate}
        transition={transition}
        exit={{ y: 100, opacity: 0 }}
        className={className_}
        style={style}
        key={index}
      ></motion.div>
    </AnimatePresence>
  );
};
