'use client';

import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { ActionsContext, AppContext } from '@/app/lib/AppInitialState';
import { AppActions } from '@/app/lib/AppReducer';
import { usePokeBallEvents } from './Hooks';
import { useRouter } from 'next/navigation';
import Image from 'next/dist/client/image';

export const PokeBall: React.FC = () => {
  const { state } = useContext(AppContext);
  const { dispatch } = useContext(ActionsContext);
  const router = useRouter();
  const initialState = {
    openingSate: false,
    hoveringState: false,
    currentEvent: 'shaking',
  };
  const { currentEvent, variants, manageHover, openingState, hoveringState, user, openDelay } =
    usePokeBallEvents(initialState);

  const openPokeBallOnClick = () => {
    if (!user) return;
    openingState.set(true);
    hoveringState.set(false);
    setTimeout(() => {
      dispatch({
        type: AppActions.SET_CLICKED_PKBALL,
        payload: true,
      });
      router.push('/pokecard');
    }, openDelay);
  };

  if (state.clickedInitialPokeBall) return <></>;
  return (
    <motion.div animate={{ opacity: [0, 1] }} className="pokeball">
      <div className="relative">
        <motion.div
          animate={currentEvent}
          variants={variants}
          onHoverStart={() => manageHover(true)}
          onHoverEnd={() => manageHover(false)}
          whileHover={openingState.state ? '' : currentEvent}
          className={`z-10 relative drop-shadow-2xl cursor-pointer w-[250px] md:w-[300px]`}
          onClick={openPokeBallOnClick}
        >
          <Image src={'/pkball.png'} alt="unkown pokemon" width={400} height={400} />
        </motion.div>
      </div>
    </motion.div>
  );
};
