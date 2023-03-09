import React from "react";
import { Footer } from "./footer/Footer";
import { Header } from "./header/Header";

export const Layout: React.FC<any> = ({ children }) => {
  return (
    <div className="min-h-screen justify-items-center flex flex-col justify-between items-center">
      <div className="min-h-[90vh] flex justify-center flex-col w-full">
        <Header />
        {children}
      </div>
      <Footer />
    </div>
  );
};
