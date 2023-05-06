import { Pokemon } from "@/app/lib/Types";
import { User } from "firebase/auth";
import {
  doc,
  collection,
  getDoc,
  setDoc,
  DocumentReference,
  DocumentData,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
import { db } from "./Firebase";

//All utils functions here correlate to pokemons information

export const savePokemonToDB = async (
  pokemonDocRef: DocumentReference<DocumentData>,
  pokemonJson: string
) => {
  await setDoc(
    pokemonDocRef,
    {
      info_json: pokemonJson,
    },
    { merge: false }
  );
};

export const checkIfPokemonAlredyInDB = async (id: number, pokemon: Pokemon) => {
  const pokemonsCollectionRef = collection(db, "pokemons");

  // Create the document only if it doesn't exist in the database
  const pokemonDocRef = doc(pokemonsCollectionRef, String(id));
  const pokemonDocSnapshot = await getDoc(pokemonDocRef);

  if (!pokemonDocSnapshot.exists()) {
    await savePokemonToDB(pokemonDocRef, JSON.stringify(pokemon));
  }

  return id;
};

export const catchPokemonDB = async (userDataAuth: User | null, pokemon: Pokemon) => {
  if (!userDataAuth) return;
  const usersCollectionRef = collection(db, "users");
  const docRef = doc(usersCollectionRef, userDataAuth.uid);
  updateDoc(docRef, {
    catched_pokemons: arrayUnion({
      catch_date: new Date(),
      favorite: false,
      pokemon_id: pokemon.id,
    }),
  });
};

export async function fetchPokemonList(pokemonIdList: string[] = []) {
  if (!pokemonIdList.length) return [];
  const collectionRef = collection(db, "pokemons");

  //Get the doc keys
  const docKeys: string[] = pokemonIdList;

  //Fetch the docs
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
