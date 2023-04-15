"use client";

import React, {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { motion } from "framer-motion";
import { SessionContext } from "../../context/Context";
interface PokeBallProps {
  showFirstPokemon: Dispatch<SetStateAction<boolean>>;
  inited: boolean;
}

export const PokeBall: React.FC<PokeBallProps> = ({
  showFirstPokemon,
  inited,
}) => {
  const [opening, setOpening] = useState<boolean>(false);
  const [hovering, setHovering] = useState<boolean>(false);
  const [currentEvent, setCurrentEvent] = useState<string>("shaking");

  //Coins initial managment
  const { coins, setCoins } = useContext(SessionContext);

  const openDelay = 1000;
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
      scale: [1.1, 0.1],
      rotate: 1080,
      transition: {
        rotate: { duration: 6, type: "spring" },
        scale: { duration: 2, type: "spring" },
      },
    },
    hover: {
      scale: 1.1,
      transition: { duration: 0.2 },
    },
  };
  const hoverManagment = (bool: boolean) => {
    return opening ? "" : setHovering(bool);
  };
  useEffect(() => {
    if (opening) {
      setCurrentEvent("open");
    } else if (!opening && !hovering) {
      setCurrentEvent("shaking");
    } else if (!opening && hovering) {
      setCurrentEvent("hover");
    }
    return () => {};
  }, [opening, hovering]);
  if (inited) return <></>;
  return (
    <motion.div animate={{ opacity: [0, 1] }} className="pokeball">
      <div className="relative">
        <motion.img
          animate={currentEvent}
          variants={variants}
          onHoverStart={() => hoverManagment(true)}
          onHoverEnd={() => hoverManagment(false)}
          whileHover={opening ? "" : currentEvent}
          src={"/pkball.png"}
          alt="unkown pokemon"
          width={400}
          height={400}
          className={`z-10 relative drop-shadow-2xl cursor-pointer w-[250px] md:w-[300px]`}
          onClick={() => {
            setCoins(
              coins + Number(process.env.NEXT_PUBLIC_DAILY_ENTERING_CREDITS)
            );
            setOpening(true);
            setHovering(false);
            setTimeout(() => {
              showFirstPokemon(true);
            }, openDelay);
          }}
        />
      </div>
    </motion.div>
  );
};

function arrOfZeros(qty: number) {
  const arr = [];
  for (let i = 0; i <= qty; i++) {
    arr.push(0);
  }
  return arr;
}

const standByAnim = arrOfZeros(20);
