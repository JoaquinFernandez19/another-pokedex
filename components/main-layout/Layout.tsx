import React from "react";
import { Footer } from "./footer/Footer";
import { Header } from "./header/Header";

export const Layout: React.FC<any> = ({ children }) => {
  return (
    <div className="min-h-screen justify-items-center flex flex-col max-w-3xl ml-auto mr-auto justify-between items-center">
      <Header />
      {children}
      <Footer />
    </div>
  );
};
