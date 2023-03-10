import React, { useState } from "react";
import { Pokemon } from "../../Types";
import { motion } from "framer-motion";
type PropsStats = Pokemon;

export const PokeStats: React.FC<PropsStats> = ({ height, color, weight, stats }) => {
  const [showing, setShowing] = useState<Boolean>(false);
  return (
    <motion.div className="w-auto text-center sm:ext-right sm:top-[15%]  relative sm:left-[-50%] h-min">
      <div className=" p-3 px-5 flex flex-col gap-2 text-xl stats-circular-info  relative ">
        <div
          className="absolute w-[35%] h-full bottom-0 right-0 m-auto left-0 border-b-0 sm:border-t-0 border-l-0 border-r-0 sm:border-r-[3px]"
          style={{
            border: `3px solid ${color}`,
          }}
        ></div>
        <p className="text-sm">
          <> Height: {height}</>
        </p>
        <p className="text-sm">
          <> Weight: {weight}</>
        </p>
        <div className="flex flex-col gap-2">
          {stats.map(({ name, value }) => {
            return (
              <div key={name}>
                <p className="capitalize text-sm">
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
