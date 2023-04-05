import React, { useContext } from "react";
import { CurrentPokemonContext } from "../PokeCard";

export const PokeStars: React.FC = () => {
  const { value } = useContext(CurrentPokemonContext);
  return <>{value}</>;
};
