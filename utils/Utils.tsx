import { Pokemon, PokemonType, Stat } from "../components/Types";
import PokTypes from "./PokTypes.json";
interface FrontSprite {
  other: { "official-artwork": { front_default: string } };
}
type PhysicalInfo = number | null;
const NUMBER_OF_POKEMONS = process.env.NEXT_PUBLIC_NUMBER_OF_POKEMONS;
const CREDIT_LIMITS = Number(process.env.NEXT_PUBLIC_CREDITS);

export const cleanupPokemonRequest = (data: any): Pokemon => {
  return {
    name: fixName(data.name),
    height: formatWeightAndHeight(null, data.height),
    id: data.id,
    img: getOfficialArtwork(data.sprites),
    mainType: getMainType(data.types),
    types: data.types,
    weight: formatWeightAndHeight(data.weight, null),
    stats: formatStats(data.stats),
    color: filterColor(getMainType(data.types)),
  };
};

const formatStats = (stats: any[]): Stat[] => {
  const formattedStats: Stat[] = [];
  stats.map((stat) => {
    formattedStats.push({
      name: stat.stat.name,
      value: stat.base_stat,
    });
  });

  return formattedStats;
};

const formatWeightAndHeight = (w: PhysicalInfo, h: PhysicalInfo) => {
  if (w) return `${w / 10} KG`;
  if (h) return `${h * 10} CM`;
  return "0";
};
const filterColor = (mainType: PokemonType) => {
  const type = mainType.type.name;
  const key = PokTypes.types.find((key: any) => key.type == type);
  return key?.color;
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
export const fetchPokemons = async () => {
  const returnValue: Pokemon[] = [];
  try {
    const randomPokemonIds = getRandomPokemon(
      Number(NUMBER_OF_POKEMONS),
      CREDIT_LIMITS + 1
    );
    const promises = randomPokemonIds.map((id) => {
      return fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    });

    const responses = await Promise.all(promises);

    const arr = await Promise.all(responses.map((response) => response.json()));

    arr.forEach((el) => {
      returnValue.push(cleanupPokemonRequest(el));
    });
  } catch (e) {
    fetchPokemons();
  }
  return { data: returnValue };
};
export const preLoadImgs = async (imgArray: string[]) => {
  return imgArray.map((img) => {
    const currImg = new Image();
    currImg.src = img;
    return currImg;
  });
};
