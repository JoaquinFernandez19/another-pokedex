"use client";

import React, { Dispatch, SetStateAction, useContext } from "react";
import { ToolNumber } from "../../tools/ToolNumber";
import { UserContext } from "../../../../context/Context";
interface RandomizerProps {
  randomize: Dispatch<SetStateAction<number>>;
  usageLimits: string;
}

export const Randomizer: React.FC<RandomizerProps> = ({
  randomize,
  usageLimits,
}) => {
  const { coins, setCoins } = useContext(UserContext);
  const credits = Number(usageLimits);
  const handleOnClick = () => {
    if (credits > 0) {
      randomize(credits - 1);
      setCoins(coins + Number(process.env.NEXT_PUBLIC_ROLL_CREDITS));
    }
  };
  return (
    <button
      onClick={handleOnClick}
      className="text-xl relative cursor-pointer bg-slate-500 px-6 w-[90px] py-1.5 md:px-4 md:py-0.5"
    >
      Roll{" "}
      <ToolNumber
        value={Number(usageLimits)}
        style={"bottom-[30px] md:bottom-[24.5px] -left-2 md:-right-2"}
      />
    </button>
  );
};
