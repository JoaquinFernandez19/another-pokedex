import React from "react";
import { PokemonList, Pokemon } from "../../../utils/Types";
import { BagPokemonUnit } from "./BagPokemonUnit";

interface BagPokemonListProps {
  pokemonList: PokemonList;
}

export const BagPokemonList: React.FC<BagPokemonListProps> = ({
  pokemonList,
}) => {
  const difference = 6 - pokemonList.length;
  let inventory: (string | Pokemon)[] = [];
  if (difference != 0) {
    //Means we need to add difference number of slots to inventory after concat
    inventory = inventory.concat(pokemonList);
    for (let i = 0; i < difference; i++) {
      inventory.push("");
    }
  } else {
    inventory = pokemonList;
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
