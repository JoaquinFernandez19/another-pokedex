import React from "react";
import { SocialMedia } from "../../SocialMedia";

interface FooterProps {}

export const Footer: React.FC<FooterProps> = ({}) => {
  return (
    <div className="flex justify-center w-full  pb-2 pt-2 sm:pb-5 sm:pt-5 bg-[#404258]">
      <div className="flex  items-center justify-between gap-1 flex-col-reverse  sm:flex-row sm:gap-24">
        <h1>Made by Joaquin Fernandez</h1>
        <SocialMedia />
      </div>
    </div>
  );
};
