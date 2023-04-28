import { Pokemon } from "@/app/utils/Types";
import { db } from "../login/Firebase";
import { doc, getDoc, collection } from "firebase/firestore";
import { howManyCreditsUserShouldHave } from "./UserCredits";

export const generateSessionData = async (userId: string) => {
  const userData = await fetchCurrentUserInfo(userId);
  const pokemonList = await fetchCurrentUserPokemons(userData?.catched_pokemons);
  const lastResetTimestamp = userData?.last_reset;
  const credits = howManyCreditsUserShouldHave(lastResetTimestamp, userData?.credits, userId);

  return {
    userData,
    pokemonList,
    credits,
  };
};

const fetchCurrentUserInfo = async (userId: string) => {
  const docRef = doc(db, "users", userId);
  try {
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data();
    }
  } catch (error) {
    console.log("Error getting user:", error);
  }
};

const fetchCurrentUserPokemons = async (pokemons: { pokemon_id: number }[] = []) => {
  const collectionRef = collection(db, "pokemons");
  //Get the doc keys
  const arr: Pokemon[] = [];
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
};
