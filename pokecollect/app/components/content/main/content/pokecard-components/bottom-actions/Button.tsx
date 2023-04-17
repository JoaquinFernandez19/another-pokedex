import React, { ReactNode } from "react";

interface ButtonProps {
  color: string | undefined;
  children?: ReactNode;
  text: string;
  onClick: () => void;
  extraStyles: string;
}

export const Button: React.FC<ButtonProps> = ({
  color,
  children,
  text,
  onClick,
  extraStyles,
}) => {
  return (
    <button
      onClick={onClick}
      className={
        "md:text-xl relative cursor-pointer px-3 py-1.5 md:px-4 md:py-0.5 flex" +
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
