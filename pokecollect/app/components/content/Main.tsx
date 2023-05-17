"use client";

import { PokeBall } from "./PokeBall";
import React, { useEffect, useReducer, useState } from "react";
import { PokeCard } from "../content/PokeCard";
import { Inventory } from "./inventory/Inventory";
import { GoogleLogin } from "./login/GoogleLogin";
import { AppActions, AppReducer } from "@/app/lib/AppReducer";
import { AppContext, AppInitialState } from "@/app/lib/AppInitialState";
import { MainContent } from "./MainContent";
import { BottomActions } from "./pokecard-components/bottom-actions/BottomActions";
import { BackgroundLogo } from "../layout/BackgroundLogo";
import { useResizeWindow } from "./Hooks";

export const Main: React.FC = () => {
  const [state, dispatch] = useReducer(AppReducer, AppInitialState);
  useResizeWindow(dispatch);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      <BackgroundLogo />
      <div
        className={`main-container relative ${
          !state.clickedInitialPokeBall && "showing-pokeball"
        }`}
      >
        <GoogleLogin />
        <MainContent />
        {state.clickedInitialPokeBall && (
          <BottomActions doInitialTransition={state.doInitialAnimation} />
        )}
      </div>
    </AppContext.Provider>
  );
};
