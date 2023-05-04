"use client";

import React, { useContext } from "react";

import { Button } from "./Button";
import { AppContext } from "@/app/lib/AppInitialState";
import { AppActions } from "@/app/lib/AppReducer";

interface PurchaserProps {
  alredyOwned: boolean;
}

export const Purchaser: React.FC<PurchaserProps> = ({ alredyOwned }) => {
  const { state, dispatch } = useContext(AppContext);

  const handleBuy = () => {
    if (state.ownedPokemons.length < 6 && !alredyOwned) {
      dispatch({
        type: AppActions.CATCH_POKEMON,
        payload: { pokemon: state.pokemonList[state.currPokemon] },
      });
    }
  };

  return (
    <Button
      text={""}
      onClick={handleBuy}
      extraStyles={`${alredyOwned ? " disabled " : ""}`}
      color={state.pokemonList[state.currPokemon].color}
    >
      Catch
    </Button>
  );
};
