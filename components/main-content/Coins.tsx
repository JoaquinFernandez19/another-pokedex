import React from "react";

interface CoinsProps {
  coins: number;
}

export const Coins: React.FC<CoinsProps> = ({ coins }) => {
  return <div className="fixed top-3 right-[2.5rem]">Coins: {coins}</div>;
};
