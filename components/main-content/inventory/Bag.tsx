import React, { useContext, useState } from "react";
import { UserContext } from "../../../pages";

export const Bag: React.FC = () => {
  const { ownedPokemons } = useContext(UserContext);
  const [showBag, setShowBag] = useState<boolean>(false);
  const handleClickBag = () => {
    setShowBag(!showBag);
  };
  return (
    <div className="relative">
      <button onClick={handleClickBag} className="cursor-pointer">
        Bag
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
