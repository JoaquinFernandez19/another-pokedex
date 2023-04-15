"use client";

import React, { useEffect, useRef, useState, use } from "react";
import { preLoadImgs } from "../../../../utils/Utils";
import { Pokemon, PokemonList } from "../../../../utils/Types";
import { motion } from "framer-motion";
import { InfoBadge } from "./pokecard-components/InfoBadge";
import { PokeStats } from "./pokecard-components/PokeStats";
import { PokePrice } from "./pokecard-components/PokePrice";
import { BottomActions } from "./pokecard-components/bottom-actions/BottomActions";
import { CurrentPokemonContext } from "../../context/Context";
import { fetchPokemons } from "../../../../utils/Utils";
import { BackgroundLogo } from "../../../layout/BackgroundLogo";
import Image from "next/image";

const CREDIT_LIMITS = Number(process.env.NEXT_PUBLIC_CREDITS);
//Undefined bc at load we dont have data yet
const fetchPokemons_ = fetchPokemons();
export const PokeCard: React.FC<{ inited: boolean }> = ({ inited }) => {
  debugger;
  //Fetch pokemonList
  const pokemonList = use(fetchPokemons_);
  //States and refs

  const [credits, setCredits] = useState<number>(CREDIT_LIMITS);
  const currPokIndex = useRef<number>(0);
  const [currPokemon, setPokemon] = useState<Pokemon | null>(null);
  const [showStats, setShowStats] = useState<boolean>(false);

  useEffect(() => {
    // async function fetchData() {
    //   const response = await fetchPokemons();
    //   debugger;
    const preLoadImgEffect = () => {
      preLoadImgs(pokemonList.map((pk) => pk.img));
    };
    preLoadImgEffect();

    setPokemon(pokemonList[currPokIndex.current]);
    // }
    // fetchData();
  }, []);

  useEffect(() => {
    if (credits === CREDIT_LIMITS) return;
    currPokIndex.current++;
    setPokemon(pokemonList[currPokIndex.current]);
    return () => {};
  }, [credits]);

  if (currPokemon && inited) {
    return (
      <CurrentPokemonContext.Provider value={currPokemon}>
        <div className="bottom-4 h-full flex justify-center md:flex-col items-center relative md:bottom-0 ">
          <motion.div
            animate={{ opacity: [0, 1] }}
            key={`${currPokemon.id}`}
            className="flex flex-col items-center"
          >
            <div className="flex justify-center items-end mb-5 md:mb-10">
              <h1 className="text-center text-3xl text-white  w-auto mr-3 leading-[24px]">
                <PokePrice /> - {currPokemon.name}
              </h1>
              <InfoBadge setShowStats={setShowStats} showStats={showStats} />
            </div>

            <div className=" relative grid grid-cols-1 gap-2 xl:px-20 md:gap-0 md:grid-cols-[1fr,2fr,1fr]">
              <Image
                src={currPokemon.img}
                alt={currPokemon.name}
                width={400}
                height={400}
                className="m-auto poke-circle border-solid z-10 px-10 md:px-0 md:col-start-2 md:col-end-3  "
              />
              {showStats ? <PokeStats currPokemon={currPokemon} /> : ""}
            </div>
          </motion.div>
          <BottomActions usageLimits={`${credits}`} randomize={setCredits} />
        </div>
        <BackgroundLogo />
      </CurrentPokemonContext.Provider>
    );
  }
  return <></>;
};
export { CurrentPokemonContext };
