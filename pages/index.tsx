import type { NextPage } from "next";
import Head from "next/head";
import { fetchPokemons } from "../utils/Utils";
import { GetServerSideProps } from "next";
import { Coins } from "../components/main-content/inventory/Coins";
import { PokeCard } from "../components/main-content/PokeCard";
import { Pokemon, PokemonList } from "../components/Types";
import {
  useState,
  useContext,
  createContext,
  Dispatch,
  SetStateAction,
} from "react";
import { Bag } from "../components/main-content/inventory/Bag";
import { Inventory } from "../components/main-content/Inventory";

type Props = {
  data: Pokemon[];
  initialPokemon: number;
};

export const UserContext = createContext<{
  userName: string;
  userId: number;
  coins: number;
  ownedPokemons: PokemonList | [];
  setCoins: Dispatch<SetStateAction<number>>;
  setOwnedPokemons: Dispatch<SetStateAction<PokemonList>>;
}>({
  userName: "",
  userId: 1,
  coins: 0,
  ownedPokemons: [],
  setCoins: () => {},
  setOwnedPokemons: () => {},
});

const Home: NextPage<Props> = ({ data }) => {
  //data equals an array of pokemons
  const [userData, setUserData] = useState<{
    userName: string;
    userId: number;
  }>({
    userName: "Joaco",
    userId: 1,
  });
  const [coins, setCoints] = useState(400);
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
        {inited ? <Inventory /> : ""}
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
