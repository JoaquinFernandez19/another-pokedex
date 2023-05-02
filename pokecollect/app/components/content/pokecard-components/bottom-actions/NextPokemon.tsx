"use client";

import React, { useContext } from "react";
import { ToolNumber } from "../../tools/ToolNumber";
import { Button } from "./Button";

import { AppContext } from "@/app/lib/AppInitialState";
import { AppActions } from "@/app/lib/AppReducer";

export const NextPokemon: React.FC = () => {
  const { state, dispatch } = useContext(AppContext);

  return (
    <Button
      text={"Next"}
      onClick={() => {
        dispatch({
          type: AppActions.NEXT_POKEMON,
          payload: "",
        });
      }}
      extraStyles={" bg-slate-500"}
      color={undefined}
    >
      <ToolNumber
        value={Number(state.credits)}
        style={"bottom-[30px] md:bottom-[24.5px] -left-2 md:-right-2"}
      />
    </Button>
  );
};
