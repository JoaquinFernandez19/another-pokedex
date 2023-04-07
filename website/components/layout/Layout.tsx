import React from "react";
import { Footer } from "./Footer";

export const Layout: React.FC<any> = ({ children }) => {
  return (
    <div className="h-[100vh] grid grid-cols-[1fr] grid-rows-[1fr] md:grid-rows-[1fr,50px]  ">
      <div className="relative top-[50px] md:top-auto">{children}</div>
      <Footer />
    </div>
  );
};
