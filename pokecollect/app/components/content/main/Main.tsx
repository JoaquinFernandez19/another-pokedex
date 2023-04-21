"use client";

import { PokemonList } from "@/app/utils/Types";
import { PokeBall } from "./content/PokeBall";
import React, { Suspense, useEffect, useState, use } from "react";
import { SessionContext } from "../context/Context";
import { PokeCard } from "./content/PokeCard";
import { Inventory } from "./content/inventory/Inventory";
import { GoogleLogin } from "../login/GoogleLogin";

export const Main: React.FC = () => {
  const [ownedPokemons, setOwnedPokemons] = useState<PokemonList>([]);
  const [inited, setInited] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState(false);
  const [user, setUser] = useState({
    id: 0,
    name: "",
    ranking: 0,
    starting_date: "",
  });

  // useEffect(() => {
  //   //This 0 is the id, will change later to EMAIL
  //   const userIdForTesting = 0;
  //   const fetchUser_ = async () => {
  //     const data = await fetchUser(userIdForTesting);
  //     setUser(data);
  //   };

  //   fetchUser_();

  //   return () => {};
  // }, []);

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
        ownedPokemons: ownedPokemons,
        setOwnedPokemons: setOwnedPokemons,
        inited: inited,
        user: user,
      }}
    >
      <div className="main-container flex items-center justify-center relative">
        <GoogleLogin />
        <Suspense fallback={<div className="hidden">Loading...</div>}>
          <PokeCard inited={inited} />
        </Suspense>
        <PokeBall showFirstPokemon={setInited} inited={inited} />
        {inited ? <Inventory ownedPokemons={ownedPokemons} /> : ""}
      </div>
    </SessionContext.Provider>
  );
};
