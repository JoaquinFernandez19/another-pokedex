'use client';

import React, { useCallback, useContext, useEffect, useRef } from 'react';
import { AppContext } from '@/app/lib/AppInitialState';
import { motion } from 'framer-motion';
import { BagPokemonList } from './inventory/BagPokemonList';
import { InventoryInfo } from './inventory/InventoryInfo';
import { useRedirectMainPage } from '../lib/Hooks';
import { useRouter } from 'next/navigation';

export default function Inventory() {
  const { state } = useContext(AppContext);
  const router = useRouter();
  //Prevent entering directly to this component
  if (useRedirectMainPage(state)) return <></>;

  // const closePage = useCallback(() => {
  //   router.replace("/pokecard");
  // }, [router]);

  return (
    <motion.div
      animate={{ opacity: [0, 1], y: [-300, 0] }}
      initial={{ opacity: 0, y: -300 }}
      className="inventory relative z-50"
      style={{
        backgroundImage: `url("./${state.isMobile ? 'inventory-m-full' : 'inventory-full'}.png")`,
      }}
    >
      <BagPokemonList pokemonCollection={state.ownedPokemons} />
      <InventoryInfo />
    </motion.div>
  );
}
