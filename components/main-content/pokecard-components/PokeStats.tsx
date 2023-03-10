import React, { useState } from "react";
import { Pokemon } from "../../Types";
import { motion } from "framer-motion";
type PropsStats = Pokemon;

export const PokeStats: React.FC<PropsStats> = ({
  height,
  color,
  weight,
  stats,
}) => {
  const [showing, setShowing] = useState<Boolean>(false);
  return (
    <motion.div className="w-auto text-right top-[15%]  relative left-[-50%] h-min">
      <div className=" p-3 px-5 flex flex-col gap-2 text-xl stats-circular-info  relative ">
        <div
          className="absolute w-[35%] h-full bottom-0 right-0"
          style={{
            border: `3px solid ${color}`,
            borderLeft: 0,
            borderTop: 0,
            borderBottom: 0,
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
