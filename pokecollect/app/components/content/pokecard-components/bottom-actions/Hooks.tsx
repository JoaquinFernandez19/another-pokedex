import { AppAction, AppActions, AppState } from "@/app/lib/AppReducer";
import { enableCreditsAndFetchPokemonsList } from "@/app/lib/app-usage/Lib";
import { useState, useEffect } from "react";

export const useResetTimer = (state: AppState, dispatch: React.Dispatch<AppAction>) => {
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

  return {
    hours,
    minutes,
  };
};

export const useNextPokemon = (state: AppState, dispatch: React.Dispatch<AppAction>) => {
  return () => {
    if (state.credits === 0) return;

    if (state.credits === 1) {
      dispatch({
        type: AppActions.START_RESET_TIMER,
        payload: "",
      });
    }
    //Catch the pokemon if we have credits
    dispatch({
      type: AppActions.CATCH_POKEMON,
      payload: { pokemon: state.pokemonCollection[state.currPokemon] },
    });
    dispatch({
      type: AppActions.SET_CREDITS,
      payload: { credits: state.credits - 1 },
    });
    //If after catching the pokemon we dont have more credits
    //We need to prevent  switching
    if (state.credits > 0) {
      dispatch({
        type: AppActions.NEXT_POKEMON,
        payload: "",
      });
    }

    //Sync everything with DB
    dispatch({
      type: AppActions.SYNC_WITH_DB,
      payload: "",
    });
  };
};
