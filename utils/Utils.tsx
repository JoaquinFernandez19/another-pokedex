import { debug } from "console";
import { Pokemon, PokemonType } from "../components/Types";
export const cleanupPokemonRequest = (data: any) => {
  const finalData: Pokemon = {
    name: fixName(data.name),
    height: data.height,
    id: data.id,
    img: getOfficialArtwork(data.sprites),
    mainType: getMainType(data.types),
    types: data.types,
    weight: data.weight,
    stats: data.stats,
  };

  return finalData;
};

interface FrontSprite {
  other: { "official-artwork": { front_default: string } };
}
const fixName = (name: string) => {
  name = name.split("-")[0];
  return name.charAt(0).toUpperCase() + name.slice(1);
};
const getOfficialArtwork = (sprites: FrontSprite) => {
  return sprites?.other?.["official-artwork"]?.front_default;
};
const getMainType = (types: PokemonType[]) => {
  return types[0];
};

export const getRandomPokemon = (maxNum: number) => {
  const min = 1;
  const difference = maxNum - min;
  let rand = Math.floor(Math.random() * difference);
  rand = rand + min;
  return rand;
};
