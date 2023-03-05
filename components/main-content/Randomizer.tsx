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
    <div>
      <button onClick={handleOnClick}>Randomize</button>
      <p>{usageLimits}</p>
    </div>
  );
};
