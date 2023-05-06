import React from "react";
import { Catcher } from "./Catcher";
import { NextPokemon } from "./NextPokemon";
import { motion } from "framer-motion";
interface BottomActionsProps {
  alredyOwned: boolean;
}

export const BottomActions: React.FC<BottomActionsProps> = ({ alredyOwned }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ opacity: { duration: 2, type: "spring", delay: 2 } }}
      className="flex fixed top-3 z-10 mx-auto justify-center gap-2 md:relative md:top-auto  md:mt-10"
    >
      <NextPokemon />
      <Catcher alredyOwned={alredyOwned} />
    </motion.div>
  );
};
