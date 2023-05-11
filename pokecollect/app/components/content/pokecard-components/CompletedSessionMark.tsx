import { AppContext } from "@/app/lib/AppInitialState";

import { motion } from "framer-motion";
import React, { useContext } from "react";

export const CompletedSessionMark: React.FC = ({}) => {
  const { state } = useContext(AppContext);

  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ opacity: { duration: 0.2, delay: 0.1 } }}
      stroke="currentColor"
      className={`absolute top-[100px] md:top-[200px] h-[200px] z-50 text-[${
        state.pokemonCollection[state.currPokemon].color
      }]`}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </motion.svg>
  );
};
