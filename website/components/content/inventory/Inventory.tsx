import React, { useContext, useEffect, useState, useRef } from "react";
import { BagPokemonList } from "./BagPokemonList";
import { Pokemon } from "../../Types";
import { isMobileContext } from "../../context/Context";
import { motion } from "framer-motion";
interface PokeCardprops {
  ownedPokemons: Pokemon[];
}
export const Inventory: React.FC<PokeCardprops> = ({ ownedPokemons }) => {
  const isMobile = useContext(isMobileContext);
  const imageUrl = isMobile ? "inventory-m" : "inventory";
  const showInventory = useRef(false);
  const [currentAnimation, setCurrenAnimation] = useState("minimized");
  const menuTransitionPercentage = isMobile ? "60%" : "70%";
  const variants = {
    opening: {
      y: "0",
      transition: {
        y: { duration: 0.3, ease: "easeIn" },
      },
    },
    minimized: {
      y: menuTransitionPercentage,
      transition: {
        y: { duration: 0.3, ease: "easeIn" },
      },
    },
  };
  // useEffect(() => {
  //   //First render we want to do a small animation
  //   setCurrenAnimation("firstOpen");
  // }, []);
  useEffect(() => {
    if (ownedPokemons.length && !showInventory.current) {
      setCurrenAnimation("opening");
      setTimeout(() => {
        setCurrenAnimation("minimized");
      }, 2000);
    }

    //When buyin, normal opening
  }, [ownedPokemons]);

  const handleOnClick = () => {
    if (!showInventory.current) {
      setCurrenAnimation("opening");
      showInventory.current = true;
    } else {
      setCurrenAnimation("closing");
      showInventory.current = false;
    }
  };

  return (
    <motion.div
      initial={{ y: menuTransitionPercentage }}
      className="inventory cursor-pointer"
      onClick={handleOnClick}
      variants={variants}
      animate={currentAnimation}
      style={{ backgroundImage: `url("./${imageUrl}.png")` }}
    >
      <BagPokemonList pokemonList={ownedPokemons} />
    </motion.div>
  );
};
