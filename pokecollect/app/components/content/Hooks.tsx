import { AppAction, AppActions, AppState } from "@/app/lib/AppReducer";
import { auth } from "@/app/lib/firebase/Firebase";
import { Dispatch, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

export const useResizeWindow = (dispatch: React.Dispatch<AppAction>) => {
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
};

export const usePokeBallEvents = (initialState: {
  openingSate: boolean;
  hoveringState: boolean;
  currentEvent: string;
}) => {
  function arrOfZeros(qty: number) {
    const arr = [];
    for (let i = 0; i <= qty; i++) {
      arr.push(0);
    }
    return arr;
  }

  const standByAnim = arrOfZeros(20);

  const [user] = useAuthState(auth);
  const [openingSate, setOpeningState] = useState<boolean>(false);
  const [hoveringState, setHoveringState] = useState<boolean>(false);
  const [currentEvent, setCurrentEvent] = useState<string>("shaking");

  const openDelay = 1000;
  const variants = {
    shaking: {
      x: [0, 2, 0, -2, 0, 2, 0, -2].concat(standByAnim),
      rotate: [0, 2, 0, -2, 0, 2, 0, -2].concat(standByAnim),
      transition: {
        x: { repeat: Infinity, delay: 1, duration: 1 },
        rotate: { repeat: Infinity, delay: 1, duration: 1 },
      },
    },
    open: {
      scale: [1.1, 0.1],
      rotate: 1080,
      transition: {
        rotate: { duration: 6, type: "spring" },
        scale: { duration: 2, type: "spring" },
      },
    },
    hover: {
      scale: 1.1,
      transition: { duration: 0.2 },
    },
  };
  const manageHover = (bool: boolean) => {
    return openingSate ? "" : setHoveringState(bool);
  };
  useEffect(() => {
    //Reset when user logs out
    const { currentEvent, hoveringState, openingSate } = initialState;
    if (!user) {
      setCurrentEvent(currentEvent);
      setOpeningState(hoveringState);
      setHoveringState(openingSate);
    }
  }, [user]);
  useEffect(() => {
    if (openingSate) {
      setCurrentEvent("open");
    } else if (!openingSate && !hoveringState) {
      setCurrentEvent("shaking");
    } else if (!openingSate && hoveringState) {
      setCurrentEvent("hover");
    }
    return () => {};
  }, [openingSate, hoveringState]);

  return {
    currentEvent,
    variants,
    manageHover,
    openingState: {
      state: openingSate,
      set: setOpeningState,
    },
    hoveringState: {
      state: hoveringState,
      set: setHoveringState,
    },
    user,
    openDelay,
  };
};

export const useLastPokemonCatched = (state: AppState) => {
  const [lastPokemonCatched, setlastPokemonCatched] = useState<boolean>(false);

  useEffect(() => {
    if (state.credits === 0) {
      setlastPokemonCatched(true);
    } else {
      setlastPokemonCatched(false);
    }
  }, [state.ownedPokemons, state.currPokemon]);

  return lastPokemonCatched;
};

export const usePokeStats = () => {
  const [showStats, setShowStats] = useState<boolean>(false);

  return {
    show: showStats,
    set: setShowStats,
  };
};
