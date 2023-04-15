import { Pokemon, PokemonType, Stat } from "./Types";
import PokTypes from "./PokTypes.json";
interface FrontSprite {
  other: { "official-artwork": { front_default: string } };
  front_default: string;
}
type PhysicalInfo = number | null;
const NUMBER_OF_POKEMONS = process.env.NEXT_PUBLIC_NUMBER_OF_POKEMONS;
const CREDIT_LIMITS = Number(process.env.NEXT_PUBLIC_CREDITS);

export const cleanupPokemonRequest = (data: any): Pokemon => {
  const formattedStats = formatStats(data.stats);
  return {
    name: fixName(data.name),
    height: formatWeightAndHeight(null, data.height),
    id: data.id,
    img: getOfficialArtwork(data.sprites),
    mainType: getMainType(data.types),
    types: data.types,
    weight: formatWeightAndHeight(data.weight, null),
    color: filterColor(getMainType(data.types)),
    value: getPokemonValue(formattedStats).value,
    stars: getPokemonValue(formattedStats).stars,
    stats: formattedStats,
    sm_img: getOfficialArtwork(data.sprites, "sm"),
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
const getPokemonValue = (stats: any[]): { value: number; stars: number } => {
  let value = 0;
  let stars = 0;

  stats.map((stat) => (value += stat.value));
  if (value >= 200) stars = 1;

  if (value >= 300) stars = 2;

  if (value >= 400) stars = 3;

  if (value >= 500) stars = 4;

  if (value >= 600) stars = 5;

  return { value: value, stars: stars };
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
const getOfficialArtwork = (sprites: FrontSprite, type?: string) => {
  if (type == "sm") return sprites?.front_default;
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
    console.log("error", e);
  }
  return returnValue;
};
export const preLoadImgs = async (imgArray: string[]) => {
  return imgArray.map((img) => {
    const currImg = new Image();
    currImg.src = img;
    return currImg;
  });
};
