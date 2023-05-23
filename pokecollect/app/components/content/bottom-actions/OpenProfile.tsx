import React, { useContext } from 'react';
import { CgProfile } from 'react-icons/cg';

import { OpenPage } from './OpenPage';
import { AppContext, ActionsContext } from '@/app/lib/AppInitialState';
import { AppActions } from '@/app/lib/AppReducer';
import { usePathname, useRouter } from 'next/navigation';

export const OpenProfile = () => {
  const { state } = useContext(AppContext);
  const { dispatch } = useContext(ActionsContext);
  const router = useRouter();
  const pathname = usePathname();
  const route = '/profilemenu';

  const goToPageProfileMenu = () => {
    pathname != route ? router.push(route) : router.push('/pokecard');
    if (state.doInitialAnimation) {
      dispatch({ type: AppActions.APP_STARTED, payload: true });
    }
  };
  return (
    <OpenPage styling={{ extra: 'open-profile', color: '#757575' }} key={'openprofile'} onClick={goToPageProfileMenu}>
      <CgProfile />
    </OpenPage>
  );
};
