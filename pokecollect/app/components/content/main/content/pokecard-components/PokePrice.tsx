import React, { useContext } from "react";
import { CurrentPokemonContext } from "../PokeCard";

export const PokePrice: React.FC = () => {
  const { value } = useContext(CurrentPokemonContext);
  return <>{value}</>;
};
