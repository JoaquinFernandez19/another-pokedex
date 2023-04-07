import React, { useContext } from "react";
import { motion } from "framer-motion";
import { UserContext } from "../../../../pages";
import { ToolNumber } from "../../tools/ToolNumber";
interface RandomizerProps {
  trigger: () => void;
  usageLimits: string;
}

export const Randomizer: React.FC<RandomizerProps> = ({
  trigger,
  usageLimits,
}) => {
  const { coins, setCoins } = useContext(UserContext);

  const handleOnClick = () => {
    if (Number(usageLimits) > 0) {
      trigger();
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
