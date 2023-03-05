import React from "react";
import { SocialMedia } from "../../SocialMedia";

interface FooterProps {}

export const Footer: React.FC<FooterProps> = ({}) => {
  return (
    <div className="flex justify-center w-full pb-5 pt-5 bg-[#404258]">
      <div className="flex  items-center  justify-between" style={{ minWidth: "700px" }}>
        <h1>Made by Joaquin Fernandez</h1>
        <SocialMedia />
      </div>
    </div>
  );
};
