"use client";

import React, { useContext, useEffect, useState } from "react";
import { ToolNumber } from "../../tools/ToolNumber";
import { Button } from "./Button";

import { AppContext } from "@/app/lib/AppInitialState";
import { AppActions } from "@/app/lib/AppReducer";
import { enableCreditsAndFetchPokemonsList } from "@/app/lib/app-usage/Lib";

export const NextPokemon: React.FC = () => {
  const { state, dispatch } = useContext(AppContext);
  const [remainingTime, setRemainingTime] = useState<number>(0);

  const calculateRemainingTime = () => {
    const lastReset = state.userDataDB?.last_reset;

    if (lastReset && state.credits === 0) {
      //If less than a minute, lets go we reset the state and do the magic

      //Here we check the last reset time and get the remaining time to use on our state
      const targetTime = new Date(lastReset).getTime() + 12 * 60 * 60 * 1000;
      const currentTime = new Date().getTime();
      const timeDifference = targetTime - currentTime;
      setRemainingTime(timeDifference);

      console.log(timeDifference);
      if (timeDifference < 60000) {
        enableCreditsAndFetchPokemonsList(state, dispatch);
      }
    }
  };

  useEffect(() => {
    if (state.credits > 0) return;
    calculateRemainingTime();
    const interval = setInterval(calculateRemainingTime, 1000);
    return () => clearInterval(interval);
  }, [state.credits]);

  const hours = Math.floor(remainingTime / (1000 * 60 * 60))
    .toString()
    .padStart(2, "0");
  const minutes = Math.floor((remainingTime / (1000 * 60)) % 60)
    .toString()
    .padStart(2, "0");
  return (
    <Button
      text={state.credits === 0 ? hours + ":" + minutes : "Next"}
      onClick={() => {
        if (state.credits === 1) {
          dispatch({
            type: AppActions.START_RESET_TIMER,
            payload: "",
          });
        }
        dispatch({
          type: AppActions.NEXT_POKEMON,
          payload: "",
        });
        dispatch({
          type: AppActions.SYNC_WITH_DB,
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
