import React from "react";
import { PokemonList } from "../../Types";

interface BagPokemonListProps {
  pokemonList: PokemonList;
}

export const BagPokemonList: React.FC<BagPokemonListProps> = ({
  pokemonList,
}) => {
  return (
    <div className="flex flex-col">
      {pokemonList.map((pokemon) => {
        return <p>{pokemon.name}</p>;
      })}
    </div>
  );
};
