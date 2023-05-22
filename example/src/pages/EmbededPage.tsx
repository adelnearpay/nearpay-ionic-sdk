import {
  IonContent,
  IonGrid,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonRefresher,
  IonRefresherContent,
  IonRow,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import React, { useState } from 'react';
import EmbededNearpayProvider, {
  useEmbededNearpay,
} from '../context/EmbededNearpayContext';
import {
  AuthenticationType,
  EmbededNearpay,
  Environments,
  Locale,
} from '../../../dist/esm';

const nearpay = new EmbededNearpay({
  authtype: AuthenticationType.email,
  authvalue: 'f.alhajeri@nearpay.io',
  environment: Environments.sandbox,
  locale: Locale.default,
});

export default function EmbededPage() {
  return (
    <IonPage id="embeded-page">
      <IonHeader>
        <IonToolbar>
          <IonTitle>Embeded</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <EmbededNearpayProvider embededNearpay={nearpay}>
          <Wrapped />
        </EmbededNearpayProvider>
      </IonContent>
    </IonPage>
  );
}

function Wrapped() {
  const {
    results,
    logout,
    purchase,
    purchaseThenRefund,
    purchaseThenReverse,
    reconcile,
  } = useEmbededNearpay();

  return (
    <>
      <IonGrid>
        {/* buttons */}
        <div>
          <button
            onClick={() => {
              purchase();
            }}
          >
            Purchase
          </button>
        </div>
        <div>
          <button
            onClick={() => {
              purchaseThenRefund();
            }}
          >
            purcahse then refund
          </button>
        </div>
        <div>
          <button
            onClick={() => {
              purchaseThenReverse();
            }}
          >
            purcahse then reverse
          </button>
        </div>
        <div>
          <button
            onClick={() => {
              reconcile();
            }}
          >
            reconcile
          </button>
        </div>
        <div>
          <button
            onClick={() => {
              logout();
            }}
          >
            logout
          </button>
        </div>

        <hr />

        {/* result */}
        <IonRow>{results}</IonRow>
      </IonGrid>
    </>
  );
}
