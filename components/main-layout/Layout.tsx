import React from "react";
import { Footer } from "./footer/Footer";
import { Header } from "./header/Header";

export const Layout: React.FC<any> = ({ children }) => {
  return (
    <div className="grid grid-cols-1 grid-rows-3">
      <Header />
      {children}
      <Footer />
    </div>
  );
};
