import React from "react";
import { SocialMedia } from "../../SocialMedia";

interface HeaderProps {}

export const Header: React.FC<HeaderProps> = ({}) => {
  return (
    <div className="flex justify-between">
      <h1 className="text-4xl text-white">Pokedex</h1>
      <SocialMedia />
    </div>
  );
};
