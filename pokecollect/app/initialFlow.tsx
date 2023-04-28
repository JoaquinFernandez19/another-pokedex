//This file will define the initial fetching and loadings
//AS well as declaring context and all of that
import {
  DocumentData,
  QueryDocumentSnapshot,
  Timestamp,
  collection,
  doc,
  getDoc,
} from "firebase/firestore";
import { db } from "./components/content/login/Firebase";
import { userInfo } from "os";
import { syncUserInfoWithDB } from "./components/content/db/UserCredits";
import { fetchPokemons } from "./utils/PokeApiFetching";
import { Pokemon } from "./utils/Types";

const initFlow = async (userUID: string) => {
  //First we need to get the user information, prior to anything
  const { userSnap, userSnapData, error } = await fetchUserInfo(userUID);
  if (error || !userSnapData) return console.log("not logged in...yet");
  //With user information we can setup previous attributes
  //Like credists
  const credits = userSnapData.credits;
  //And last pokemon seen
  const lastPokSeen = await getLastSeenPokemon(String(userSnapData.last_pokemon_seen), userSnap);
  //And ownedPokemons
  const ownedPokemons = await fetchUserPokemons(userSnapData.catched_pokemons);
  //Also we need to ensure that if the user has 0 credits
  //Reset its credits if eligible (more than 12 hrs has passed)
  const creditsRenewal = howManyCreditsUserShouldHave(userSnapData.last_reset, credits);
  //Setup all that user information and then fetching the pokemon list
  //Making sure we setup the last pokemon seen correctly
  const pokemonList = await fetchPokemons(lastPokSeen);
  //After the pokemon list has load
  //We setup the current pokemon showing
  const currPokemon = 0;
  //And thats it!
  //We return this and we use those variables at the start of the context of our app
  return {
    credits,
    creditsRenewal,
    pokemonList,
    currPokemon,
    ownedPokemons,
  };
};
interface UserInfo {
  userSnapData?: DocumentData;
  userSnap?: QueryDocumentSnapshot<DocumentData>;
  error?: unknown;
}

async function fetchUserInfo(userId: string): Promise<UserInfo> {
  const docRef = doc(db, "users", userId);
  try {
    const userSnap = await getDoc(docRef);
    if (userSnap.exists()) {
      const userSnapData = userSnap.data();
      return { userSnapData, userSnap };
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
