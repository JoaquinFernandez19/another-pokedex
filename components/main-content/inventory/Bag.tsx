import React, { useContext } from "react";
import { UserContext } from "../../../pages";

export const Bag: React.FC = () => {
  const { ownedPokemons } = useContext(UserContext);

  return (
    <div className="">
      <p>Bag</p>
      {ownedPokemons.map((pokemon) => {
        return <p>{pokemon.name}</p>;
      })}
    </div>
  );
};
