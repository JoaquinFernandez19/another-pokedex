"use client";
import React, { useContext } from "react";

import { motion } from "framer-motion";
import { AppContext } from "@/app/lib/AppInitialState";

export const PokeStats: React.FC = () => {
  const { state, dispatch } = useContext(AppContext);
  const { color, height, weight, stats } = state.pokemonCollection[state.currPokemon];
  const isMobile = window.innerWidth <= 768;
  const variants = {
    open: {
      x: 0,
      opacity: 1,
      height: "auto",
      transition: {
        x: { duration: 1, type: "spring" },
        opacity: { duration: 1, type: "spring" },
      },
    },
    closed: {
      x: -100,
      opacity: 0,
      height: 0,
    },
  };
  const outLineVariants = {
    open: {
      height: ["0%", "100%"],
      transition: {
        height: { duration: 0.5, delay: 0.2, type: "ease-out" },
      },
    },
    openMobile: {
      width: ["0%", "70%"],
      transition: {
        width: { duration: 0.5, delay: 0.2, type: "ease-out" },
      },
    },
  };

  return (
    <motion.div
      variants={variants}
      initial={"closed"}
      animate={"open"}
      className={`w-auto text-center h-min relative md:text-right md:top-[15%] md:left-[-10%]`}
    >
      <div className="p-3 px-5 grid grid-cols-[repeat(2,minmax(0,100px))] justify-center gap-1 md:flex md:flex-col  md:gap-2  stats-circular-info  relative ">
        <motion.div
          className="absolute h-full bottom-0 right-0 m-auto left-0 border-t-0 border-l-0 border-r-0 border-b-[3px] md:border-b-0 md:w-full md:border-r-[3px]"
          style={{
            borderColor: `${color}`,
          }}
          variants={outLineVariants}
          initial={"hidden"}
          animate={isMobile ? "openMobile" : "open"}
        ></motion.div>
        <p className="text-[13px] md:text-sm">
          <> Height: {height}</>
        </p>
        <p className="text-[13px] md:text-sm">
          <> Weight: {weight}</>
        </p>
        {stats.map(({ name, value }, i) => {
          return (
            <p
              key={value + i + name}
              className="text-[13px] capitalize md:text-sm"
            >
              <>
                {name}: {value}
              </>
            </p>
          );
        })}
      </div>
    </motion.div>
  );
};
