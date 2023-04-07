import React from "react";

interface SocialMediaProps {}

const socialMedias: { name: string; icon: string; url: string }[] = [
  {
    name: "Linkedin",
    url: "https://www.linkedin.com/in/joaqu%C3%ADn-fernandez-rosso-b5973016b/",
    icon: "Linkedin",
  },
  {
    name: "Github",
    url: "https://github.com/JoaquinFernandez19",
    icon: "JoaquinFernandez19",
  },
  {
    name: "Portfolio",
    url: "https://www.linkedin.com/in/joaquin-fernandez-rosso/",
    icon: "Portfolio",
  },
];

export const SocialMedia: React.FC<SocialMediaProps> = ({}) => {
  return (
    <div className="flex flex-col  gap-0 md:gap-3 opacity-20 md:flex-row">
      {socialMedias.map(({ name, icon, url }, i) => {
        return (
          <div key={i} id={name}>
            <a href={url} target="_blank">
              {name}
            </a>
          </div>
        );
      })}
    </div>
  );
};
