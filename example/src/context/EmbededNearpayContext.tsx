import { EmbededNearpay } from 'ionic-nearpay-sdk';
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

  function purchase() {
    embededNearpay.purchase({
      amount: 1000,
      onPurchaseFailed: setText,
      onPurchaseSuccess: setText,
    });
  }

  function purchaseThenRefund() {
    embededNearpay.purchase({
      amount: 1000,
      onPurchaseSuccess: reciepts => {
        setText(reciepts);
        const uuid = reciepts[0].transaction_uuid;
        if (uuid) {
          embededNearpay.refund({
            amount: 1000,
            originalTransactionUUID: uuid,
            onRefundSuccess: setText,
            onRefundFailed: setText,
          });
        }
      },
      onPurchaseFailed: setText,
    });
  }

  function purchaseThenReverse() {
    embededNearpay.purchase({
      amount: 1000,
      onPurchaseSuccess: reciepts => {
        setText(reciepts);
        const uuid = reciepts[0].transaction_uuid;
        if (uuid) {
          embededNearpay.reverse({
            originalTransactionUUID: uuid,
            onReverseFailed: setText,
            onReverseSuccess: setText,
          });
        }
      },
      onPurchaseFailed: setText,
    });
  }
  function reconcile() {
    embededNearpay.reconcile({
      onReconcileFailed: setText,
      onReconcileSuccess: setText,
    });
  }

  function logout() {
    embededNearpay.logout();
  }

  //  =-=--=-=-=-= query -=-=-=-=-=-=-=
  function getTransactionsList() {
    embededNearpay.getTranactionsList({
      onResult: setText,
      onFail: setText,
    });
  }

  function getTransaction() {
    embededNearpay.getTranaction({
      transactionUUID: 'a2fd6519-2b37-4336-be6d-5520bb3b6427',
      onResult: setText,
      onFail: setText,
    });
  }

  function getReconciliationsList() {
    embededNearpay.getReconciliationsList({
      onResult: setText,
      onFail: setText,
    });
  }

  function getReconciliation() {
    embededNearpay.getReconciliation({
      reconciliationUUID: '6d4a48b8-d194-4aad-92c9-a77606758799',
      onResult: setText,
      onFail: setText,
    });
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
