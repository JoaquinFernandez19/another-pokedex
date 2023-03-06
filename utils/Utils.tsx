import { debug } from "console";
import { Pokemon, PokemonType } from "../components/Types";

interface FrontSprite {
  other: { "official-artwork": { front_default: string } };
}
const NUMBER_OF_POKEMONS = 1008;

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

export const getRandomPokemon = (maxNum: number, quantity: number) => {
  const result: number[] = [];
  const start = 0;
  const end = maxNum;
  while (result.length < quantity) {
    let num = Math.floor(Math.random() * (end - start + 1)) + start;
    if (!result.includes(num)) {
      result.push(num);
    }
  }
  return result;
};

export const fetchPokemons = async (quantity: number) => {
  const returnValue: Pokemon[] = [];

  const randomPokemonIds = getRandomPokemon(NUMBER_OF_POKEMONS, quantity);

  const promises = randomPokemonIds.map((id) => {
    return fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  });

  const responses = await Promise.all(promises);

  const arr = await Promise.all(responses.map((response) => response.json()));

  arr.forEach((el) => {
    returnValue.push(cleanupPokemonRequest(el));
  });

  return { data: returnValue };
};

export const preLoadImgs = async (imgArray: string[]) => {
  return imgArray.map((img) => {
    const currImg = new Image();
    currImg.src = img;
    return currImg;
  });
};
