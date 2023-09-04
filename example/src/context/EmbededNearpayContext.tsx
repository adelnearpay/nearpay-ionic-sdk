import { EmbededNearpay } from '@nearpaydev/nearpay-ionic-sdk';
import React, { useContext, useState } from 'react';

type props = {
  embededNearpay: EmbededNearpay;
  purchase: () => void;
  purchaseThenRefund: () => void;
  purchaseThenReverse: () => void;
  logout: () => void;
  reconcile: () => void;
  proxy_showConnection: () => void;
  proxy_disconnect: () => void;
  results: string;
  setResults: React.Dispatch<React.SetStateAction<string>>;
  getTransactionsList: () => void;
  getTransaction: () => void;
  getReconciliationsList: () => void;
  getReconciliation: () => void;
};

const ctx = React.createContext({} as props);

export function useEmbededNearpay() {
  return useContext(ctx);
}

export default function EmbededNearpayProvider({
  embededNearpay,
  children,
}: {
  children: any;
  embededNearpay: EmbededNearpay;
}) {
  const [results, setResults] = useState('');

  function setText(text: any) {
    setResults(JSON.stringify(text, null, 2));
  }

  async function purchase() {
    const transactionData = await embededNearpay.purchase({
      amount: 1000,
    });

    setText(transactionData);
  }

  async function purchaseThenRefund() {
    const transactionData = await embededNearpay.purchase({
      amount: 1000,
    });

    const uuid = transactionData.receipts?.[0].transaction_uuid;
    if (uuid) {
      const refundTransactionData = embededNearpay.refund({
        amount: 1000,
        originalTransactionUUID: uuid,
      });

      setText(refundTransactionData);
    }
  }

  async function purchaseThenReverse() {
    const transactionData = await embededNearpay.purchase({
      amount: 1000,
    });

    const uuid = transactionData.receipts?.[0].transaction_uuid;
    if (uuid) {
      const refundTransactionData = embededNearpay.reverse({
        originalTransactionUUID: uuid,
      });

      setText(refundTransactionData);
    }
  }
  async function reconcile() {
    const receipt = await embededNearpay.reconcile({});

    setText(receipt);
  }

  function logout() {
    embededNearpay.logout();
  }

  //  =-=--=-=-=-= query -=-=-=-=-=-=-=
  async function getTransactionsList() {
    const banner = await embededNearpay.getTranactionsList({});

    setText(banner);
  }

  async function getTransaction() {
    const transactionData = await embededNearpay.getTranaction({
      transactionUUID: '43a78351-ad02-40f1-a15d-e53b9a379d09',
    });

    setText(transactionData);
  }

  async function getReconciliationsList() {
    const startDate = new Date(Date.UTC(2023, 7, 1));
    const endDate = new Date(Date.now());

    const banner = await embededNearpay.getReconciliationsList({
      endDate,
      limit: 20,
      page: 1,
      startDate,
    });

    setText(banner);
  }

  async function getReconciliation() {
    const transactionData = await embededNearpay.getReconciliation({
      reconciliationUUID: '7d938656-8445-44b6-88a4-4122e8000f5c',
    });

    setText(transactionData);
  }

  function proxy_showConnection() {
    embededNearpay.proxy.showConnection();
  }
  function proxy_disconnect() {
    embededNearpay.proxy.disconnect();
  }

  const values: props = {
    embededNearpay,
    results,
    setResults,
    logout,
    purchase,
    purchaseThenRefund,
    purchaseThenReverse,
    reconcile,
    proxy_showConnection,
    proxy_disconnect,
    getTransactionsList,
    getTransaction,
    getReconciliationsList,
    getReconciliation,
  };
  return <ctx.Provider value={values}>{children}</ctx.Provider>;
}
