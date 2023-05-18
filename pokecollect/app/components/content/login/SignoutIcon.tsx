import React, { useContext } from "react";
import { auth } from "../../../lib/firebase/Firebase";
import { signOut } from "firebase/auth";
import { motion } from "framer-motion";
import { ActionsContext, AppContext } from "@/app/lib/AppInitialState";
import { AppActions } from "@/app/lib/AppReducer";

export const SignoutIcon = () => {
  const { dispatch } = useContext(ActionsContext);
  const signOut_ = () => {
    signOut(auth);
    dispatch({
      type: AppActions.SIGNOUT_USER,
      payload: "",
    });
  };
  return (
    <motion.svg
      initial={{ fill: "transparent" }}
      whileHover={{ fill: "" }}
      transition={{
        fill: {
          duration: 1,
        },
      }}
      onClick={signOut_}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-6 h-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
      />
    </motion.svg>
  );
};
