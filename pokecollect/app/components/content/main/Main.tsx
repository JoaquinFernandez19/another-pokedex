"use client";

import { PokemonList } from "@/app/utils/Types";
import { PokeBall } from "./content/PokeBall";
import React, { Suspense, useEffect, useState } from "react";
import { SessionContext } from "../context/Context";
import { PokeCard } from "./content/PokeCard";
import { Inventory } from "./content/inventory/Inventory";

export const Main: React.FC = () => {
  const [coins, setCoints] = useState(4000);
  const [ownedPokemons, setOwnedPokemons] = useState<PokemonList>([]);
  const [inited, setInited] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const { innerWidth: width } = window;
      setIsMobile(width <= 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <SessionContext.Provider
      value={{
        isMobile: isMobile,
        coins: coins,
        ownedPokemons: ownedPokemons,
        setCoins: setCoints,
        setOwnedPokemons: setOwnedPokemons,
      }}
    >
      <div className="min-h-screen flex items-center justify-center relative">
        {inited ? (
          <Suspense fallback={<div className="hidden">Loading...</div>}>
            <PokeCard />
          </Suspense>
        ) : (
          <PokeBall showFirstPokemon={setInited} />
        )}
        {inited ? <Inventory ownedPokemons={ownedPokemons} /> : ""}
      </div>
    </SessionContext.Provider>
  );
};
