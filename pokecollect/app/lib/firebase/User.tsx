import { User, UserInfo } from "firebase/auth";
import { collection, doc, updateDoc, setDoc, getDoc } from "firebase/firestore";
import {
  CatchedPokemon,
  PokemonList,
  StateDataToUpdateType,
  UserDB,
} from "../Types";
import { db } from "./Firebase";

export async function syncStateDataWithDB(
  authUserObject: UserInfo | User | null,
  credits: number,
  pokemonCollection: PokemonList,
  lastReset: string,
  catched_pokemons: CatchedPokemon[]
) {
  if (!authUserObject) return;

  const stateDataToUpdate: StateDataToUpdateType = {};
  stateDataToUpdate.credits = credits;

  stateDataToUpdate.catched_pokemons = catched_pokemons;

  stateDataToUpdate.last_pokemon_collection = pokemonCollection.map(
    (poke) => poke.id
  );
  if (lastReset) stateDataToUpdate.last_reset = new Date(lastReset);

  const pokemonsCollectionRef = collection(db, "users");
  const ref = doc(pokemonsCollectionRef, authUserObject.uid);
  updateDoc(ref, stateDataToUpdate).catch((error) =>
    console.error("error...", error)
  );
}

export async function registerUserInDB(authUserObject: UserInfo) {
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
export async function fetchUserInfo(authUserObject: UserInfo) {
  const docRef = doc(db, "users", authUserObject.uid);

  const userSnap = await getDoc(docRef);
  if (userSnap.exists()) {
    const userSnapData = userSnap.data();
    return userSnapData;
  }
  return false;
}

export function shouldResetCheck(
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
