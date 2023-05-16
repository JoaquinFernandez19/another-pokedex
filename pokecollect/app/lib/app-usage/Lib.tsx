import { Dispatch } from "react";
import { AppAction, AppActions, AppState } from "../AppReducer";
import { CREDIT_LIMITS } from "../AppInitialState";
import { fetchPokemons } from "../PokeApiFetching";

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
