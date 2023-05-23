import { Dispatch } from "react";
import { AppAction, AppActions, AppState } from "../AppReducer";
import { CREDIT_LIMITS } from "../AppInitialState";
import { PokemonList, CatchedPokemon, Pokemon } from "../Types";
import { fetchPokemonList } from "../firebase/Pokemons";
import { Bubblegum_Sans } from "@next/font/google";

export async function enableCreditsAndFetchPokemonsList(
  state: AppState,
  dispatch: Dispatch<AppAction>
) {
  const newPokemons = await fetchPokemons();

  dispatch({
    type: AppActions.SET_POKEMON_COLLECTION,
    payload: { pokemonCollection: newPokemons },
  });
  dispatch({
    type: AppActions.SET_CURR_POKEMON,
    payload: { currPokemon: 0 },
  });
  dispatch({
    type: AppActions.SET_CREDITS,
    payload: { credits: CREDIT_LIMITS },
  });

  dispatch({
    type: AppActions.SYNC_WITH_DB,
    payload: "",
  });
}

export function addAmountToLocalOwnedPokemonList(
  ownedPokemons: PokemonList,
  catched_pokemons: CatchedPokemon[]
) {
  const ownedPokemonsWithAmount = ownedPokemons.map((pokemon1) => {
    const pokemonKeyFromDB = catched_pokemons.find(
      (pokemon2) => pokemon1.id === pokemon2.pokemon_id
    );

    if (pokemonKeyFromDB) {
      const amount = pokemonKeyFromDB.amount ?? 1; //Handle users that have catched before amount update
      return { ...pokemon1, amount: amount };
    }

    return pokemon1;
  });

  return ownedPokemonsWithAmount;
}

export function checkDevice() {
  const { innerWidth: width } = window;
  return width <= 768;
}

const NUMBER_OF_POKEMONS = process.env.NEXT_PUBLIC_NUMBER_OF_POKEMONS;

export const fetchPokemons = async (last_pokemon_collection?: number[]) => {
  let returnValue: Pokemon[] = [];
  try {
    let randomPokemonIds;
    //If last collection, use that one, if not, generate the random one
    if (last_pokemon_collection?.length) {
      randomPokemonIds = last_pokemon_collection;
    } else {
      randomPokemonIds = getRandomPokemonList(
        Number(NUMBER_OF_POKEMONS),
        CREDIT_LIMITS
      );
    }
    //New system fetches from Firebase
    const processedListToString = randomPokemonIds.map((pokeid: number) =>
      String(pokeid)
    );
    returnValue = await fetchPokemonList(processedListToString);
    //Old method fetches PokeAPI
    // const promises = randomPokemonIds.map((id) => {
    //   return fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    // });
    // const responses = await Promise.all(promises);

    // const arr = await Promise.all(responses.map((response) => response.json()));

    // arr.forEach((el) => {
    //   returnValue.push(cleanupPokemonRequest(el));
    // });
  } catch (e) {
    console.log("error", e);
  }
  return returnValue;
};

export const getRandomPokemonList = (maxNum: number, quantity: number) => {
  const result: number[] = [];
  const start = 0;
  const end = maxNum;
  while (result.length < quantity) {
    let num = Math.floor(Math.random() * (end - start + 1)) + start;
    if (!result.includes(num)) {
      result.push(num);
    }
  }
  return result;
};

export const preLoadImgsInstant = async (imgArray: string[]) => {
  return imgArray.map((img) => {
    const currImg = new Image();
    currImg.src = img;
    return currImg;
  });
};

export const bublegum = Bubblegum_Sans({
  subsets: ["latin"],
  weight: ["400"],
});

export const getFormattedDate = (dateObj: Date) => {
  // Define the desired date format
  const dateFormat = "yyyy/MM/dd";

  // Get the individual date components
  const year = String(dateObj.getFullYear());
  const month = String(dateObj.getMonth() + 1).padStart(2, "0");
  const day = String(dateObj.getDate()).padStart(2, "0");

  // Construct the formatted date string
  const formattedDate = dateFormat
    .replace("yyyy", year)
    .replace("MM", month)
    .replace("dd", day);

  return formattedDate;
};
