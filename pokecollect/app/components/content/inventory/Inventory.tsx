import React, { useContext } from "react";
import { BagPokemonList } from "./BagPokemonList";

import { InventoryControls } from "./InventoryControls";

import { AppContext } from "@/app/lib/AppInitialState";
import { motion } from "framer-motion";

export const Inventory: React.FC = () => {
  const { state } = useContext(AppContext);

  return (
    <motion.div
      animate={{ opacity: [0, 1], y: [-300, 0] }}
      className="inventory relative z-50"
      style={{
        backgroundImage: `url("./${
          state.isMobile ? "inventory-m-full" : "inventory-full"
        }.png")`,
      }}
    >
      <InventoryControls />
      <BagPokemonList pokemonCollection={state.ownedPokemons} />
    </motion.div>
  );
};
