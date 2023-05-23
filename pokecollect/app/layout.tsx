'use client';

import { BackgroundLogo } from './components/layout/BackgroundLogo';
import './globals.scss';
import { ActionsContext, AppContext, AppInitialState } from './lib/AppInitialState';
import { Suspense, useReducer } from 'react';
import { useResizeWindow } from './components/content/Hooks';
import { AppReducer } from './lib/AppReducer';
import { usePathname } from 'next/navigation';
import GoogleLogin from './components/content/login/GoogleLogin';
import { BottomActions } from './components/content/bottom-actions/BottomActions';
import { bublegum } from './lib/app-usage/Lib';
import Loading from './loading';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(AppReducer, AppInitialState);
  useResizeWindow(dispatch);
  const pathname = usePathname();
  const mainPage = pathname == '/';

  return (
    <html lang="en">
      <body>
        <div className={`main ${bublegum.className} `}>
          <ActionsContext.Provider value={{ dispatch }}>
            <AppContext.Provider value={{ state }}>
              <BackgroundLogo />
              <div className={`main-container relative ${!state.clickedInitialPokeBall && 'showing-pokeball'}`}>
                <GoogleLogin />

                <Suspense fallback={<Loading />}>{children}</Suspense>
                {!mainPage && <BottomActions doInitialTransition={state.doInitialAnimation} />}
              </div>
            </AppContext.Provider>
          </ActionsContext.Provider>
        </div>
      </body>
    </html>
  );
}
