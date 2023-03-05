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
    <div className="flex flex-row ">
      {socialMedias.map(({ name, icon, url }, i) => {
        return (
          <div key={i} id={name} className=" pl-3">
            <a href={url} target="_blank">
              {name}
            </a>
          </div>
        );
      })}
    </div>
  );
};
