import React from "react";
import { PokemonList, Pokemon } from "../../../../../utils/Types";

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
    <div className="inventory-pokemon-list ">
      {inventory.map((pokemon, i) => {
        if (typeof pokemon === "string") {
          return (
            <div
              key={i}
              className="bg-contain bg-center bg-no-repeat opacity-20"
              style={{ backgroundImage: `url('./empty-pokeball.png')` }}
            ></div>
          );
        }
        return (
          <div
            key={i}
            className="bg-cover"
            style={{ backgroundImage: `url(${pokemon.sm_img})` }}
          ></div>
        );
      })}
    </div>
  );
};
