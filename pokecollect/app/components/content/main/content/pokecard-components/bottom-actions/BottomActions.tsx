import React, { Dispatch, SetStateAction } from "react";
import { Purchaser } from "./Purchaser";
import { Randomizer } from "./Randomizer";
interface BottomActionsProps {
  usageLimits: string;
  randomize: Dispatch<SetStateAction<number>>;
}

export const BottomActions: React.FC<BottomActionsProps> = ({
  usageLimits,
  randomize,
}) => {
  return (
    <div className="flex fixed top-14 z-10 mx-auto justify-center gap-2 md:relative md:top-auto  md:mt-10">
      <Randomizer usageLimits={`${usageLimits}`} randomize={randomize} />
      <Purchaser />
    </div>
  );
};
