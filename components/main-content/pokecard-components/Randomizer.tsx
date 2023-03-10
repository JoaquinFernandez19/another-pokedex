import React from "react";
import { motion } from "framer-motion";
interface RandomizerProps {
  trigger: () => void;
  usageLimits: string;
}

export const Randomizer: React.FC<RandomizerProps> = ({ trigger, usageLimits }) => {
  const handleOnClick = () => {
    if (Number(usageLimits) > 0) trigger();
  };
  return (
    <div className="fixed bottom-0 md:relative md:top-auto mx-auto right-0   z-10 text-center md:mt-10">
      <button
        onClick={handleOnClick}
        className="text-xl relative cursor-pointer bg-slate-500 px-6 py-1.5 md:px-4 md:py-0.5"
      >
        Roll{" "}
        <span
          className={` ${
            usageLimits === "0" ? "grayscale" : ""
          } opacity-90 absolute inline-flex items-center justify-center w-5 h-5 text-[13px] font-bold text-white bg-red-500 border-2 border-white rounded-full bottom-[30px] md:bottom-[24.5px] -left-2 md:-right-2 dark:border-gray-900`}
        >
          <motion.span
            key={usageLimits}
            animate={{
              y: [-20, 0],
              opacity: [0, 1],
              transition: {
                y: { duration: 0.5, type: "spring" },
                opacity: { duration: 1, type: "spring" },
              },
            }}
          >
            {usageLimits}
          </motion.span>
        </span>
      </button>
    </div>
  );
};
