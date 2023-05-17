"use client";

import React, { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { AppContext } from "@/app/lib/AppInitialState";
import { AppActions } from "@/app/lib/AppReducer";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/app/lib/firebase/Firebase";
import { usePokeBallEvents } from "./Hooks";

export const PokeBall: React.FC = () => {
  const { state, dispatch } = useContext(AppContext);

  const initialState = {
    openingSate: false,
    hoveringState: false,
    currentEvent: "shaking",
  };
  const {
    currentEvent,
    variants,
    manageHover,
    openingState,
    hoveringState,
    user,
    openDelay,
  } = usePokeBallEvents(initialState);

  const openPokeBallOnClick = () => {
    if (!user) return;
    openingState.set(true);
    hoveringState.set(false);
    setTimeout(() => {
      dispatch({
        type: AppActions.SET_CLICKED_PKBALL,
        payload: true,
      });
    }, openDelay);
  };

  if (state.clickedInitialPokeBall) return <></>;
  return (
    <motion.div animate={{ opacity: [0, 1] }} className="pokeball">
      <div className="relative">
        <motion.img
          animate={currentEvent}
          variants={variants}
          onHoverStart={() => manageHover(true)}
          onHoverEnd={() => manageHover(false)}
          whileHover={openingState.state ? "" : currentEvent}
          src={"/pkball.png"}
          alt="unkown pokemon"
          width={400}
          height={400}
          className={`z-10 relative drop-shadow-2xl cursor-pointer w-[250px] md:w-[300px]`}
          onClick={openPokeBallOnClick}
        />
      </div>
    </motion.div>
  );
};
