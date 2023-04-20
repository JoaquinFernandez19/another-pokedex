"use client";

import React, { useContext } from "react";
import { SessionContext } from "../../../../context/Context";
import { CurrentPokemonContext } from "../../PokeCard";

import { Button } from "./Button";

interface PurchaserProps {
  alredyOwned: boolean;
}

export const Purchaser: React.FC<PurchaserProps> = ({ alredyOwned }) => {
  const { ownedPokemons, setOwnedPokemons } = useContext(SessionContext);
  const { value, color } = useContext(CurrentPokemonContext);
  const currPokemon = useContext(CurrentPokemonContext);
  const handleBuy = () => {
    if (ownedPokemons.length < 6 && !alredyOwned) {
      setOwnedPokemons([...ownedPokemons, currPokemon]);
    }
  };

  return (
    <Button
      text={""}
      onClick={handleBuy}
      extraStyles={`${alredyOwned ? " disabled " : ""}`}
      color={color}
    >
      Catch
    </Button>
  );
};
