import React, { useContext } from "react";
import { BagPokemonList } from "./BagPokemonList";

import { InventoryControls } from "./InventoryControls";

import { AppContext } from "@/app/lib/AppInitialState";

export const Inventory: React.FC = () => {
  const { state } = useContext(AppContext);

  return (
    <div
      className="inventory relative z-50"
      style={{
        backgroundImage: `url("./${
          state.isMobile ? "inventory-m-full" : "inventory-full"
        }.png")`,
      }}
    >
      <InventoryControls />
      <BagPokemonList pokemonCollection={state.ownedPokemons} />
    </div>
  );
};
