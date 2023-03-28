import React, { useContext } from "react";
import { Bag } from "./inventory/Bag";
import { Coins } from "./inventory/Coins";
import { UserContext } from "../../pages";
export const Inventory = () => {
  const { userName, userId } = useContext(UserContext);
  return (
    <div className="fixed top-3 right-[2.5rem] text-right z-50">
      <div>{userName}</div>
      <Coins />
      <Bag />
    </div>
  );
};
