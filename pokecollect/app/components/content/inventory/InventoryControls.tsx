import { AppContext } from "@/app/lib/AppInitialState";
import { AppActions } from "@/app/lib/AppReducer";
import React, { useContext } from "react";

export const InventoryControls: React.FC = () => {
  const { state, dispatch } = useContext(AppContext);

  const closeInventory = () => {
    dispatch({
      type: AppActions.SET_INVENTORY_DISPLAY,
      payload: {
        showingInventory: false,
      },
    });
  };

  return (
    <>
      <div
        className="cursor-pointer absolute top-2 right-6 text-xl"
        onClick={closeInventory}
      >
        x
      </div>
    </>
  );
};
