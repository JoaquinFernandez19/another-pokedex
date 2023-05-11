import { FrontSprite, PhysicalInfo, Pokemon, PokemonType, Stat } from "./Types";
import PokTypes from "./PokTypes.json";
import { fetchPokemonList } from "./firebase/Pokemons";
import { CREDIT_LIMITS } from "./AppInitialState";

const NUMBER_OF_POKEMONS = process.env.NEXT_PUBLIC_NUMBER_OF_POKEMONS;

export const fetchPokemons = async (last_pokemon_collection?: number[]) => {
  let returnValue: Pokemon[] = [];
  try {
    let randomPokemonIds;
    //If last collection, use that one, if not, generate the random one
    if (last_pokemon_collection) {
      randomPokemonIds = last_pokemon_collection;
    } else {
      randomPokemonIds = getRandomPokemonList(
        Number(NUMBER_OF_POKEMONS),
        CREDIT_LIMITS
      );
    }
    //New system fetches from Firebase
    const processedListToString = randomPokemonIds.map((pokeid: number) =>
      String(pokeid)
    );
    returnValue = await fetchPokemonList(processedListToString);
    //Old method fetches PokeAPI
    // const promises = randomPokemonIds.map((id) => {
    //   return fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    // });
    // const responses = await Promise.all(promises);

    // const arr = await Promise.all(responses.map((response) => response.json()));

    // arr.forEach((el) => {
    //   returnValue.push(cleanupPokemonRequest(el));
    // });
  } catch (e) {
    console.log("error", e);
  }
  return returnValue;
};

export const getRandomPokemonList = (maxNum: number, quantity: number) => {
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

// export const preLoadImgs = async (imgArray: string[]) => {
//   return imgArray.map((img) => {
//     const currImg = new Image();
//     currImg.src = img;
//     return currImg;
//   });
// };

//This was for using PokeApi, not needed any more for now because we have theme store in  own DB alredy formated
// const cleanupPokemonRequest = (data: any): Pokemon => {
//   const formattedStats = formatStats(data.stats);
//   return {
//     name: fixName(data.name),
//     height: formatWeightAndHeight(null, data.height),
//     id: data.id,
//     img: getOfficialArtwork(data.sprites),
//     mainType: getMainType(data.types),
//     types: data.types,
//     weight: formatWeightAndHeight(data.weight, null),
//     color: filterColor(getMainType(data.types)),
//     value: getPokemonValue(formattedStats).value,
//     stars: getPokemonValue(formattedStats).stars,
//     stats: formattedStats,
//     sm_img: getOfficialArtwork(data.sprites, "sm"),
//   };
// };
// const formatStats = (stats: any[]): Stat[] => {
//   const formattedStats: Stat[] = [];
//   stats.map((stat) => {
//     formattedStats.push({
//       name: stat.stat.name,
//       value: stat.base_stat,
//     });
//   });

//   return formattedStats;
// };
// const getPokemonValue = (stats: any[]): { value: number; stars: number } => {
//   let value = 0;
//   let stars = 0;

//   stats.map((stat) => (value += stat.value));
//   if (value >= 200) stars = 1;

//   if (value >= 300) stars = 2;

//   if (value >= 400) stars = 3;

//   if (value >= 500) stars = 4;

//   if (value >= 600) stars = 5;

//   return { value: value, stars: stars };
// };
// const formatWeightAndHeight = (w: PhysicalInfo, h: PhysicalInfo) => {
//   if (w) return `${w / 10} KG`;
//   if (h) return `${h * 10} CM`;
//   return "0";
// };
// const filterColor = (mainType: PokemonType) => {
//   const type = mainType.type.name;
//   const key = PokTypes.types.find((key: any) => key.type == type);
//   return key?.color;
// };
// const fixName = (name: string) => {
//   name = name.split("-")[0];
//   return name.charAt(0).toUpperCase() + name.slice(1);
// };
// const getOfficialArtwork = (sprites: FrontSprite, type?: string) => {
//   if (type == "sm") return sprites?.front_default;
//   return sprites?.other?.["official-artwork"]?.front_default;
// };
// const getMainType = (types: PokemonType[]) => {
//   return types[0];
// };

// const getOrderedListOfPokemons = (start: number, finish: number) => {
//   const result = [];
//   for (let i = start; i <= finish; i++) {
//     result.push(i);
//   }
//   return result;
// };
