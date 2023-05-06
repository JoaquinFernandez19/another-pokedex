import React, { useContext, useEffect, useState, useRef } from "react";
import { BagPokemonList } from "./BagPokemonList";

import { motion } from "framer-motion";
import { InventoryControls } from "./InventoryControls";
import { AppActions } from "@/app/lib/AppReducer";
import { AppContext } from "@/app/lib/AppInitialState";

export const Inventory: React.FC = () => {
  const { state, dispatch } = useContext(AppContext);
  const imageUrl = state.isMobile ? "inventory-m" : "inventory";
  const showInventory = useRef(false);
  const firstRendered = useRef(false);
  const [currentAnimation, setCurrenAnimation] = useState("minimized");
  const menuTransitionPercentage = state.isMobile ? "60%" : "70%";
  const variants = {
    opening: {
      y: "0",
      opacity: 1,
      transition: {
        y: { duration: 0.3, ease: "easeIn" },
      },
    },
    minimized: {
      y: menuTransitionPercentage,
      opacity: 1,
      transition: {
        y: { duration: 0.3, ease: "easeIn" },
        opacity: { duration: 3, type: "spring", delay: 1.5 },
      },
    },
  };
  useEffect(() => {
    //First render only
    firstRendered.current = true;
  }, []);
  useEffect(() => {
    if (state.ownedPokemons.length && !showInventory.current) {
      setCurrenAnimation("opening");
      showInventory.current = true;
    }
  }, [state.ownedPokemons]);

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
      initial={{
        y: menuTransitionPercentage,
        opacity: firstRendered.current ? 1 : 0,
      }}
      className="inventory relative z-50"
      variants={variants}
      animate={currentAnimation}
      style={{ backgroundImage: `url("./${imageUrl}.png")` }}
    >
      <InventoryControls handleOnClick={handleOnClick} />
      <BagPokemonList pokemonCollection={state.ownedPokemons} />
    </motion.div>
  );
};
