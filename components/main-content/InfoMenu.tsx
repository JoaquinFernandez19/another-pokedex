import React from "react";
import { Pokemon } from "../Types";

interface InfoMenuProps {
  pokemon: Pokemon;
}

export const InfoMenu: React.FC<InfoMenuProps> = ({ pokemon }) => {
  return (
    <span
      style={{ backgroundColor: pokemon.color }}
      className="px-2 text-xs pt-[2px]"
    >
      Info
    </span>
  );
};
