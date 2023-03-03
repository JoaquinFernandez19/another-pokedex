import React from "react";

interface SocialMediaProps {}

const socialMedias: { name: string; icon: string; url: string }[] = [
  {
    name: "Portfolio",
    icon: "",
    url: "",
  },
  {
    name: "Github",
    icon: "",
    url: "",
  },
  {
    name: "Linkedin",
    icon: "",
    url: "",
  },
];

export const SocialMedia: React.FC<SocialMediaProps> = ({}) => {
  return (
    <div className="flex flex-row">
      {socialMedias.map(({ name, icon, url }) => {
        return (
          <div
            id={name}
            className="text-2xl border-solid border-2 border-rose-500"
          >
            {name}
          </div>
        );
      })}
    </div>
  );
};
