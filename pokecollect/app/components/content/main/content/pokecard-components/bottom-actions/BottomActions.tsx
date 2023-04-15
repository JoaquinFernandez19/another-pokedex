import React from "react";
import { Purchaser } from "./Purchaser";
import { Randomizer } from "./Randomizer";

interface BottomActionsProps {
  usageLimits: string;
  trigger: () => void;
}

export const BottomActions: React.FC<BottomActionsProps> = ({
  usageLimits,
  trigger,
}) => {
  return (
    <div className="flex fixed top-14 z-10 mx-auto justify-center gap-2 md:relative md:top-auto  md:mt-10">
      <Randomizer usageLimits={`${usageLimits}`} trigger={trigger} />
      <Purchaser />
    </div>
  );
};
