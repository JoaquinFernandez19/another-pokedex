import React, { Dispatch, SetStateAction, useContext } from "react";
import { BagPokemonList } from "./BagPokemonList";
import { Pokemon } from "../../Types";

interface PokeCardprops {
  ownedPokemons: Pokemon[];
}
export const Inventory: React.FC<PokeCardprops> = ({ ownedPokemons }) => {
  const maxPoke = 6;

  return (
    <div
      className="inventory"
      style={{ backgroundImage: 'url("./inventory.png")' }}
    >
      <BagPokemonList pokemonList={ownedPokemons} />
    </div>
  );
};
