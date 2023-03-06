import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { fetchPokemons, preLoadImgs } from "../../utils/Utils";
import { Pokemon } from "../Types";
import { Randomizer } from "./Randomizer";

const CREDIT_LIMITS = 3;
//Undefined bc at load we dont have data yet
interface PokeCardprops {
  pokemonList: Pokemon[];
}

export const PokeCard: React.FC<PokeCardprops> = ({ pokemonList }) => {
  const [credits, setCredits] = useState<number>(CREDIT_LIMITS);
  const currPokIndex = useRef<number>(0);

  const [currPokemon, setPokemon] = useState<Pokemon>(pokemonList[currPokIndex.current]);
  const [loading, setLoading] = useState(false);
  const randomize = () => {
    if (credits > 0) setCredits(credits - 1);
  };

  useEffect(() => {
    if (credits === CREDIT_LIMITS) return;
    currPokIndex.current++;
    setLoading(true);
    setPokemon(pokemonList[currPokIndex.current]);
  }, [credits]);
  //
  useEffect(() => {
    const preLoadImgEffect = () => {
      preLoadImgs(
        pokemonList.map((pk) => {
          return pk.img;
        })
      );
    };
    preLoadImgEffect();
  }, []);

  return (
    <div className="relative">
      <div className={`${loading ? "invisible" : "visible"}`}>
        <h1 className="text-center text-3xl text-white mt-5 pokefont">{currPokemon.name}</h1>
        <Image
          src={currPokemon.img}
          alt={currPokemon.name}
          width={300}
          height={300}
          className="m-auto"
          onLoad={() => setLoading(false)}
          priority
        />
      </div>
      <div className={`${!loading ? "hidden" : "hidden"} absolute top-0`}>
        <h1 className="text-5xl">Loading...</h1>
      </div>
      <Randomizer usageLimits={`${credits}`} trigger={randomize} />
    </div>
  );
};
