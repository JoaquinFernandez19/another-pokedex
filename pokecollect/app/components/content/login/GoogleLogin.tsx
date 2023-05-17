import React from "react";
import { auth } from "../../../lib/firebase/Firebase";
import { signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";

import { SignoutIcon } from "./SignoutIcon";

import { useLoginSystem } from "./Hooks";

export const GoogleLogin: React.FC = ({}) => {
  const googleAuth = new GoogleAuthProvider();
  const { text, user, loading } = useLoginSystem();

  const login = async () => {
    if (user) return;
    signInWithPopup(auth, googleAuth);
  };

  return (
    <div
      className={`${
        !user || loading ? "required-login text-slate-800" : ""
      }  md:top-1 md:left-1 md:justify-self-start fixed`}
    >
      <button
        onClick={login}
        className="flex bg-[#484f68] text-gray-100 py-[0.25em] px-[0.5em]"
      >
        {text}
        {user && !loading ? <SignoutIcon /> : ""}
      </button>
    </div>
  );
};
