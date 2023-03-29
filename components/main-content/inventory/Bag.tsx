import React, { useContext, useState } from "react";
import { UserContext } from "../../../pages";
import { ToolNumber } from "../tools/ToolNumber";

export const Bag: React.FC = () => {
  const { ownedPokemons } = useContext(UserContext);
  const [showBag, setShowBag] = useState<boolean>(false);
  const handleClickBag = () => {
    setShowBag(!showBag);
  };
  return (
    <div className="relative">
      <button onClick={handleClickBag} className="cursor-pointer relative">
        <img src={"/backpack.png"} className={"w-12"} />
        <ToolNumber
          value={ownedPokemons.length}
          style={"top-[30px] md:top-8 -right-2 md:-left-3"}
        />
      </button>
      {showBag ? (
        <div className="flex flex-col">
          {ownedPokemons.map((pokemon) => {
            return <p>{pokemon.name}</p>;
          })}
        </div>
      ) : (
        ""
      )}
    </div>
  );
};
