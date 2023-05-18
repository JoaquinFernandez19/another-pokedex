import { ActionsContext, AppContext } from "@/app/lib/AppInitialState";
import React, { useContext } from "react";
import { CgProfile } from "react-icons/cg";
import { Button } from "./Button";

export const ProfileIcon = () => {
  // const { state } = useContext(AppContext);
  // const { dispatch } = useContext(ActionsContext);

  return (
    <div>
      <Button sm={true} color={"#757575"}>
        <CgProfile />
      </Button>
    </div>
  );
};
