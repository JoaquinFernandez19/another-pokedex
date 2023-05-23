import React from "react";
import { PokemonList, Pokemon } from "../../lib/Types";
import { BagPokemonUnit } from "./BagPokemonUnit";

interface BagPokemonListProps {
  pokemonCollection: PokemonList;
}

export const BagPokemonList: React.FC<BagPokemonListProps> = ({
  pokemonCollection,
}) => {
  return (
    <div className="inventory-pokemon-list">
      {pokemonCollection.map((pokemon, i) => {
        return <BagPokemonUnit pokemon={pokemon} key={`pk-${i}`} index={i} />;
      })}
    </div>
  );
};
