"use client";

import React, { useContext } from "react";
import { UserContext } from "../../../../context/Context";
import { CurrentPokemonContext } from "../../PokeCard";
export const Purchaser: React.FC = () => {
  const { coins, setCoins, ownedPokemons, setOwnedPokemons } =
    useContext(UserContext);
  const { value, color } = useContext(CurrentPokemonContext);
  const currPokemon = useContext(CurrentPokemonContext);
  const handleBuy = () => {
    if (coins >= value && ownedPokemons.length < 6) {
      //we admit buying
      setCoins(coins - value);
      setOwnedPokemons([...ownedPokemons, currPokemon]);
    }
  };

  return (
    <button
      onClick={handleBuy}
      className={`text-xl relative cursor-pointer  px-6 py-1.5   md:px-4 md:py-0.5 ${
        coins < value ? "disabled" : ""
      }`}
      style={{ backgroundColor: color }}
    >
      Buy
    </button>
  );
};
