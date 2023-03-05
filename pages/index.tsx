import type { NextPage } from "next";
import Head from "next/head";
import {
  cleanupPokemonRequest,
  getRandomPokemon,
  fetchSinglePokemon,
} from "../utils/Utils";
import { GetServerSideProps } from "next";

import styles from "../styles/Home.module.css";
import { PokeCard } from "../components/main-content/PokeCard";
import { Pokemon } from "../components/Types";
import { useState } from "react";

type Props = {
  data: Pokemon;
  initialPokemon: Number;
};

const Home: NextPage<Props> = ({ data, initialPokemon }) => {
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
  const NUMBER_OF_POKEMONS = 1008;
  const { data, initialPokemon } = await fetchSinglePokemon(NUMBER_OF_POKEMONS);
  return { props: { data, initialPokemon } };
};
export default Home;
