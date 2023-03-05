import type { NextPage } from "next";
import Head from "next/head";
import { cleanupPokemonRequest, getRandomPokemon } from "../utils/Utils";
import { GetServerSideProps } from "next";

import styles from "../styles/Home.module.css";
import { PokeCard } from "../components/PokeCard";
import { Pokemon } from "../components/Types";

type Props = {
  data: Pokemon;
};

const Home: NextPage<Props> = ({ data }: { data: Pokemon }) => {
  return (
    <div className="pt-14 pb-14">
      <Head>
        <title>another-pokedex</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PokeCard pokemon={data} />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  // Fetch data from external API
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${getRandomPokemon(1008)}`);
  const data: Pokemon = cleanupPokemonRequest(await res.json());

  return { props: { data } };
};
export default Home;
