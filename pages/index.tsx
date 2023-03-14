import type { NextPage } from "next";
import Head from "next/head";
import { fetchPokemons } from "../utils/Utils";
import { GetServerSideProps } from "next";
import { Coins } from "../components/main-content/Coins";
import { PokeCard } from "../components/main-content/PokeCard";
import { Pokemon, PokemonList } from "../components/Types";
import { useState } from "react";

type Props = {
  data: Pokemon[];
  initialPokemon: number;
};

const Home: NextPage<Props> = ({ data }) => {
  //data equals an array of pokemons
  const [coins, setCoints] = useState(0);
  const [ownedPokemons, setOwnedPokemons] = useState<PokemonList>([]);

  return (
    <div className=" h-full pt-6 pb-2 md:pt-14 md:pb-14 ">
      <Coins coins={coins} />
      <Head>
        <title>pokecollect</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PokeCard pokemonList={data} />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const { data } = await fetchPokemons();
  return { props: { data } };
};
export default Home;
