import React from "react";

interface RandomizerProps {
  trigger: () => void;
  usageLimits: string;
}

export const Randomizer: React.FC<RandomizerProps> = ({ trigger, usageLimits }) => {
  const handleOnClick = () => {
    if (Number(usageLimits) > 0) trigger();
  };
  return (
    <div className="text-center mt-20">
      <button onClick={handleOnClick} className="pb-5 text-xl ">
        Roll
      </button>
      <p>Rolls left: {usageLimits}</p>
    </div>
  );
};
