"use client";

import { PokeBall } from "./PokeBall";
import React, { useEffect, useReducer, useState } from "react";
import { PokeCard } from "../content/PokeCard";
import { Inventory } from "./inventory/Inventory";
import { GoogleLogin } from "./login/GoogleLogin";
import { AppActions, AppReducer } from "@/app/lib/AppReducer";
import { AppContext, AppInitialState } from "@/app/lib/AppInitialState";

export const Main: React.FC = () => {
  const [state, dispatch] = useReducer(AppReducer, AppInitialState);

  //create use effect that dispatches action when window is resized
  useEffect(() => {
    const resizeTimeout = 100;
    let resizeTimerId: ReturnType<typeof setTimeout>;

    window.onresize = function () {
      clearTimeout(resizeTimerId);
      resizeTimerId = setTimeout(resizeDone, resizeTimeout);
    };

    function resizeDone() {
      // Do something here after resize is completed
      if (window.innerWidth < 768) {
        dispatch({ type: AppActions.SET_DEVICE, payload: { isMobile: true } });
      } else {
        dispatch({ type: AppActions.SET_DEVICE, payload: { isMobile: false } });
      }
    }
  });

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      <div
        className={`main-container ${
          state.clickedInitialPokeBall ? "showing-pokemon" : "showing-pokeball"
        }  relative`}
      >
        <GoogleLogin />
        {state.clickedInitialPokeBall ? (
          state.showingInventory ? (
            <Inventory />
          ) : (
            <PokeCard />
          )
        ) : (
          <PokeBall />
        )}
      </div>
    </AppContext.Provider>
  );
};
