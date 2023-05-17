import { AppContext, SetAppInitialState } from "@/app/lib/AppInitialState";
import { AppActions } from "@/app/lib/AppReducer";
import { auth } from "@/app/lib/firebase/Firebase";

import { useContext, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

export const useLoginSystem = () => {
  const [loadingAppData, setLoadingAppData] = useState<boolean>(false);
  const [user, loading] = useAuthState(auth);
  const { dispatch } = useContext(AppContext);

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

  return {
    text,
    user,
    loading: loading || loadingAppData,
  };
};
