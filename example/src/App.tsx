import React, { useRef, useState } from 'react';
import {
  IonApp,
  IonRoute,
  IonRouterOutlet,
  setupIonicReact,
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import EmbededPage from './pages/EmbededPage';
import MainPage from './pages/MainPage';
import RemotePage from './pages/RemotePage';
import { Redirect, Route } from 'react-router';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';
import { EmbededNearpay } from '@nearpaydev/nearpay-ionic-sdk';

// console.log('=-=-=-=-=-=-=-=-==- before');

// const nearpay = new EmbededNearpay({
//   authtype: AuthenticationType.email,
//   authvalue: 'f.alhajeri@nearpay.io',
//   environment: Environments.sandbox,
//   locale: Locale.default,
// });

// console.log('=-=-=-=-=-=-=-=-==- after');

setupIonicReact();

export default function App() {
  const [textArr, setTextArr] = useState<string[]>(['no data yet']);
  const nearpayRef = useRef<EmbededNearpay | null>(null);

  function addText(str: string) {
    setTextArr(old => [...old, str]);
  }

  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          <Route path="/" exact={true}>
            <Redirect to="/home" />
          </Route>
          <Route path="/home" exact={true}>
            {/* <MainPage /> */}
            <EmbededPage />
          </Route>
          {/* <Route path="/embeded">
            <EmbededPage />
          </Route> */}
          {/* <Route path="/remote">
            <RemotePage />
          </Route> */}
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
}
