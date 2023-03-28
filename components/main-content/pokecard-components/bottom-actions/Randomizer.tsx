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
    <div className="fixed bottom-0 md:relative md:top-auto mx-auto right-0   z-10 text-center ">
      <button
        onClick={handleOnClick}
        className="text-xl relative cursor-pointer bg-slate-500 px-6 py-1.5 md:px-4 md:py-0.5"
      >
        Roll <ToolNumber value={Number(usageLimits)} />
      </button>
    </div>
  );
};
