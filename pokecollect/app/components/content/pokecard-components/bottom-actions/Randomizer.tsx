"use client";

import React, { Dispatch, SetStateAction, useContext, useEffect } from "react";
import { ToolNumber } from "../../tools/ToolNumber";

import { Button } from "./Button";
import { syncUserInfoWithDB } from "../../db/UserCredits";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../login/Firebase";
import { CurrentPokemonContext } from "../../PokeCard";
interface RandomizerProps {
  randomize: Dispatch<SetStateAction<number>>;
  usageLimits: string;
}

export const Randomizer: React.FC<RandomizerProps> = ({
  randomize,
  usageLimits,
}) => {
  const [user] = useAuthState(auth);
  const currPokemon = useContext(CurrentPokemonContext);
  const handleOnClick = () => {
    const innnerCredits = Number(usageLimits);

    if (innnerCredits > 0) {
      randomize(innnerCredits - 1);
    }
    const checkForNoCredits = async () => {
      if (user && innnerCredits < 6 && innnerCredits > 0) {
        await syncUserInfoWithDB(user.uid, innnerCredits - 1, currPokemon);
      }
    };
    checkForNoCredits();
  };

  return (
    <Button
      text={"Next"}
      onClick={handleOnClick}
      extraStyles={" bg-slate-500"}
      color={undefined}
    >
      <ToolNumber
        value={Number(usageLimits)}
        style={"bottom-[30px] md:bottom-[24.5px] -left-2 md:-right-2"}
      />
    </Button>
  );
};
