"use client";
import React from "react";
import { motion } from "framer-motion";

export const BackgroundLogo: React.FC = () => {
  return (
    <motion.img
      animate={{
        opacity: [0, 0.01],
        transition: {
          opacity: { duration: 1, type: "spring" },
        },
      }}
      src={"/pokecollect-logo2-big.png"}
      className="fixed min-w-[100vw] z-0 pointer-events-none top-[50%] right-[0] fixed-center opacity-[0.02]"
    />
  );
};
