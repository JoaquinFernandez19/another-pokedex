import React, { useEffect, useRef, useState } from "react";
import { preLoadImgs } from "../../utils/Utils";
import { Pokemon } from "../Types";
import { Randomizer } from "./Randomizer";
import { motion } from "framer-motion";
import { HiddenCard } from "./HiddenCard";
const CREDIT_LIMITS = Number(process.env.NEXT_PUBLIC_CREDITS);
//Undefined bc at load we dont have data yet
interface PokeCardprops {
  pokemonList: Pokemon[];
}

//
export const PokeCard: React.FC<PokeCardprops> = ({ pokemonList }) => {
  const [credits, setCredits] = useState<number>(CREDIT_LIMITS);
  const [firstPokemonSeen, setFirstPokemonSeen] = useState<boolean>(false);
  const currPokIndex = useRef<number>(0);

  const [currPokemon, setPokemon] = useState<Pokemon>(
    pokemonList[currPokIndex.current]
  );

  const randomize = () => {
    if (credits > 0) setCredits(credits - 1);
  };

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

  if (firstPokemonSeen) {
    return (
      <div className="relative">
        <motion.div animate={{ opacity: [0, 1] }} key={`${currPokemon.id}`}>
          <h1 className="text-center text-3xl text-white mb-10 pokefont">
            {currPokemon.name}
          </h1>
          <div className=" relative">
            <img
              src={currPokemon.img}
              alt={currPokemon.name}
              width={400}
              height={400}
              className={`m-auto`}
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
