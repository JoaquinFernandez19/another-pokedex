import React, { useEffect, useRef, useState } from "react";
import { preLoadImgs } from "../../utils/Utils";
import { Pokemon } from "../Types";
import { Randomizer } from "./pokecard-components/Randomizer";
import { motion } from "framer-motion";
import { HiddenCard } from "./HiddenCard";

import { InfoBadge } from "./pokecard-components/InfoBadge";
import { PokeStats } from "./pokecard-components/PokeStats";
const CREDIT_LIMITS = Number(process.env.NEXT_PUBLIC_CREDITS);
//Undefined bc at load we dont have data yet
interface PokeCardprops {
  pokemonList: Pokemon[];
}

export const PokeCard: React.FC<PokeCardprops> = ({ pokemonList }) => {
  //States and refs
  const [credits, setCredits] = useState<number>(CREDIT_LIMITS);
  const [firstPokemonSeen, setFirstPokemonSeen] = useState<boolean>(false);
  const currPokIndex = useRef<number>(0);
  const [currPokemon, setPokemon] = useState<Pokemon>(
    pokemonList[currPokIndex.current]
  );
  const [showStats, setShowStats] = useState<boolean>(false);
  //Functions
  const randomize = () => {
    if (credits > 0) setCredits(credits - 1);
  };

  //Effects
  useEffect(() => {
    if (credits === CREDIT_LIMITS) return;
    currPokIndex.current++;

    setPokemon(pokemonList[currPokIndex.current]);

    return () => {};
  }, [credits]);

  useEffect(() => {
    const preLoadImgEffect = () => {
      preLoadImgs(pokemonList.map((pk) => pk.img));
    };
    preLoadImgEffect();
    return () => {};
  }, []);

  //Return jsx
  if (firstPokemonSeen) {
    return (
      <div className="relative pokecard">
        <motion.div
          animate={{ opacity: [0, 1] }}
          key={`${currPokemon.id}`}
          className="flex flex-col items-center"
        >
          <div className="flex justify-center items-end mb-5 md:mb-10">
            <h1 className="text-center text-3xl text-white  w-auto mr-3 leading-[24px]">
              {currPokemon.name}
            </h1>
            <InfoBadge
              currPokemon={currPokemon}
              setShowStats={setShowStats}
              showStats={showStats}
            />
          </div>

          <div className=" relative grid grid-cols-1 gap-16 xl:px-20 md:gap-0 md:grid-cols-[1fr,2fr,1fr]">
            <img
              src={currPokemon.img}
              alt={currPokemon.name}
              width={400}
              height={400}
              className="m-auto poke-circle border-solid z-10 px-10 md:px-0 md:col-start-2 md:col-end-3  "
            />
            <PokeStats
              currPokemon={currPokemon}
              showStats={showStats}
              setShowStats={setShowStats}
            />
          </div>
        </motion.div>
        <Randomizer usageLimits={`${credits}`} trigger={randomize} />
      </div>
    );
  } else {
    return <HiddenCard showFirstPokemon={setFirstPokemonSeen} />;
  }
};
