import React, { useState, useEffect } from "react";
import { Pokemon } from "../../Types";
import { motion } from "framer-motion";
import { Dispatch, SetStateAction } from "react";
interface PropsStats {
  currPokemon: Pokemon;
  showStats: boolean;
  setShowStats: Dispatch<SetStateAction<boolean>>;
}

export const PokeStats: React.FC<PropsStats> = ({
  currPokemon,
  showStats,
  setShowStats,
}) => {
  const { color, height, weight, stats } = currPokemon;
  const isMobile = window.innerWidth <= 768;
  const variants = {
    open: {
      x: [-100, 0],
      opacity: [0, 1],
      height: "auto",
      transition: {
        x: { duration: 1, type: "spring" },
        opacity: { duration: 1, type: "spring" },
      },
    },

    hidden: { opacity: 0, x: -100, height: 0 },
  };
  const outLineVariants = {
    open: {
      height: ["0%", "100%"],
      transition: {
        height: { duration: 0.5, delay: 0.2, type: "ease-out" },
      },
    },
    openMobile: {
      width: ["0%", "35%"],
      transition: {
        height: { duration: 2, delay: 0.2, type: "ease-out" },
      },
    },
  };
  return (
    <motion.div
      initial={"hidden"}
      animate={showStats ? "open" : ""}
      variants={variants}
      className="z-0 w-auto text-center h-min relative md:text-right md:top-[15%] md:left-[-10%] "
    >
      <div className=" p-3 px-5 flex flex-col gap-1 md:gap-2  stats-circular-info  relative ">
        <motion.div
          className="absolute w-[35%] h-full bottom-0 right-0 m-auto left-0 border-t-0 border-l-0 border-r-0 border-b-[3px] md:border-b-0 md:w-full md:border-r-[3px]"
          style={{
            borderColor: `${color}`,
          }}
          variants={outLineVariants}
          initial={"hidden"}
          animate={
            !isMobile
              ? showStats
                ? "open"
                : ""
              : showStats
              ? "openMobile"
              : ""
          }
        ></motion.div>
        <p className="text-[13px] md:text-sm">
          <> Height: {height}</>
        </p>
        <p className="text-[13px] md:text-sm">
          <> Weight: {weight}</>
        </p>
        <div className="flex flex-col gap-2">
          {stats.map(({ name, value }) => {
            return (
              <div key={name}>
                <p className="capitalize text-[13px] md:text-sm">
                  {name}: {value}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};
