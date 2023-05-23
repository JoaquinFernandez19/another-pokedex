"use client";
import React, { useContext } from "react";
import { OpenProfile } from "./OpenProfile";
import { NextPokemon } from "./NextPokemon";
import { motion } from "framer-motion";
import { OpenInventory } from "./OpenInventory";
import { AppContext } from "@/app/lib/AppInitialState";
interface BottomActionsProps {
  doInitialTransition: boolean;
}

export const BottomActions: React.FC<BottomActionsProps> = ({
  doInitialTransition,
}) => {
  const { state } = useContext(AppContext);
  if (!state.clickedInitialPokeBall) return <></>;
  return (
    <motion.div
      initial={{ opacity: doInitialTransition ? 0 : 1 }}
      animate={{ opacity: 1 }}
      transition={{
        opacity: {
          duration: doInitialTransition ? 2 : 0,
          type: "spring",
          delay: doInitialTransition ? 1 : 0,
        },
      }}
      className="flex gap-2 justify-center items-end pb-[30px]"
    >
      <OpenProfile />
      <NextPokemon />
      <OpenInventory />
    </motion.div>
  );
};
