import React from "react";
import { Purchaser } from "./Purchaser";
import { Randomizer } from "./Randomizer";

interface BottomActionsProps {
  usageLimits: string;
  trigger: () => void;
}

export const BottomActions: React.FC<BottomActionsProps> = ({ usageLimits, trigger }) => {
  return (
    <div className="flex fixed items-center flex-col justify-center md:gap-2  bottom-0 md:flex-row md:relative md:top-auto mx-auto right-0   z-10 text-center md:mt-10">
      <Randomizer usageLimits={`${usageLimits}`} trigger={trigger} />
      <Purchaser />
    </div>
  );
};
