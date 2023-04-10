import React, { useContext, useEffect, useState } from "react";
import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";
import { motion } from "framer-motion";
import { TbCoin } from "react-icons/tb";

import { UserContext } from "../../context/Context";
export const Coins: React.FC = () => {
  const { coins } = useContext(UserContext);
  const [prevCoins, setPrevCoins] = useState(coins);

  let arrow = null;

  if (coins > prevCoins) {
    arrow = <AiFillCaretUp className="text-green-500" />;
  } else if (coins < prevCoins) {
    arrow = <AiFillCaretDown className="text-red-500" />;
  }

  useEffect(() => {
    setTimeout(() => {
      setPrevCoins(coins);
    }, 500);
  }, [coins]);

  return (
    <div className="flex items-center">
      {/* <TbCoin
        style={{
          paddingRight: "1px",
          fontSize: "25px",
          position: "relative",
          left: "-5px",
        }}
      /> */}
      {coins}
      <motion.span
        key={coins}
        animate={{
          opacity: [1, 0, 1, 0],
          transition: {
            opacity: { duration: 0.5, type: "spring" },
          },
        }}
      >
        {arrow}
      </motion.span>
    </div>
  );
};
