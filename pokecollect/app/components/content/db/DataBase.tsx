import { Pokemon } from "@/app/utils/Types";
import { db } from "../login/Firebase";
import { doc, getDoc } from "firebase/firestore";

export const generateSessionData = async (userId: string) => {
  const correctedUserData = {};
  const userData = await fetchCurrentUserInfo(userId);
  const pokemonList = fetchCurrentUserPokemons(userData?.catched_pokemons);
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

const fetchCurrentUserPokemons = (pokemons: string[] = []) => {
  const arr = [];
  pokemons.forEach((pk) => {
    ``;
  });
};
