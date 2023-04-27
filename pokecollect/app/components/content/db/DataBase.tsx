import { Pokemon } from "@/app/utils/Types";
import { db } from "../login/Firebase";
import { doc, getDoc, collection, query, where, getDocs } from "firebase/firestore";

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

//TODO: dividie the array in parts and fetch by 5 or something like that
//Return that something is loading to show empty pokemons loading icons
//if not loading, we onyl show the alredy loaded pokemons!!!
//Will be hard but no impossible!!!!
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
      return docSnapshot.data().info_json;
    })
  );

  return arr;
};
