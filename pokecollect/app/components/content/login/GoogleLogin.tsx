import React from "react";
import { auth } from "../login/Firebase";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";

export const GoogleLogin: React.FC = ({}) => {
  const googleAuth = new GoogleAuthProvider();

  const [user, setUser] = useAuthState(auth);

  const login = async () => {
    const result = await signInWithPopup(auth, googleAuth);
  };

  return <button onClick={login}>Log me in with google!</button>;
};
