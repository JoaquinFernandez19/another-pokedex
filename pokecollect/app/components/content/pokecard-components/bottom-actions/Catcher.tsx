"use client";

import React, { useContext } from "react";

import { Button } from "./Button";
import { AppContext } from "@/app/lib/AppInitialState";
import { AppActions } from "@/app/lib/AppReducer";

interface CatcherProps {
  alredyOwned: boolean;
}

export const Catcher: React.FC<CatcherProps> = ({ alredyOwned }) => {
  const { state, dispatch } = useContext(AppContext);

  const handleBuy = () => {
    if (state.ownedPokemons.length < 6 && !alredyOwned) {
      dispatch({
        type: AppActions.CATCH_POKEMON,
        payload: { pokemon: state.pokemonCollection[state.currPokemon] },
      });
      dispatch({
        type: AppActions.SYNC_WITH_DB,
        payload: "",
      });
    }
  };

  return (
    <Button
      text={""}
      onClick={handleBuy}
      extraStyles={`${alredyOwned ? " disabled " : ""}`}
      color={state.pokemonCollection[state.currPokemon].color}
    >
      Catch
    </Button>
  );
};
