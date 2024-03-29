"use client";

import React, { useContext, useEffect, useState } from "react";

import { Button } from "./Button";

import { ActionsContext, AppContext } from "@/app/lib/AppInitialState";
import { AppActions } from "@/app/lib/AppReducer";
import { useNextPokemon, useResetTimer } from "./Hooks";
import { ToolNumber } from "../tools/ToolNumber";

export const NextPokemon: React.FC = () => {
  const { state } = useContext(AppContext);
  const { dispatch } = useContext(ActionsContext);
  const { hours, minutes } = useResetTimer(state, dispatch);
  const nextPokemonCb = useNextPokemon(state, dispatch);

  return (
    <Button
      text={state.credits === 0 ? hours + ":" + minutes : "Catch"}
      onClick={nextPokemonCb}
      extraStyles={" bg-slate-500  w-20 justify-center h-10"}
      color={state.pokemonCollection[state.currPokemon].color}
    >
      <ToolNumber
        value={Number(state.credits)}
        style={"bottom-[30.5px]  -left-3 md:-right-2"}
      />
    </Button>
  );
};
