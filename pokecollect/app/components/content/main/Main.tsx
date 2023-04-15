"use client";

import { Pokemon, PokemonList } from "@/app/utils/Types";

import React, { useEffect, useState } from "react";
import { isMobileContext, UserContext } from "../context/Context";
import { PokeCard } from "./content/PokeCard";
import { Inventory } from "./content/inventory/Inventory";

interface MainProps {
  data: Pokemon[];
}

export const Main: React.FC<MainProps> = ({ data }) => {
  const [userData, setUserData] = useState<{
    userName: string;
    userId: number;
  }>({
    userName: "Joaco",
    userId: 1,
  });
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
          <PokeCard pokemonList={data} setInited={setInited} />
          {inited ? <Inventory ownedPokemons={ownedPokemons} /> : ""}
        </div>
      </UserContext.Provider>
    </isMobileContext.Provider>
  );
};
