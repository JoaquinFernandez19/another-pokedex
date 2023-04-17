import React, { Dispatch, SetStateAction } from "react";
import { Purchaser } from "./Purchaser";
import { Randomizer } from "./Randomizer";
import { motion } from "framer-motion";
interface BottomActionsProps {
  usageLimits: string;
  randomize: Dispatch<SetStateAction<number>>;
  alredyOwned: boolean;
}

export const BottomActions: React.FC<BottomActionsProps> = ({
  usageLimits,
  randomize,
  alredyOwned,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ opacity: { duration: 2, type: "spring", delay: 2 } }}
      className="flex fixed top-3 z-10 mx-auto justify-center gap-2 md:relative md:top-auto  md:mt-10"
    >
      <Randomizer usageLimits={`${usageLimits}`} randomize={randomize} />
      <Purchaser alredyOwned={alredyOwned} />
    </motion.div>
  );
};
