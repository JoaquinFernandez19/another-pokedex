import React from "react";
import { Footer } from "./footer/Footer";

export const Layout: React.FC<any> = ({ children }) => {
  return (
    <div className="min-h-screen justify-items-center flex flex-col md:max-h-[100vh] justify-between items-center">
      <div className="pt-[70px]  md:pt-[50px] md:min-h-[90vh] flex justify-center flex-col w-full">
        {children}
      </div>
      <Footer />
    </div>
  );
};
