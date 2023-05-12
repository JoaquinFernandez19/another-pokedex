import { AppContext } from "@/app/lib/AppInitialState";

import React, { useContext } from "react";
import { PokeBall } from "./PokeBall";
import { Inventory } from "./inventory/Inventory";
import { PokeCard } from "./PokeCard";

export const MainContent: React.FC = () => {
  const { state } = useContext(AppContext);

  if (state.showingInventory && state.clickedInitialPokeBall) {
    return <Inventory />;
  }
  if (state.clickedInitialPokeBall) {
    return <PokeCard />;
  }

  return <PokeBall />;
};
