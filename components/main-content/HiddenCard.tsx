import React, { useState } from "react";
import { animate, motion, useMotionValue } from "framer-motion";
import { Dispatch, SetStateAction } from "react";

interface HiddenCardProps {
  showFirstPokemon: Dispatch<SetStateAction<boolean>>;
}

export const HiddenCard: React.FC<HiddenCardProps> = ({ showFirstPokemon }) => {
  const [opening, setOpening] = useState<boolean>(false);
  const openDelay = 700;
  const variants = {
    open: {
      scale: [1.1, 0.7, 0.5, 0.1, 0],
      rotate: 1080,
      transition: { rotate: { duration: 1, type: "spring", stiffnes: 100 } },
    },
    hover: {
      scale: 1.1,
      transition: { duration: 0.2 },
    },
  };
  return (
    <div className="relative">
      <motion.div animate={{ opacity: [0, 1] }}>
        <div className="">
          <div className="relative">
            <motion.img
              animate={opening ? "open" : ""}
              variants={variants}
              whileHover={opening ? "" : "hover"}
              src={"/pkball.png"}
              alt="unkown pokemon"
              width={400}
              height={400}
              className={`m-auto drop-shadow-2xl cursor-pointer`}
              onClick={() => {
                setOpening(true);
                setTimeout(() => {
                  showFirstPokemon(true);
                }, openDelay);
              }}
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
};
