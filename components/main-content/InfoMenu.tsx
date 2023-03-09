import React from "react";
import { Pokemon } from "../Types";
import { motion } from "framer-motion";

type InfoMenuProps = Pokemon;

export const InfoMenu: React.FC<InfoMenuProps> = ({
  height,
  weight,
  mainType,
  types,
  color,
  stats,
  ...props
}) => {
  return (
    <span style={{ backgroundColor: color }} className="px-2 text-xs pt-[2px]">
      Info
      <div
        className="w-auto fixed top-10% right-[15%] z-10 text-center"
        // whileDrag={{ scale: 1.1 }}
      >
        {" "}
        <h2 className="text-xl">Stats</h2>
        <div
          style={{ backgroundColor: color }}
          className=" p-3 px-5  flex flex-col gap-2 text-xl"
        >
          <p>
            <> Height: {height}</>
          </p>
          <p>
            <> Weight: {weight}</>
          </p>
          <div className="flex flex-col gap-2">
            {stats.map(({ name, value }) => {
              return (
                <div key={name}>
                  <p className="capitalize">
                    {name}: {value}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </span>
  );
};
