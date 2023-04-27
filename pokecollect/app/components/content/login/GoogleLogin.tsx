import React, { useEffect } from "react";
import { auth } from "../login/Firebase";
import { signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { SignoutIcon } from "./SignoutIcon";
import { generateSessionData } from "../db/DataBase";

export const GoogleLogin: React.FC = ({}) => {
  const googleAuth = new GoogleAuthProvider();
  const [user, loading] = useAuthState(auth);
  const login = async () => {
    if (user) return;
    signInWithPopup(auth, googleAuth);
  };

  useEffect(() => {
    if (user) {
      generateSessionData(user.uid);
    }

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