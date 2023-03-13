import React from "react";
import { Footer } from "./footer/Footer";

export const Layout: React.FC<any> = ({ children }) => {
  return (
    <div className="h-[100vh] grid grid-cols-[1fr] grid-rows-[1fr,50px]  ">
      <div>{children}</div>
      <Footer />
    </div>
  );
};
