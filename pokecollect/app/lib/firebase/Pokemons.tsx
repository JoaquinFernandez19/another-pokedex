import { Pokemon, PokemonList } from "@/app/lib/Types";
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

export const checkIfPokemonAlredyInDB = async (
  id: number,
  pokemon: Pokemon
) => {
  const pokemonsCollectionRef = collection(db, "pokemons");

  // Create the document only if it doesn't exist in the database
  const pokemonDocRef = doc(pokemonsCollectionRef, String(id));
  const pokemonDocSnapshot = await getDoc(pokemonDocRef);

  if (!pokemonDocSnapshot.exists()) {
    await savePokemonToDB(pokemonDocRef, JSON.stringify(pokemon));
  }

  return id;
};

export const getLastSeenPokemon = async (userId?: string) => {
  if (!userId) return;

  const usersCollectionRef = collection(db, "users");
  const userDocRef = doc(usersCollectionRef, userId);
  const docSnap = await getDoc(userDocRef);
  if (docSnap.exists()) {
    const lastPokemonRef = docSnap.data().last_pokemon_seen;
    const pkCollRef = collection(db, "pokemons");
    const pkDocRef = doc(pkCollRef, String(lastPokemonRef));
    const lastPokemonDoc = await getDoc(pkDocRef);

    if (lastPokemonDoc.exists()) {
      const pokemonData = lastPokemonDoc.data() as { info_json: string };
      return JSON.parse(pokemonData.info_json);
    } else {
      return null;
    }
  }
  return null;
};

export const catchPokemonDB = async (
  userDataAuth: User | null,
  pokemon: Pokemon
) => {
  if (!userDataAuth) return;
  const usersCollectionRef = collection(db, "users");
  const docRef = doc(usersCollectionRef, userDataAuth.uid);
  updateDoc(docRef, {
    catched_pokemons: arrayUnion({
      catch_date: new Date(),
      favorite: false,
      pokemon_id: pokemon.id,
    }), // Replace 1 with the number you want to add
  });
};
