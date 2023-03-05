import Image from "next/image";
import React, { useEffect, useState } from "react";
import { fetchSinglePokemon } from "../../utils/Utils";
import { Pokemon } from "../Types";
import { Randomizer } from "./Randomizer";

//Undefined bc at load we dont have data yet
interface PokeCardprops {
  pokemon: Pokemon;
  initialPokemon: number;
}

export const PokeCard: React.FC<PokeCardprops> = ({ pokemon, initialPokemon }) => {
  const CREDIT_LIMITS = 3;
  const [credits, setCredits] = useState<number>(CREDIT_LIMITS);
  const [currPokemon, setPokemon] = useState<Pokemon>(pokemon);
  const [loading, setLoading] = useState(false);
  const randomize = () => {
    if (credits > 0) setCredits(credits - 1);
  };

  useEffect(() => {
    if (credits === CREDIT_LIMITS) return;

    const fetchData = async () => {
      const { data } = await fetchSinglePokemon(1008);
      //Start loading the img
      setLoading(true);
      //Check to no repeat pokemon
      if (data.id != initialPokemon) return setPokemon(data);
      //if the pokemon are the same, fetch again (randomized)
      fetchData();
    };

    fetchData().catch(console.error);
  }, [credits]);

  const handleImgLoad = () => {
    setLoading(false);
  };
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
          onLoad={handleImgLoad}
          priority
        />
      </div>
      <div className={`${!loading ? "invisible" : "visible"} absolute top-0`}>
        <h1 className="text-5xl">Loading...</h1>
      </div>
      <Randomizer usageLimits={`${credits}`} trigger={randomize} />
    </div>
  );
};
