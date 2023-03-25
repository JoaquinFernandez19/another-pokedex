import React, { useContext, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { UserContext } from "../../pages";
interface HiddenCardProps {
  showFirstPokemon: () => void;
}
const standByAnim = arrOfZeros(20);
export const HiddenCard: React.FC<HiddenCardProps> = ({ showFirstPokemon }) => {
  const [opening, setOpening] = useState<boolean>(false);
  const [hovering, setHovering] = useState<boolean>(false);
  const [currentEvent, setCurrentEvent] = useState<string>("shaking");

  //Coins initial managment
  const { coins, setCoins } = useContext(UserContext);

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

  return (
    <div className="h-full flex justify-center items-center md:top-0">
      <motion.div animate={{ opacity: [0, 1] }}>
        <div className="">
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
              className={`m-auto drop-shadow-2xl cursor-pointer w-[250px] md:w-[300px]`}
              onClick={() => {
                setCoins(coins + Number(process.env.NEXT_PUBLIC_DAILY_ENTERING_CREDITS));
                setOpening(true);
                setHovering(false);
                setTimeout(() => {
                  showFirstPokemon();
                }, openDelay);
              }}
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

function arrOfZeros(qty: number) {
  const arr = [];
  for (let i = 0; i <= qty; i++) {
    arr.push(0);
  }
  return arr;
}
