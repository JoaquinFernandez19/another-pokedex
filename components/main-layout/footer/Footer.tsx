import React from "react";
import { SocialMedia } from "../../SocialMedia";

interface FooterProps {}

export const Footer: React.FC<FooterProps> = ({}) => {
  return (
    <div className="flex justify-end w-full pr-10  pb-2 pt-2 sm:pb-1 sm:pt-1 ">
      <div className=" gap-1 flex-col-reverse  sm:flex-row sm:gap-24">
        <SocialMedia />
      </div>
    </div>
  );
};
