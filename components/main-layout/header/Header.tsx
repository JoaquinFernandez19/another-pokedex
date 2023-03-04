import React from "react";

interface HeaderProps {}

export const Header: React.FC<HeaderProps> = ({}) => {
  return (
    <div>
      <h1 className="text-4xl text-white">Pokedex</h1>
    </div>
  );
};
