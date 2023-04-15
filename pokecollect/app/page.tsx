import { Main } from "./components/content/main/Main";

import { Footer } from "./components/layout/Footer";

import { Bubblegum_Sans } from "@next/font/google";

const bublegum = Bubblegum_Sans({
  subsets: ["latin"],
  weight: ["400"],
});

export default function Home() {
  return (
    <div className={`main ${bublegum.className}`}>
      <Main />
      <Footer />
    </div>
  );
}
