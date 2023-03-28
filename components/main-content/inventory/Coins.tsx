import React, { useContext } from "react";
import { UserContext } from "../../../pages";

export const Coins: React.FC = () => {
  const { coins } = useContext(UserContext);
  return <div> {coins} coins </div>;
};
