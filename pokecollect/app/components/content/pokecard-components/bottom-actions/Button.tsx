import React, { ReactNode } from "react";

interface ButtonProps {
  color?: string | undefined;
  children?: ReactNode;
  text?: string;
  onClick?: () => void;
  extraStyles?: string;
  sm?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  color,
  children,
  text,
  onClick,
  extraStyles,
  sm,
}) => {
  if (!sm) {
    return (
      <button
        onClick={onClick}
        className={
          "text-xl relative cursor-pointer flex button-54 items-center h-10" +
          extraStyles
        }
        style={{ backgroundColor: color }}
      >
        <p>
          {text ? text : ""}
          {children ? children : ""}
        </p>
      </button>
    );
  }
  return (
    <button
      onClick={onClick}
      className={
        "md:text-m relative cursor-pointer flex button-54 h-[36px] px-4 py-0 items-center justify-center" +
        extraStyles
      }
      style={{ backgroundColor: color }}
    >
      <p>
        {text ? text : ""}
        {children ? children : ""}
      </p>
    </button>
  );
};
