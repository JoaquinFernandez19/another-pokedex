import React, { useContext } from "react";
import { UserContext } from "../../../pages";

export const Coins: React.FC = () => {
  const { coins } = useContext(UserContext);
  return <div className="fixed top-3 right-[2.5rem]">Coins: {coins}</div>;
};
