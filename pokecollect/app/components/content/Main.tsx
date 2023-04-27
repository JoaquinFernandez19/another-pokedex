"use client";

import { PokemonList } from "@/app/utils/Types";
import { PokeBall } from "./PokeBall";
import React, { Suspense, useEffect, useState } from "react";
import { SessionContext } from "./context/Context";
import { PokeCard } from "../content/PokeCard";
import { Inventory } from "./inventory/Inventory";
import { GoogleLogin } from "./login/GoogleLogin";
import { Auth } from "firebase/auth";
import { auth } from "./login/Firebase";
import { useAuthState } from "react-firebase-hooks/auth";

export const Main: React.FC = () => {
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
        ownedPokemons: ownedPokemons,
        setOwnedPokemons: setOwnedPokemons,
        inited: inited,
      }}
    >
      <div
        className={`main-container ${
          inited ? "showing-pokeball" : ""
        } flex items-center justify-center relative`}
      >
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
