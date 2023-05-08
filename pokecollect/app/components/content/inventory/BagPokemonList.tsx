import React from "react";
import { PokemonList, Pokemon } from "../../../lib/Types";
import { BagPokemonUnit } from "./BagPokemonUnit";

interface BagPokemonListProps {
  pokemonCollection: PokemonList;
}

export const BagPokemonList: React.FC<BagPokemonListProps> = ({
  pokemonCollection,
}) => {
  const difference = 6 - pokemonCollection.length;
  let inventory: (string | Pokemon)[] = [];
  if (difference != 0) {
    //Means we need to add difference number of slots to inventory after concat
    inventory = inventory.concat(pokemonCollection);
    for (let i = 0; i < difference; i++) {
      inventory.push("");
    }
  } else {
    inventory = pokemonCollection;
  }

  return (
    <div className="inventory-pokemon-list">
      {inventory.map((pokemon, i) => {
        if (typeof pokemon === "string") {
          return <BagPokemonUnit empty={true} key={`empty-${i}`} index={i} />;
        }
        return <BagPokemonUnit pokemon={pokemon} key={`pk-${i}`} index={i} />;
      })}
    </div>
  );
};
