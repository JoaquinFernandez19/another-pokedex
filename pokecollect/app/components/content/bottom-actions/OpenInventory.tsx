import React, { useContext } from 'react';
import { GiChest } from 'react-icons/gi';
import { ActionsContext, AppContext } from '@/app/lib/AppInitialState';
import { OpenPage } from './OpenPage';
import { AppActions } from '@/app/lib/AppReducer';
import { useRouter, usePathname } from 'next/navigation';

export const OpenInventory: React.FC = () => {
  const { state } = useContext(AppContext);
  const { dispatch } = useContext(ActionsContext);
  const router = useRouter();
  const pathname = usePathname();
  const route = '/inventory';

  const goToPageInventory = () => {
    if (state.ownedPokemons.length === 0) return;
    pathname != route ? router.push(route) : router.push('/pokecard');
    if (state.doInitialAnimation) {
      dispatch({ type: AppActions.APP_STARTED, payload: true });
    }
  };

  return (
    <OpenPage
      styling={{
        extra: ` open-inventory ${state.ownedPokemons.length ? 'opacity-1' : 'opacity-50'} flex flex-row`,
        color: '#a52a2a5e',
      }}
      key={'openinventory'}
      onClick={goToPageInventory}
    >
      <GiChest className="pointer-events-none" />
    </OpenPage>
  );
};
