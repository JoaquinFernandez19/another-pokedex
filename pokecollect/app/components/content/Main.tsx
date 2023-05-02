"use client";

import { PokeBall } from "./PokeBall";
import React, { useReducer } from "react";
import { PokeCard } from "../content/PokeCard";
import { Inventory } from "./inventory/Inventory";
import { GoogleLogin } from "./login/GoogleLogin";
import { AppReducer } from "@/app/lib/AppReducer";
import { AppContext, AppInitialState } from "@/app/lib/AppInitialState";

export const Main: React.FC = () => {
  const [state, dispatch] = useReducer(AppReducer, AppInitialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      <div
        className={`main-container ${
          state.clickedInitialPokeBall ? "showing-pokeball" : ""
        } flex items-center justify-center relative`}
      >
        <GoogleLogin />
        <PokeCard />
        <PokeBall />
        {state.clickedInitialPokeBall ? <Inventory /> : ""}
      </div>
    </AppContext.Provider>
  );
};
