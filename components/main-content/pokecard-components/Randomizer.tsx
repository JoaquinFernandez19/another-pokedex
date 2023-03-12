import React from "react";

interface RandomizerProps {
  trigger: () => void;
  usageLimits: string;
}

export const Randomizer: React.FC<RandomizerProps> = ({
  trigger,
  usageLimits,
}) => {
  const handleOnClick = () => {
    if (Number(usageLimits) > 0) trigger();
  };
  return (
    <div className="z-10 text-center mt-10">
      <button onClick={handleOnClick} className="pb-5 text-xl ">
        Roll
      </button>
      <p>Rolls left: {usageLimits}</p>
    </div>
  );
};
