import { Dispatch } from "react";
import { AppAction, AppActions, AppState } from "../AppReducer";
import { CREDIT_LIMITS } from "../AppInitialState";
import { fetchPokemons } from "../PokeApiFetching";
import { PokemonList, CatchedPokemon } from "../Types";

export async function enableCreditsAndFetchPokemonsList(
  state: AppState,
  dispatch: Dispatch<AppAction>
) {
  const newPokemons = await fetchPokemons();

  dispatch({
    type: AppActions.SET_POKEMON_COLLECTION,
    payload: { pokemonCollection: newPokemons },
  });
  dispatch({
    type: AppActions.SET_CURR_POKEMON,
    payload: { currPokemon: 0 },
  });
  dispatch({
    type: AppActions.SET_CREDITS,
    payload: { credits: CREDIT_LIMITS },
  });

  dispatch({
    type: AppActions.SYNC_WITH_DB,
    payload: "",
  });
}

export function addAmountToLocalOwnedPokemonList(
  ownedPokemons: PokemonList,
  catched_pokemons: CatchedPokemon[]
) {
  const ownedPokemonsWithAmount = ownedPokemons.map((pokemon1) => {
    const pokemonKeyFromDB = catched_pokemons.find(
      (pokemon2) => pokemon1.id === pokemon2.pokemon_id
    );

    if (pokemonKeyFromDB) {
      const amount = pokemonKeyFromDB.amount ?? 1; //Handle users that have catched before amount update
      return { ...pokemon1, amount: amount };
    }

    return pokemon1;
  });

  return ownedPokemonsWithAmount;
}

export function checkDevice() {
  const { innerWidth: width } = window;
  return width <= 768;
}
