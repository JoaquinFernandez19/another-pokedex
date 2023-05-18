"use client";

import React, { useReducer } from "react";
import { GoogleLogin } from "./login/GoogleLogin";
import { AppReducer } from "@/app/lib/AppReducer";
import {
  AppContext,
  AppInitialState,
  ActionsContext,
} from "@/app/lib/AppInitialState";
import { MainContent } from "./MainContent";
import { BottomActions } from "./pokecard-components/bottom-actions/BottomActions";
import { BackgroundLogo } from "../layout/BackgroundLogo";
import { useResizeWindow } from "./Hooks";

export const Main: React.FC = () => {
  const [state, dispatch] = useReducer(AppReducer, AppInitialState);
  useResizeWindow(dispatch);

  return (
    <ActionsContext.Provider value={{ dispatch }}>
      <AppContext.Provider value={{ state }}>
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
    </ActionsContext.Provider>
  );
};
