"use client";
import React, { useState } from "react";
import { auth } from "../../../lib/firebase/Firebase";
import { signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import dynamic from "next/dynamic";
// import { SignoutIcon } from "./SignoutIcon";

import { useLoginSystem } from "./Hooks";
import { SignoutIcon } from "./SignoutIcon";

const GoogleLogin: React.FC = ({}) => {
  const googleAuth = new GoogleAuthProvider();
  const { text, user, loading } = useLoginSystem();
  const [xd, setxt] = useState<boolean>(false);
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

export default dynamic(() => Promise.resolve(GoogleLogin), {
  ssr: false,
});
