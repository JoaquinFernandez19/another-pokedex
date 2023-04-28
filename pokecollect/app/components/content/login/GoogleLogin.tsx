import React, { useContext, useEffect } from "react";
import { auth } from "../login/Firebase";
import { signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { SignoutIcon } from "./SignoutIcon";
import { generateSessionData } from "../db/DataBase";
import { SessionContext } from "../context/Context";

export const GoogleLogin: React.FC = ({}) => {
  const googleAuth = new GoogleAuthProvider();
  const [user, loading] = useAuthState(auth);
  const { setOwnedPokemons, setCredits } = useContext(SessionContext);

  const login = async () => {
    if (user) return;
    signInWithPopup(auth, googleAuth);
  };

  useEffect(() => {
    const getSessionData = async () => {
      if (user) {
        const { pokemonList, credits } = await generateSessionData(user.uid);
        setOwnedPokemons(pokemonList);
        if (credits) setCredits(credits);
      }
    };
    getSessionData();
    return () => {};
  }, [user]);

  let text = user
    ? "Welcome " + user.displayName?.split(" ")[0]
    : "Login with Google";
  if (!loading) {
    return (
      <button onClick={login} className="fixed bottom-1 left-3 flex">
        {text}
        {user ? <SignoutIcon /> : ""}
      </button>
    );
  }
  return <></>;
};
