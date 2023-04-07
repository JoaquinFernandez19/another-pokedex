import React from "react";
import { SocialMedia } from "./SocialMedia";

interface FooterProps {}

export const Footer: React.FC<FooterProps> = ({}) => {
  return (
    <div className="flex  pl-2  justify-start md:justify-end w-full md:pl-0 md:pr-10  pb-2 pt-2 md:pb-1 md:pt-1 ">
      <div className=" gap-1 flex-col-reverse  md:flex-row md:gap-24">
        <SocialMedia />
      </div>
    </div>
  );
};
