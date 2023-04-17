"use client";

import React, { useContext } from "react";
import { SessionContext } from "../../../../context/Context";
import { CurrentPokemonContext } from "../../PokeCard";
import { PokePrice } from "../PokePrice";
import { Button } from "./Button";

interface PurchaserProps {
  alredyOwned: boolean;
}

export const Purchaser: React.FC<PurchaserProps> = ({ alredyOwned }) => {
  const { coins, setCoins, ownedPokemons, setOwnedPokemons } =
    useContext(SessionContext);
  const { value, color } = useContext(CurrentPokemonContext);
  const currPokemon = useContext(CurrentPokemonContext);
  const handleBuy = () => {
    if (coins >= value && ownedPokemons.length < 6 && !alredyOwned) {
      //we admit buying
      setCoins(coins - value);
      setOwnedPokemons([...ownedPokemons, currPokemon]);
    }
  };

  return (
    <Button
      text={""}
      onClick={handleBuy}
      extraStyles={`${coins < value || alredyOwned ? " disabled " : ""}`}
      color={color}
    >
      <PokePrice />
    </Button>
  );
};
