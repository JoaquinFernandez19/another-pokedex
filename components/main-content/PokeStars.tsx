import React from "react";

interface PokeStarsProps {
  value: number;
}

export const PokeStars: React.FC<PokeStarsProps> = ({ value }) => {
  let pokemonLevel = 0;

  if (value >= 200) pokemonLevel = 1;

  if (value >= 300) pokemonLevel = 2;

  if (value >= 400) pokemonLevel = 3;

  if (value >= 500) pokemonLevel = 4;

  if (value >= 600) pokemonLevel = 5;

  return <>{pokemonLevel}</>;
};
