import React, { useEffect, useState } from "react";
import { animate, motion, useMotionValue } from "framer-motion";
import { Dispatch, SetStateAction } from "react";

interface HiddenCardProps {
  showFirstPokemon: Dispatch<SetStateAction<boolean>>;
}
const standByAnim = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
export const HiddenCard: React.FC<HiddenCardProps> = ({ showFirstPokemon }) => {
  const [opening, setOpening] = useState<boolean>(false);
  const [hovering, setHovering] = useState<boolean>(false);
  const [currentEvent, setCurrentEvent] = useState<string>("shaking");
  const openDelay = 700;
  const variants = {
    shaking: {
      x: [0, 2, 0, -2, 0, 2, 0, -2].concat(standByAnim),
      rotate: [0, 2, 0, -2, 0, 2, 0, -2].concat(standByAnim),
      transition: {
        x: { repeat: Infinity, delay: 1, duration: 1 },
        rotate: { repeat: Infinity, delay: 1, duration: 1 },
      },
    },
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

  useEffect(() => {
    if (opening) {
      setCurrentEvent("open");
    } else if (!opening && !hovering) {
      setCurrentEvent("shaking");
    }
    if (hovering && !opening) {
      setCurrentEvent("hover");
    }
    return () => {};
  }, [opening, hovering]);

  return (
    <div className="relative">
      <motion.div animate={{ opacity: [0, 1] }}>
        <div className="">
          <div className="relative">
            <motion.img
              animate={currentEvent}
              variants={variants}
              onHoverStart={() => setHovering(true)}
              onHoverEnd={() => setHovering(false)}
              whileHover={currentEvent}
              src={"/pkball.png"}
              alt="unkown pokemon"
              width={400}
              height={400}
              className={`m-auto drop-shadow-2xl cursor-pointer w-[200px] sm:w-[300px]`}
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
