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
} from '@nearpaydev/nearpay-ionic-sdk';

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
    proxy_disconnect,
    proxy_showConnection,
    getReconciliation,
    getReconciliationsList,
    getTransaction,
    getTransactionsList,
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

        <h3>Query functions</h3>
        <div>
          <button
            onClick={() => {
              getTransactionsList();
            }}
          >
            get transactions list
          </button>
        </div>
        <div>
          <button
            onClick={() => {
              getTransaction();
            }}
          >
            get transaction{' '}
          </button>
        </div>
        <div>
          <button
            onClick={() => {
              getReconciliationsList();
            }}
          >
            get reconciliations list
          </button>
        </div>
        <div>
          <button
            onClick={() => {
              getReconciliation();
            }}
          >
            get reconciliation
          </button>
        </div>

        <hr />

        <h3>Proxy functions</h3>
        <div>
          <button
            onClick={() => {
              proxy_showConnection();
            }}
          >
            proxy/ show connection
          </button>
        </div>
        <div>
          <button
            onClick={() => {
              proxy_disconnect();
            }}
          >
            proxy/ disconnect
          </button>
        </div>

        <hr />

        {/* result */}
        <IonRow>{results}</IonRow>
      </IonGrid>
    </>
  );
}
