import { AppContext } from "@/app/lib/AppInitialState";
import React, { useContext } from "react";

export const InventoryInfo = () => {
  const { state } = useContext(AppContext);
  const lastPokemon = state.ownedPokemons[state.ownedPokemons.length - 1];
  const percentage = ((state.ownedPokemons.length / 1100) * 100).toFixed(2);
  return (
    <div className="inventory-info pt-1 pb-1 pr-3 pl-2 flex justify-between ">
      <span>
        Last Pokemon:
        <span style={{ color: `${lastPokemon.color}` }} className="pl-2">
          {lastPokemon.name}
        </span>
      </span>
      <span>{percentage}%</span>
    </div>
  );
};
