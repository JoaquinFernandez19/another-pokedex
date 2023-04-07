import React, {
  createContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { preLoadImgs } from "../../utils/Utils";
import { Pokemon } from "../Types";
import { Randomizer } from "./pokecard-components/bottom-actions/Randomizer";
import { motion } from "framer-motion";
import { HiddenCard } from "./HiddenCard";
import { Dispatch, SetStateAction } from "react";
import { InfoBadge } from "./pokecard-components/InfoBadge";
import { PokeStats } from "./pokecard-components/PokeStats";
import { PokeStars } from "./pokecard-components/PokePrice";
import { Purchaser } from "./pokecard-components/bottom-actions/Purchaser";
import { BottomActions } from "./pokecard-components/bottom-actions/BottomActions";
const CREDIT_LIMITS = Number(process.env.NEXT_PUBLIC_CREDITS);
//Undefined bc at load we dont have data yet
interface PokeCardprops {
  pokemonList: Pokemon[];
  setInited: Dispatch<SetStateAction<boolean>>;
}

export const CurrentPokemonContext = createContext<Pokemon>({
  name: "",
  id: 0,
  types: [],
  img: "",
  weight: "",
  stars: 0,
  height: "",
  mainType: { slot: 0, type: { name: "none", url: "none" } },
  stats: [],
  value: 0,
});

export const PokeCard: React.FC<PokeCardprops> = ({
  pokemonList,
  setInited,
}) => {
  //States and refs
  const [credits, setCredits] = useState<number>(CREDIT_LIMITS);
  const [firstPokemonSeen, setFirstPokemonSeen] = useState<boolean>(false);
  const currPokIndex = useRef<number>(0);
  const [currPokemon, setPokemon] = useState<Pokemon>(
    pokemonList[currPokIndex.current]
  );
  const [showStats, setShowStats] = useState<boolean>(false);

  let managingStats = useRef(false);
  let rolling = useRef(false);

  //Functions
  const randomize = () => {
    //If when rolling, we are showing stats
    //we should maintain a reference for that
    rolling.current = true;
    managingStats.current = false;
    if (credits > 0) setCredits(credits - 1);
  };

  //Effects
  useMemo(() => {
    if (!firstPokemonSeen) return;
    managingStats.current = true;
    rolling.current = false;
    return () => {};
  }, [showStats]);

  useEffect(() => {
    if (credits === CREDIT_LIMITS) return;
    currPokIndex.current++;

    setPokemon(pokemonList[currPokIndex.current]);

    return () => {};
  }, [credits]);

  useEffect(() => {
    const preLoadImgEffect = () => {
      preLoadImgs(pokemonList.map((pk) => pk.img));
    };
    preLoadImgEffect();
    return () => {};
  }, []);

  const handleInitialization = () => {
    setInited(true);
    setFirstPokemonSeen(true);
  };

  if (firstPokemonSeen) {
    return (
      <CurrentPokemonContext.Provider value={currPokemon}>
        <div className="h-full flex justify-center md:flex-col items-center relative pokecard">
          <motion.div
            animate={{ opacity: [0, 1] }}
            key={`${currPokemon.id}`}
            className="flex flex-col items-center"
          >
            <div className="flex justify-center items-end mb-5 md:mb-10">
              <h1 className="text-center text-3xl text-white  w-auto mr-3 leading-[24px]">
                <PokeStars /> - {currPokemon.name}
              </h1>
              <InfoBadge setShowStats={setShowStats} showStats={showStats} />
            </div>

            <div className=" relative grid grid-cols-1 gap-2 xl:px-20 md:gap-0 md:grid-cols-[1fr,2fr,1fr]">
              <img
                src={currPokemon.img}
                alt={currPokemon.name}
                width={400}
                height={400}
                className="m-auto poke-circle border-solid z-10 px-10 md:px-0 md:col-start-2 md:col-end-3  "
              />
              <PokeStats
                managingStats={managingStats.current}
                rolling={rolling.current}
                currPokemon={currPokemon}
                showStats={showStats}
                setShowStats={setShowStats}
              />
            </div>
          </motion.div>
          <BottomActions usageLimits={`${credits}`} trigger={randomize} />
        </div>
      </CurrentPokemonContext.Provider>
    );
  } else {
    return <HiddenCard showFirstPokemon={handleInitialization} />;
  }
};
