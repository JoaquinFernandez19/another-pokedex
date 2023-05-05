//This file will define the initial fetching and loadings
//AS well as declaring context and all of that
import {
  Timestamp,
  collection,
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "./firebase/Firebase";
import { fetchPokemons } from "./PokeApiFetching";
import { PokemonList } from "./Types";
import { createContext, Dispatch } from "react";
import { AppAction, AppState } from "./AppReducer";
import { UserInfo } from "firebase/auth";

const CREDIT_LIMITS = Number(process.env.NEXT_PUBLIC_CREDITS);
export const AppInitialState: AppState = {
  credits: 0,
  pokemonList: [],
  currPokemon: 0,
  ownedPokemons: [],
  userDataDB: null,
  userDataAuth: null,
  clickedInitialPokeBall: false,
  isMobile: false,
};

export const SetAppInitialState = async (authUserObject: UserInfo) => {
  let userDataDB = await fetchUserInfo(authUserObject);
  let recentlyRegister = false;
  if (!userDataDB) {
    userDataDB = await registerUserInDB(authUserObject);
    recentlyRegister = true;
  }
  //Get some data needed
  let ownedPokemons = [];
  if (!recentlyRegister)
    ownedPokemons = await fetchUserPokemons(userDataDB.catched_pokemons);
  //Fix date type to  correclty execute code, new users will have Date object
  userDataDB.last_reset = recentlyRegister
    ? userDataDB.last_reset
    : userDataDB.last_reset.toDate();
  //Detects if we can re-fetch pokemon list, re add credits and update last reset date
  const shouldReset = shouldResetCheck(
    userDataDB.last_reset,
    userDataDB.credits,
    recentlyRegister
  );

  let credits;
  let pokemonList;
  let lastReset;
  if (shouldReset) {
    credits = CREDIT_LIMITS;
    pokemonList = await fetchPokemons();
    lastReset = new Date();
    await saveUserDataToDBAfterReset(authUserObject, pokemonList, lastReset);
  } else {
    credits = userDataDB.credits;
    pokemonList = await fetchPokemons(userDataDB.last_pokemon_collection);
  }

  //Setup correctly showing pokemon based on credits and list length
  const currPokemon = pokemonList.length - (credits + 1);

  return {
    credits: credits,
    pokemonList,
    currPokemon,
    ownedPokemons,
    userDataDB: userDataDB,
    userDataAuth: authUserObject,
    clickedInitialPokeBall: false,
    isMobile: checkDevice(),
  };
};

export const AppContext = createContext<{
  state: AppState;
  dispatch: Dispatch<AppAction>;
}>({
  state: AppInitialState,
  dispatch: () => {},
});
async function saveUserDataToDBAfterReset(
  authUserObject: UserInfo,
  pokemonList: PokemonList,
  lastReset: Date
) {
  //First prepare the array of ids
  const listOfPokemonIds = pokemonList.map((poke) => poke.id);
  const pokemonsCollectionRef = collection(db, "users");
  const ref = doc(pokemonsCollectionRef, authUserObject.uid);
  updateDoc(ref, {
    last_pokemon_collection: listOfPokemonIds,
    last_reset: lastReset,
    credits: CREDIT_LIMITS,
  }).catch((error) => console.error("error...", error));
}
export async function saveSpentCreditDB(
  authUserObject: UserInfo,
  credits: number
) {
  const pokemonsCollectionRef = collection(db, "users");
  const ref = doc(pokemonsCollectionRef, authUserObject.uid);
  updateDoc(ref, {
    credits: credits,
  }).catch((error) => console.error("error...", error));
}
async function registerUserInDB(authUserObject: UserInfo) {
  const InitialUserData = {
    achievements: [],
    catched_pokemons: [],
    date_started: new Date(),
    last_pokemon_collection: [],
    last_reset: new Date(),
    name: authUserObject.displayName,
    rank: 1,
    credits: Number(process.env.NEXT_PUBLIC_CREDITS),
  };

  await setDoc(doc(db, "users", authUserObject.uid), InitialUserData);

  return InitialUserData;
}
async function fetchUserInfo(authUserObject: UserInfo) {
  const docRef = doc(db, "users", authUserObject.uid);

  const userSnap = await getDoc(docRef);
  if (userSnap.exists()) {
    const userSnapData = userSnap.data();
    return userSnapData;
  }
  return false;
}
async function fetchUserPokemons(pokemons: { pokemon_id: number }[] = []) {
  if (!pokemons.length) return [];
  const collectionRef = collection(db, "pokemons");
  //Get the doc keys
  const docKeys: string[] = [];
  pokemons.forEach((pk) => {
    docKeys.push(String(pk.pokemon_id));
  });

  //fetch the docs
  const docs = await Promise.all(
    docKeys.map(async (docKey) => {
      const docRef = doc(collectionRef, docKey);
      const docSnapshot = await getDoc(docRef);
      if (!docSnapshot.exists()) {
        return null;
      }
      return JSON.parse(docSnapshot.data().info_json);
    })
  );

  return docs;
}
function shouldResetCheck(
  last_reset: Date,
  credits: number,
  recentlyRegister: boolean
) {
  if (!last_reset) return true;
  const twelveHoursAgo = new Date(Date.now() - 12 * 60 * 60 * 1000); // create a date object for 12 hours ago
  const lastReset = last_reset;

  if (recentlyRegister) return true;

  if (credits) {
    return false;
  }
  if (lastReset.getTime() <= twelveHoursAgo.getTime()) {
    // 12 hours have passed since last reset
    return true;
  }
}
function checkDevice() {
  const { innerWidth: width } = window;
  return width <= 768;
}
