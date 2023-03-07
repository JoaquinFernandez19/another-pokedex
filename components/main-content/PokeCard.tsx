import React, { useEffect, useRef, useState } from "react";
import { preLoadImgs } from "../../utils/Utils";
import { Pokemon } from "../Types";
import { Randomizer } from "./Randomizer";
import { motion } from "framer-motion";
import { HiddenCard } from "./HiddenCard";
const CREDIT_LIMITS = 100;
//Undefined bc at load we dont have data yet
interface PokeCardprops {
  pokemonList: Pokemon[];
}

//
export const PokeCard: React.FC<PokeCardprops> = ({ pokemonList }) => {
  //States and refs
  const [credits, setCredits] = useState<number>(CREDIT_LIMITS);
  const [firstPokemonSeen, setFirstPokemonSeen] = useState<boolean>(false);
  const currPokIndex = useRef<number>(0);
  const [currPokemon, setPokemon] = useState<Pokemon>(pokemonList[currPokIndex.current]);
  const [loading, setLoading] = useState(true);

  //Functions
  const randomize = () => {
    if (credits > 0) setCredits(credits - 1);
  };

  const filterColor = (currPokemon: Pokemon) => {
    let color;
    const type = currPokemon.mainType.type.name;
    switch (type) {
      case "ground":
        color = "brown";
        break;
      case "water":
        color = "blue";
        break;
    }

    return color;
  };

  //Effects
  useEffect(() => {
    if (credits === CREDIT_LIMITS) return;
    currPokIndex.current++;
    setLoading(true);
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

  //Return jsx
  if (firstPokemonSeen) {
    return (
      <div className="relative">
        <motion.div animate={{ opacity: [0, 1] }} key={`${currPokemon.id}`}>
          <h1 className="text-center text-3xl text-white mb-10 pokefont flex justify-center items-center">
            {currPokemon.name}{" "}
            <span
              style={{ backgroundColor: filterColor(currPokemon) }}
              className={` ml-[20px] px-2 text-[17px] leading-4`}
            >
              Info
            </span>
          </h1>
          <div className=" relative">
            <img
              src={currPokemon.img}
              alt={currPokemon.name}
              width={400}
              height={400}
              className={`m-auto`}
              onLoad={() => setLoading(false)}
            />
          </div>
        </motion.div>

        <Randomizer usageLimits={`${credits}`} trigger={randomize} />
      </div>
    );
  } else {
    return <HiddenCard showFirstPokemon={setFirstPokemonSeen} />;
  }
};
