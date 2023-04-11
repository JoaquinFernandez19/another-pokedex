import React, { useContext } from "react";
import { BagPokemonList } from "./BagPokemonList";
import { Pokemon } from "../../Types";
import { isMobileContext } from "../../context/Context";

interface PokeCardprops {
  ownedPokemons: Pokemon[];
}
export const Inventory: React.FC<PokeCardprops> = ({ ownedPokemons }) => {
  const isMobile = useContext(isMobileContext);
  const imageUrl = isMobile ? "inventory-m" : "inventory";

  if (ownedPokemons.length > 0) {
    return (
      <div
        className="inventory "
        style={{ backgroundImage: `url("./${imageUrl}.png")` }}
      >
        <BagPokemonList pokemonList={ownedPokemons} />
      </div>
    );
  }
  return <></>;
};
