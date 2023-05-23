import { usePathname, useRouter } from 'next/navigation';
import { useCallback, useContext, useEffect, useRef } from 'react';
import { AppState } from './AppReducer';
import { AppContext } from './AppInitialState';

export const useRedirectMainPage = (state: AppState): boolean => {
  const router = useRouter();
  const pathname = usePathname();
  const mainPage = pathname === '/';
  useEffect(() => {
    if (!mainPage && !state.clickedInitialPokeBall) router.replace('/');
  }, []);

  return !state.clickedInitialPokeBall;
};
