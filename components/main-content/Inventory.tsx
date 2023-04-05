import React, { useContext, useState } from "react";
import { Bag } from "./inventory/Bag";
import { Coins } from "./inventory/Coins";
import { UserContext } from "../../pages";
export const Inventory = () => {
  const { userName, userId } = useContext(UserContext);
  const [isMobile, setIsMobile] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  if (isMobile) {
    if (showMenu) {
      //when mobile we are going to show a button to open the user menu
      return <></>;
    } else {
      return <></>;
    }
  } else {
  }
  return (
    <div className="fixed flex flex-col gap-1 top-3 right-[2.5rem] text-right z-50">
      <div>{userName}</div>
      <Coins />
      <Bag />
    </div>
  );
};
