"use client";

import React, { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { AppContext } from "@/app/lib/AppInitialState";
import { AppActions } from "@/app/lib/AppReducer";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/app/lib/firebase/Firebase";

const initialState = {
  opening: false,
  hovering: false,
  currentEvent: "shaking",
};

export const PokeBall: React.FC = () => {
  //State management
  const { state, dispatch } = useContext(AppContext);
  const [user, loading] = useAuthState(auth);

  const [opening, setOpening] = useState<boolean>(false);
  const [hovering, setHovering] = useState<boolean>(false);
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
  const hoverManagment = (bool: boolean) => {
    return opening ? "" : setHovering(bool);
  };
  useEffect(() => {
    //Reset when user logs out
    const { currentEvent, hovering, opening } = initialState;
    if (!user) {
      setCurrentEvent(currentEvent);
      setOpening(hovering);
      setHovering(opening);
    }
  }, [user]);
  useEffect(() => {
    if (opening) {
      setCurrentEvent("open");
    } else if (!opening && !hovering) {
      setCurrentEvent("shaking");
    } else if (!opening && hovering) {
      setCurrentEvent("hover");
    }
    return () => {};
  }, [opening, hovering]);
  if (state.clickedInitialPokeBall) return <></>;
  return (
    <motion.div animate={{ opacity: [0, 1] }} className="pokeball">
      <div className="relative">
        <motion.img
          animate={currentEvent}
          variants={variants}
          onHoverStart={() => hoverManagment(true)}
          onHoverEnd={() => hoverManagment(false)}
          whileHover={opening ? "" : currentEvent}
          src={"/pkball.png"}
          alt="unkown pokemon"
          width={400}
          height={400}
          className={`z-10 relative drop-shadow-2xl cursor-pointer w-[250px] md:w-[300px]`}
          onClick={() => {
            if (!user) return;
            setOpening(true);
            setHovering(false);
            setTimeout(() => {
              dispatch({
                type: AppActions.SET_CLICKED_PKBALL,
                payload: true,
              });
            }, openDelay);
          }}
        />
      </div>
    </motion.div>
  );
};

function arrOfZeros(qty: number) {
  const arr = [];
  for (let i = 0; i <= qty; i++) {
    arr.push(0);
  }
  return arr;
}

const standByAnim = arrOfZeros(20);
