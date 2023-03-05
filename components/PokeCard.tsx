import Image from "next/image";
import React from "react";
import { Pokemon } from "./Types";

//Undefined bc at load we dont have data yet
interface PokeCardprops {
  pokemon: Pokemon;
}

export const PokeCard: React.FC<PokeCardprops> = ({ pokemon }) => {
  return (
    <div>
      <Image src={pokemon.img} alt={pokemon.name} width={300} height={300} />
      <h1 className="text-center text-5xl text-emerald-300 mt-5">{pokemon.name}</h1>
    </div>
  );
};
