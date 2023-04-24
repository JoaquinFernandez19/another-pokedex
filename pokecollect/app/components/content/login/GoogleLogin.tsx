import React from "react";
import { auth } from "../login/Firebase";
import { signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { SignoutIcon } from "./SignoutIcon";

export const GoogleLogin: React.FC = ({}) => {
  const googleAuth = new GoogleAuthProvider();
  const [user, loading] = useAuthState(auth);
  const login = async () => {
    if (user) return;
    signInWithPopup(auth, googleAuth);
  };
  let text = user ? "Welcome " + user.displayName : "Login with Google";
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
