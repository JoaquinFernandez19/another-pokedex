//This file will define the initial fetching and loadings
//AS well as declaring context and all of that
import {
  DocumentData,
  QueryDocumentSnapshot,
  Timestamp,
  collection,
  doc,
  getDoc,
  setDoc,
} from "firebase/firestore";
import { db } from "./firebase/Firebase";
import { fetchPokemons } from "./PokeApiFetching";
import { Pokemon, PokemonList, UserDB, UserInfoLocal } from "./Types";
import { createContext, Dispatch, SetStateAction } from "react";
import { AppAction, AppState } from "./AppReducer";
import { AuthCredential, User, UserCredential, UserInfo } from "firebase/auth";

export const AppInitialState: AppState = {
  credits: 0,
  pokemonList: [],
  currPokemon: 0,
  ownedPokemons: [],
  userData: null,
  clickedInitialPokeBall: false,
  isMobile: false,
};

//Generates the initial state of the app
//We are going to require login so user MUST be logged, sry
export const SetAppInitialState = async (authUserObject: UserInfo) => {
  //First we need to get the user information, prior to anything
  const { userSnap, userSnapData, error } = await fetchUserInfo(authUserObject);
  if (error || !userSnapData) return AppInitialState;
  //With user information we can setup previous attributes
  //Like credists
  const credits = userSnapData.credits;
  //And last pokemon seen
  const lastPokSeen = await getLastSeenPokemon(
    String(userSnapData.last_pokemon_seen),
    userSnap
  );
  //And ownedPokemons
  const ownedPokemons = await fetchUserPokemons(userSnapData.catched_pokemons);
  //Also we need to ensure that if the user has 0 credits
  //Reset its credits if eligible (more than 12 hrs has passed)
  const creditsRenewal = howManyCreditsUserShouldHave(
    userSnapData.last_reset,
    credits
  );
  //Setup all that user information and then fetching the pokemon list
  //Making sure we setup the last pokemon seen correctly
  const pokemonList = await fetchPokemons(lastPokSeen);

  //We setup the current pokemon showing
  const currPokemon = 0;
  //And thats it!
  //We return this and we use those variables at the start of the context of our app
  return {
    credits: creditsRenewal,
    pokemonList,
    currPokemon,
    ownedPokemons,
    userData: { ...userSnapData, authUserObject },
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

async function registerUserInDB(authUserObject: UserInfo) {
  const InitialUserData = {
    achievements: [],
    catched_pokemons: [],
    date_started: new Date(),
    last_pokemon_seen: 0,
    last_reset: new Date(),
    name: authUserObject.displayName,
    rank: 1,
    credits: Number(process.env.NEXT_PUBLIC_CREDITS),
  };
  debugger;
  await setDoc(doc(db, "users", authUserObject.uid), InitialUserData);
  fetchUserInfo(authUserObject);
}

async function fetchUserInfo(authUserObject: UserInfo): Promise<UserInfoLocal> {
  const docRef = doc(db, "users", authUserObject.uid);
  debugger;
  try {
    const userSnap = await getDoc(docRef);
    if (userSnap.exists()) {
      debugger;
      const userSnapData = userSnap.data();

      return { userSnapData, userSnap };
    } else {
      //If it doesnt exist, register and return it
      registerUserInDB(authUserObject);
    }
  } catch (error) {
    console.log("Error getting user:", error);
    return { error };
  }
  return {};
}
async function getLastSeenPokemon(
  pokemonId: string,
  userSnap: QueryDocumentSnapshot<DocumentData> | undefined
) {
  const docSnap = userSnap;
  if (docSnap && docSnap.exists()) {
    const pkCollRef = collection(db, "pokemons");
    const pkDocRef = doc(pkCollRef, String(pokemonId));
    const lastPokemonDoc = await getDoc(pkDocRef);

    if (lastPokemonDoc.exists()) {
      const pokemonData = lastPokemonDoc.data() as { info_json: string };
      return JSON.parse(pokemonData.info_json);
    } else {
      return null;
    }
  }
  return null;
}
async function fetchUserPokemons(pokemons: { pokemon_id: number }[] = []) {
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
function howManyCreditsUserShouldHave(last_reset: Timestamp, credits: number) {
  const CREDIT_LIMITS = Number(process.env.NEXT_PUBLIC_CREDITS);

  const twelveHoursAgo = new Date(Date.now() - 12 * 60 * 60 * 1000); // create a date object for 12 hours ago
  const lastReset = last_reset.toDate();

  if (credits) {
    return credits;
  }

  if (lastReset.getTime() <= twelveHoursAgo.getTime()) {
    // 12 hours have passed since last reset
    return CREDIT_LIMITS;
  }
}
function checkDevice() {
  const { innerWidth: width } = window;
  return width <= 768;
}
