import React from "react";
import { Footer } from "./footer/Footer";
import { Header } from "./header/Header";

export const Layout: React.FC<any> = ({ children }) => {
  return (
    <div className="min-h-screen justify-items-center flex flex-col justify-between items-center">
      <div className="min-h-screen flex justify-center flex-col">
        <Header />
        {children}
      </div>
      <Footer />
    </div>
  );
};
