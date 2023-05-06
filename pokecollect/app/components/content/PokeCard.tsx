"use client";

import React, { useEffect, useState, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { InfoBadge } from "./pokecard-components/InfoBadge";
import { PokeStats } from "./pokecard-components/PokeStats";
import { BottomActions } from "./pokecard-components/bottom-actions/BottomActions";
import { BackgroundLogo } from "../layout/BackgroundLogo";
import Image from "next/image";
import { AppContext } from "@/app/lib/AppInitialState";

export const PokeCard: React.FC = () => {
  //States and refs
  const [showStats, setShowStats] = useState<boolean>(false);
  const [alredyOwned, setAlredyOwned] = useState<boolean>(false);

  //Context
  const { state } = useContext(AppContext);

  useEffect(() => {
    if (
      state.ownedPokemons.find(
        (pokemon) => pokemon?.id === state.pokemonCollection[state.currPokemon].id
      )
    ) {
      setAlredyOwned(true);
    } else {
      setAlredyOwned(false);
    }
  }, [state.ownedPokemons, state.currPokemon]);

  if (state.clickedInitialPokeBall) {
    return (
      <>
        <div className="h-full flex justify-center md:flex-col items-center relative md:bottom-0 ">
          <motion.div
            animate={{ opacity: [0, 1] }}
            transition={{
              opacity: {
                duration: 3,
                type: "spring",
                delay: state.currPokemon > 0 ? 0 : 1,
              },
            }}
            initial={{ opacity: 0 }}
            key={`${state.pokemonCollection[state.currPokemon].id}`}
            className="flex flex-col items-center"
          >
            {alredyOwned ? (
              <motion.svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ opacity: { duration: 0.2, delay: 0.1 } }}
                stroke="currentColor"
                className={`absolute top-[30%] h-[200px] z-50 text-[${
                  state.pokemonCollection[state.currPokemon].color
                }]`}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </motion.svg>
            ) : (
              ""
            )}
            <div className="flex justify-center items-end mb-5 md:mb-10">
              <h1 className="text-center text-3xl text-white  w-auto mr-3 leading-[24px]">
                #{state.pokemonCollection[state.currPokemon].id}{" "}
                {state.pokemonCollection[state.currPokemon].name}
              </h1>
              <InfoBadge setShowStats={setShowStats} showStats={showStats} />
            </div>

            <div
              className={`${
                alredyOwned ? "owned" : "unowned"
              } relative grid grid-cols-1 gap-2 xl:px-20 md:gap-0 md:grid-cols-[1fr,2fr,1fr]`}
            >
              <Image
                src={state.pokemonCollection[state.currPokemon].img}
                alt={state.pokemonCollection[state.currPokemon].name}
                width={400}
                height={400}
                className="m-auto poke-circle border-solid z-10 px-10 md:px-0 md:col-start-2 md:col-end-3  "
              />
              <AnimatePresence>
                {showStats ? (
                  <motion.div key="poke-stats" exit={{ opacity: 0, x: -100 }}>
                    <PokeStats />
                  </motion.div>
                ) : (
                  ""
                )}
              </AnimatePresence>
            </div>
          </motion.div>
          <BottomActions alredyOwned={alredyOwned} />
        </div>
        <BackgroundLogo />
      </>
    );
  }
  return <></>;
};
