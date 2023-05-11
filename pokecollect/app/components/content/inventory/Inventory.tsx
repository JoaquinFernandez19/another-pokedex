import React, { useContext, useEffect, useState, useRef } from "react";
import { BagPokemonList } from "./BagPokemonList";

import { motion } from "framer-motion";
import { InventoryControls } from "./InventoryControls";
import { AppActions } from "@/app/lib/AppReducer";
import { AppContext } from "@/app/lib/AppInitialState";

export const Inventory: React.FC = () => {
  const { state, dispatch } = useContext(AppContext);
  const imageUrl = state.isMobile ? "inventory-m-full" : "inventory-full";

  return (
    <div
      className="inventory relative z-50"
      style={{ backgroundImage: `url("./${imageUrl}.png")` }}
    >
      <InventoryControls />
      <BagPokemonList pokemonCollection={state.ownedPokemons} />
    </div>
  );
};
