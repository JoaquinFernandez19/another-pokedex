import React, { useState } from "react";
import { Pokemon } from "../../Types";
import { motion } from "framer-motion";
import { Dispatch, SetStateAction } from "react";
interface PropsStats {
  currPokemon: Pokemon;
  showStats: boolean;
  setShowStats: Dispatch<SetStateAction<boolean>>;
}

export const PokeStats: React.FC<PropsStats> = ({ currPokemon, showStats, setShowStats }) => {
  const { color, height, weight, stats } = currPokemon;
  if (!showStats) return <></>;
  return (
    <motion.div className="w-auto text-center h-min relative md:text-right md:top-[15%] md:left-[-10%] ">
      <div className=" p-3 px-5 flex flex-col gap-1 md:gap-2  stats-circular-info  relative ">
        <div
          className="absolute w-[35%] h-full bottom-0 right-0 m-auto left-0 border-t-0 border-l-0 border-r-0 border-b-[3px] md:border-b-0 md:w-full md:border-r-[3px]"
          style={{
            borderColor: `${color}`,
          }}
        ></div>
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
