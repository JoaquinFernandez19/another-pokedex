import React from "react";
import { PokemonList, Pokemon } from "../../../lib/Types";
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
        if (typeof pokemon === "string") {
          return <BagPokemonUnit empty={true} key={`empty-${i}`} index={i} />;
        }
        return <BagPokemonUnit pokemon={pokemon} key={`pk-${i}`} index={i} />;
      })}
    </div>
  );
};
