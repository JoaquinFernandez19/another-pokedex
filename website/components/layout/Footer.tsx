import React from "react";
import { SocialMedia } from "./SocialMedia";
import { Logo } from "./Logo";

interface FooterProps {}

export const Footer: React.FC<FooterProps> = ({}) => {
  return (
    <div className="flex justify-end pl-2 pr-5 ">
      <SocialMedia />
    </div>
  );
};
