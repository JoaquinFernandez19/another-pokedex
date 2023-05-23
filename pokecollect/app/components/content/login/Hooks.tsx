import { ActionsContext, SetAppInitialState } from "@/app/lib/AppInitialState";
import { AppActions } from "@/app/lib/AppReducer";
import { auth } from "@/app/lib/firebase/Firebase";

import { useContext, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

export const useLoginSystem = () => {
  const [loadingAppData, setLoadingAppData] = useState<boolean>(false);
  const [user, loading] = useAuthState(auth);

  const { dispatch } = useContext(ActionsContext);

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

  if (loading || loadingAppData) text = "Loading...";

  if (!user) text = "Login with Google";

  return {
    text,
    user,
    loading: loading || loadingAppData,
  };
};
