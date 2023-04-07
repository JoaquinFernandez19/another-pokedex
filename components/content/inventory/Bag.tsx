import React, { useContext, useState } from "react";
import { UserContext } from "../../context/Context";
import { ToolNumber } from "../tools/ToolNumber";
import { BagPokemonList } from "./BagPokemonList";

export const Bag: React.FC = () => {
  const { ownedPokemons } = useContext(UserContext);
  const [showBag, setShowBag] = useState<boolean>(false);
  const handleClickBag = () => {
    setShowBag(!showBag);
  };
  return (
    <div className="relative">
      <button
        onClick={handleClickBag}
        className={`cursor-pointer relative ${
          ownedPokemons.length === 0 ? "grayscale  " : ""
        }`}
      >
        <img src={"/backpack.png"} className={"w-8"} />
        <ToolNumber value={ownedPokemons.length} style={"top-5 -right-3"} />
      </button>
      {showBag ? <BagPokemonList pokemonList={ownedPokemons} /> : ""}
    </div>
  );
};
