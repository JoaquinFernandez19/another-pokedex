import React, { useContext } from "react";
import { Button } from "./Button";
import { GiChest } from "react-icons/gi";
import { AppContext } from "@/app/lib/AppInitialState";
import { AppActions } from "@/app/lib/AppReducer";

export const OpenInventory: React.FC = () => {
  const { state, dispatch } = useContext(AppContext);
  const handleClick = () => {
    dispatch({
      type: AppActions.SET_INVENTORY_DISPLAY,
      payload: { showingInventory: !state.showingInventory },
    });
  };

  return (
    <Button sm={true} color={"brown"} onClick={handleClick}>
      <GiChest />
    </Button>
  );
};
