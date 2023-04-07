import React, { useContext } from "react";
import { Bag } from "./Bag";
import { Coins } from "./Coins";
import { UserContext } from "../../context/Context";

export const ProfileMenu = () => {
  const {userName} = useContext(UserContext)
  return (
    <div>
      <Bag />
      <Coins />
 {userName}     
    </div>
  );
};
