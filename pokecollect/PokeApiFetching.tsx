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
