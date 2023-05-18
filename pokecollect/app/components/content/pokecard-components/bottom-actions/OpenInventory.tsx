import React, { useContext } from "react";
import { Button } from "./Button";
import { GiChest } from "react-icons/gi";
import { ActionsContext, AppContext } from "@/app/lib/AppInitialState";
import { AppActions } from "@/app/lib/AppReducer";

export const OpenInventory: React.FC = () => {
  const { state } = useContext(AppContext);
  const { dispatch } = useContext(ActionsContext);

  const handleClick = () => {
    if (state.ownedPokemons.length === 0) return;
    dispatch({
      type: AppActions.SET_INVENTORY_DISPLAY,
      payload: { showingInventory: !state.showingInventory },
    });
  };

  return (
    <Button
      sm={true}
      color={"#a52a2a5e"}
      extraStyles={`${
        state.ownedPokemons.length ? "opacity-1" : "opacity-50"
      } flex flex-row`}
      onClick={handleClick}
    >
      <GiChest className="pointer-events-none" />
      <p className="ml-1 pointer-events-none">{state.ownedPokemons.length}</p>
    </Button>
  );
};
