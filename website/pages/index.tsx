import type { NextPage } from "next";
import Head from "next/head";
import { fetchPokemons } from "../utils/Utils";
import { GetServerSideProps } from "next";
import { PokeCard } from "../components/content/PokeCard";
import { Pokemon, PokemonList } from "../components/Types";
import {
  useState,

} from "react";

import { UserContext } from "../components/context/Context";
import { Profile } from "../components/content/profile/Profile";

type Props = {
  data: Pokemon[];
  initialPokemon: number;
};

const Home: NextPage<Props> = ({ data }) => {
  //data equals an array of pokemons
  const [userData, setUserData] = useState<{
    userName: string;
    userId: number;
  }>({
    userName: "Joaco",
    userId: 1,
  });
  const [coins, setCoints] = useState(4000);
  const [ownedPokemons, setOwnedPokemons] = useState<PokemonList>([]);
  const [inited, setInited] = useState<boolean>(false);
  return (
    <UserContext.Provider
      value={{
        userName: userData.userName,
        userId: userData.userId,
        coins: coins,
        ownedPokemons: ownedPokemons,
        setCoins: setCoints,
        setOwnedPokemons: setOwnedPokemons,
      }}
    >
      <div className=" h-full pt-6 pb-2 md:pt-14 md:pb-14 ">
        {inited ? <Profile /> : ""}
        <Head>
          <title>pokecollect</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <PokeCard pokemonList={data} setInited={setInited} />
      </div>
    </UserContext.Provider>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const { data } = await fetchPokemons();
  return { props: { data } };
};
export default Home;
