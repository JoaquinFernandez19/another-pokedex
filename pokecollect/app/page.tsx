import { Main } from "./components/content/main/Main";
import { BackgroundLogo } from "./components/layout/BackgroundLogo";
import { Footer } from "./components/layout/Footer";
import { fetchPokemons } from "./utils/Utils";

import { Bubblegum_Sans } from "@next/font/google";

const roboto = Bubblegum_Sans({
  subsets: ["latin"],
  weight: ["400"],
});

export default async function Home() {
  const { data } = await fetchPokemons();
  return (
    <div className={`main ${roboto.className}`}>
      <Main data={data} />
      <BackgroundLogo />
      <Footer />
    </div>
  );
}
