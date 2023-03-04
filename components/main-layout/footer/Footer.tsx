import React from "react";
import { SocialMedia } from "../../SocialMedia";

interface FooterProps {}

export const Footer: React.FC<FooterProps> = ({}) => {
  return (
    <div className="flex  items-center">
      <h1>Made by Joaquin Fernandez</h1>
      <SocialMedia />
    </div>
  );
};
