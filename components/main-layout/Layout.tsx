import React from "react";
import { Footer } from "./footer/Footer";

export const Layout: React.FC<any> = ({ children }) => {
  return (
    <div className="min-h-screen justify-items-center flex flex-col md:max-h-[100vh] justify-between items-center">
      <div className="min-h-[90vh] flex justify-start md:justify-center flex-col w-full">
        {children}
      </div>
      <Footer />
    </div>
  );
};
