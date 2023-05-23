'use client';
import { SignoutIcon } from '@/app/components/content/login/SignoutIcon';
import { AppContext } from '@/app/lib/AppInitialState';
import { useRedirectMainPage } from '@/app/lib/Hooks';
import { getFormattedDate } from '@/app/lib/app-usage/Lib';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import React, { useCallback, useContext, useRef } from 'react';

export const Menu = () => {
  const { state } = useContext(AppContext);

  const router = useRouter();
  //Prevent entering directly to this component
  if (useRedirectMainPage(state)) return <></>;

  // const closePage = useCallback(() => {
  //   router.replace("/pokecard");
  // }, [router]);

  let joinDate = '00';
  if (state.userDataDB) {
    joinDate = getFormattedDate(state.userDataDB.date_started.toDate());
  }

  return (
    <motion.div animate={{ opacity: [0, 1], y: [-300, 0] }}>
      <div>
        <Image src="/trainer-icon-1.png" alt="profile icon image" width={150} height={150} />
      </div>
      <div>
        <div>{state.userDataAuth?.displayName}</div>
        <div>{joinDate}</div>
      </div>
      <div>
        <SignoutIcon />
      </div>
    </motion.div>
  );
};
