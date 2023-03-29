import React from "react";
import { motion } from "framer-motion";
interface ToolNumberProps {
  value: number;
  style: string;
}

export const ToolNumber: React.FC<ToolNumberProps> = ({ value, style }) => {
  return (
    <span
      className={` ${
        value === 0 ? "grayscale" : ""
      } ${style} opacity-90 absolute inline-flex items-center justify-center w-5 h-5 text-[13px] font-bold text-white bg-red-500 border-2 border-white rounded-full  dark:border-gray-900`}
    >
      <motion.span
        key={value}
        animate={{
          y: [-20, 0],
          opacity: [0, 1],
          transition: {
            y: { duration: 0.5, type: "spring" },
            opacity: { duration: 1, type: "spring" },
          },
        }}
      >
        {value}
      </motion.span>
    </span>
  );
};
