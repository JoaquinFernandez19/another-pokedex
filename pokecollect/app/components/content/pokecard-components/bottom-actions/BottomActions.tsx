import React from "react";
import { ProfileIcon } from "./ProfileIcon";
import { NextPokemon } from "./NextPokemon";
import { motion } from "framer-motion";
import { OpenInventory } from "./OpenInventory";
interface BottomActionsProps {
  doInitialTransition: boolean;
}

export const BottomActions: React.FC<BottomActionsProps> = ({
  doInitialTransition,
}) => {
  return (
    <motion.div
      initial={{ opacity: doInitialTransition ? 0 : 1 }}
      animate={{ opacity: 1 }}
      transition={{
        opacity: {
          duration: doInitialTransition ? 2 : 0,
          type: "spring",
          delay: doInitialTransition ? 2 : 0,
        },
      }}
      className="flex gap-2 justify-center items-end"
    >
      <ProfileIcon />
      <NextPokemon />
      <OpenInventory />
    </motion.div>
  );
};
