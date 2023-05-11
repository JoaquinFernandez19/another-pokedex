import React, { useContext, useEffect, useState } from "react";
import { auth } from "../../../lib/firebase/Firebase";
import { signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { SignoutIcon } from "./SignoutIcon";
import { AppContext, SetAppInitialState } from "@/app/lib/AppInitialState";
import { AppActions } from "@/app/lib/AppReducer";

export const GoogleLogin: React.FC = ({}) => {
  const googleAuth = new GoogleAuthProvider();
  const [user, loading] = useAuthState(auth);
  const { dispatch } = useContext(AppContext);
  const [loadingAppData, setLoadingAppData] = useState<boolean>(false);

  const login = async () => {
    if (user) return;
    signInWithPopup(auth, googleAuth);
  };

  useEffect(() => {
    async function initAppWhenUserLogsIn() {
      if (!user) return;
      setLoadingAppData(true);
      const initialState = await SetAppInitialState(user);

      setLoadingAppData(false);
      dispatch({
        type: AppActions.INIT_APP,
        payload: initialState,
      });
    }
    if (!user) return;
    initAppWhenUserLogsIn();
  }, [user]);

  let text;
  if (user) {
    if (loadingAppData) {
      text = "Loading...";
    }
  } else {
    if (loading) {
      text = "Loading...";
    } else {
      text = "Login with Google";
    }
  }

  return (
    <div
      className={`${
        (!user && loading) || (loadingAppData && user) || !user
          ? "required-login text-slate-800 md:fixed"
          : ""
      }  md:top-1 md:left-1 md:justify-self-start md:relative`}
    >
      <button
        onClick={login}
        className="flex bg-[#484f68] text-gray-100 py-[0.25em] px-[0.5em]"
      >
        {text}
        {user && !loading && !loadingAppData ? <SignoutIcon /> : ""}
      </button>
    </div>
  );
};
