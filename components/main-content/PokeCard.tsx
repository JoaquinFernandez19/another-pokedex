import Image from "next/image";
import React, { useEffect, useState } from "react";
import { fetchSinglePokemon } from "../../utils/Utils";
import { Pokemon } from "../Types";
import { Randomizer } from "./Randomizer";

//Undefined bc at load we dont have data yet
interface PokeCardprops {
  pokemon: Pokemon;
}

export const PokeCard: React.FC<PokeCardprops> = ({ pokemon }) => {
  const CREDIT_LIMITS = 11000;
  const [credits, setCredits] = useState<number>(CREDIT_LIMITS);
  const [currPokemon, setPokemon] = useState<Pokemon>(pokemon);
  const [loading, setLoading] = useState(false);
  const randomize = () => {
    if (credits > 0) setCredits(credits - 1);
  };

  useEffect(() => {
    if (credits === CREDIT_LIMITS) return;
    const fetchData = async () => {
      const { data, initialPokemon } = await fetchSinglePokemon(1008);
      //Start loading the img
      setLoading(true);
      //Check to no repeat pokemon
      if (currPokemon.id != initialPokemon) return setPokemon(data);
      //if the pokemon are the same, fetch again (randomized)
      fetchData();
    };

    fetchData().catch(console.error);
  }, [credits]);

  return (
    <div>
      <div
        className={`${loading ? "hidden" : "block"}`}
        style={{ height: "600px", width: "500px" }}
      >
        <Image
          src={currPokemon.img}
          alt={currPokemon.name}
          width={300}
          height={300}
          onLoad={() => setLoading(false)}
        />
        <h1 className="text-center text-5xl text-emerald-300 mt-5">
          {currPokemon.name}
        </h1>
      </div>
      <div
        className={`${!loading ? "hidden" : "block"}`}
        style={{ height: "600px", width: "500px" }}
      >
        <h1 className="text-5xl">Loading...</h1>
      </div>
      <Randomizer usageLimits={`${credits}`} trigger={randomize} />
    </div>
  );
};
