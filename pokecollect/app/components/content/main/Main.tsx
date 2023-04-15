"use client";

import { PokemonList } from "@/app/utils/Types";
import { PokeBall } from "./content/PokeBall";
import React, { useEffect, useState, use } from "react";
import { isMobileContext, UserContext } from "../context/Context";
import { PokeCard } from "./content/PokeCard";
import { Inventory } from "./content/inventory/Inventory";
import { fetchPokemons } from "@/app/utils/Utils";

const pokemonListFetch = fetchPokemons();

export const Main: React.FC = () => {
  const [userData, setUserData] = useState<{
    userName: string;
    userId: number;
  }>({
    userName: "Joaco",
    userId: 1,
  });

  const pokemonList: PokemonList = use(pokemonListFetch);

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
    <isMobileContext.Provider value={isMobile}>
      <UserContext.Provider
        value={{
          userName: userData.userName,
          userId: userData.userId,
          coins: coins,
          ownedPokemons: ownedPokemons,
          setCoins: setCoints,
          setOwnedPokemons: setOwnedPokemons,
        }}
      >
        <div className="min-h-screen flex items-center justify-center relative">
          {inited ? (
            <PokeCard pokemonList={pokemonList} />
          ) : (
            <PokeBall showFirstPokemon={setInited} />
          )}
          {inited ? <Inventory ownedPokemons={ownedPokemons} /> : ""}
        </div>
      </UserContext.Provider>
    </isMobileContext.Provider>
  );
};
