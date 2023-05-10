import React from "react";
import { ProfileIcon } from "./ProfileIcon";
import { NextPokemon } from "./NextPokemon";
import { motion } from "framer-motion";
import { OpenInventory } from "./OpenInventory";
interface BottomActionsProps {
  alredyOwned: boolean;
}

export const BottomActions: React.FC<BottomActionsProps> = ({
  alredyOwned,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ opacity: { duration: 2, type: "spring", delay: 2 } }}
      className="flex gap-2 justify-center items-end"
    >
      <ProfileIcon />
      <NextPokemon />
      <OpenInventory />
    </motion.div>
  );
};
