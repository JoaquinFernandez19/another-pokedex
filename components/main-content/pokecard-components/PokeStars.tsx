import React, { useContext } from "react";
import { CurrentPokemonContext } from "../PokeCard";

export const PokeStars: React.FC = () => {
  const { stars } = useContext(CurrentPokemonContext);
  return <>{stars}</>;
};
