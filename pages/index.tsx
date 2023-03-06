import type { NextPage } from "next";
import Head from "next/head";
import {
  cleanupPokemonRequest,
  getRandomPokemon,
  fetchPokemons,
} from "../utils/Utils";
import { GetServerSideProps } from "next";

import styles from "../styles/Home.module.css";
import { PokeCard } from "../components/main-content/PokeCard";
import { Pokemon } from "../components/Types";
import { useState } from "react";

type Props = {
  data: Pokemon[];
  initialPokemon: number;
};

const Home: NextPage<Props> = ({ data }) => {
  //data equals an array of pokemons
  return (
    <div className="pt-14 pb-14">
      <Head>
        <title>pokecollect</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PokeCard pokemonList={data} />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const { data } = await fetchPokemons(4);
  return { props: { data } };
};
export default Home;
