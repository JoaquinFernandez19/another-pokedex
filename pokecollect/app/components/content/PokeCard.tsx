"use client";

import React, { useEffect, useState, useContext, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PokeStats, pokeStatsVariants } from "./pokecard-components/PokeStats";
import Image from "next/image";
import { AppContext } from "@/app/lib/AppInitialState";
import { CompletedSessionMark } from "./pokecard-components/CompletedSessionMark";
import { Title } from "./pokecard-components/Title";

export const PokeCard: React.FC = () => {
  //States and refs
  const [showStats, setShowStats] = useState<boolean>(false);
  const [lastPokemonCatched, setlastPokemonCatched] = useState<boolean>(false);

  //Context
  const { state } = useContext(AppContext);

  useEffect(() => {
    if (state.credits === 0) {
      setlastPokemonCatched(true);
    } else {
      setlastPokemonCatched(false);
    }
  }, [state.ownedPokemons, state.currPokemon]);

  return (
    <motion.div
      animate={{ opacity: [0, 1] }}
      transition={{
        opacity: {
          duration: state.doInitialAnimation ? 3 : 0,
          type: "spring",
          delay: state.doInitialAnimation ? 1 : 0,
        },
      }}
      initial={{ opacity: 0 }}
      key={`${state.pokemonCollection[state.currPokemon].id}`}
      className="flex flex-col justify-center items-center"
    >
      <Title setShowStats={setShowStats} showStats={showStats} />
      <div
        className={`${
          lastPokemonCatched ? "owned" : "unowned"
        } relative md:grid  gap-2 xl:px-20 md:gap-0 md:grid-cols-[1fr,2fr,1fr]`}
      >
        <div className="relative md:col-start-2 md:col-end-3">
          <Image
            src={state.pokemonCollection[state.currPokemon].img}
            alt={state.pokemonCollection[state.currPokemon].name}
            width={400}
            height={400}
            className="m-auto poke-circle border-solid z-10 px-10 md:px-0 "
          />
          {lastPokemonCatched && <CompletedSessionMark />}
        </div>
        <AnimatePresence>
          {showStats && (
            <motion.div
              key="poke-stats"
              className="overflow-hidden grid grid-cols-1"
              variants={pokeStatsVariants}
              exit={state.isMobile ? "exitMobile" : "exitDesktop"}
              animate={state.isMobile ? "openMobile" : "openDesktop"}
            >
              <PokeStats />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};
