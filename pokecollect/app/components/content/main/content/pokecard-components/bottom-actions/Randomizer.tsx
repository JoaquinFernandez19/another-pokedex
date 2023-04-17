"use client";

import React, { Dispatch, SetStateAction, useContext } from "react";
import { ToolNumber } from "../../tools/ToolNumber";
import { SessionContext } from "../../../../context/Context";
import { Button } from "./Button";
interface RandomizerProps {
  randomize: Dispatch<SetStateAction<number>>;
  usageLimits: string;
}

export const Randomizer: React.FC<RandomizerProps> = ({
  randomize,
  usageLimits,
}) => {
  const { coins, setCoins } = useContext(SessionContext);
  const credits = Number(usageLimits);
  const handleOnClick = () => {
    if (credits > 0) {
      randomize(credits - 1);
      setCoins(coins + Number(process.env.NEXT_PUBLIC_ROLL_CREDITS));
    }
  };
  return (
    <Button
      text={"Roll"}
      onClick={handleOnClick}
      extraStyles={" bg-slate-500"}
      color={undefined}
    >
      <ToolNumber
        value={Number(usageLimits)}
        style={"bottom-[30px] md:bottom-[24.5px] -left-2 md:-right-2"}
      />
    </Button>
  );
};
