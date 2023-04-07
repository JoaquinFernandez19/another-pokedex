import React, { useContext } from "react";
import { UserContext } from "../context/Context";
import { Bag } from "./inventory/Bag";
import { Coins } from "./inventory/Coins";
export const Inventory = () => {
  const { userName, userId } = useContext(UserContext);
  

 
  return (
    <div className="fixed flex flex-col gap-1 top-4 right-4 text-right z-50">
      <div>{userName}</div>
      <Coins />
      <div className='fixed top-7 left-4 md:top-auto md:left-auto md:relative'>
      <Bag />
      </div>
    </div>
  );
};
