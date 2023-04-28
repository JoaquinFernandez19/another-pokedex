import { db } from "../login/Firebase";
import { doc, collection, updateDoc, Timestamp } from "firebase/firestore";
import { checkIfPokemonAlredyInDB } from "./Pokemons";
import { Pokemon } from "@/app/utils/Types";
const CREDIT_LIMITS = Number(process.env.NEXT_PUBLIC_CREDITS);

export const syncUserInfoWithDB = async (
  userUID?: string,
  credits?: number,
  lastSeenPokemon?: Pokemon | null
) => {
  //Everytime the user does something, use this functions to sync with database
  const collectionRef = collection(db, "users");
  const docRef = doc(collectionRef, userUID);

  const updateObject: {
    last_pokemon_seen?: number;
    credits?: number;
    last_reset?: Date;
  } = {};

  //For updating the pokemon
  if (lastSeenPokemon) {
    const last_pokemon_seen = await checkIfPokemonAlredyInDB(
      lastSeenPokemon.id,
      lastSeenPokemon
    );
    updateObject.last_pokemon_seen = last_pokemon_seen;
  }
  //For updating something related with the credits
  if (credits || credits === 0) {
    updateObject.credits = credits;
    if (credits === 0) updateObject.last_reset = new Date();
  }

  await updateDoc(docRef, updateObject);
};

export const howManyCreditsUserShouldHave = (
  last_reset: Timestamp,
  credits: number,
  userId: string
) => {
  debugger;
  const twelveHoursAgo = new Date(Date.now() - 12 * 60 * 60 * 1000); // create a date object for 12 hours ago
  const lastReset = last_reset.toDate();

  if (credits) {
    syncUserInfoWithDB(userId, CREDIT_LIMITS, null);
    return credits;
  }

  if (lastReset.getTime() <= twelveHoursAgo.getTime()) {
    // 12 hours have passed since last reset
    syncUserInfoWithDB(userId, CREDIT_LIMITS, null);
    return CREDIT_LIMITS;
  } else {
    // Less than 12 hours have passed since last reset
    return 0;
  }
};
