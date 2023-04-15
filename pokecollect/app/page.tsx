import { Main } from "./components/content/main/Main";

import { Footer } from "./components/layout/Footer";

import { Bubblegum_Sans } from "@next/font/google";

const roboto = Bubblegum_Sans({
  subsets: ["latin"],
  weight: ["400"],
});

export default function Home() {
  return (
    <div className={`main ${roboto.className}`}>
      <Main />

      <Footer />
    </div>
  );
}
