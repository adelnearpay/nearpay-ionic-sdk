import { EmbededNearpay } from 'ionic-nearpay-sdk';
import React, { useContext, useState } from 'react';

type props = {
  embededNearpay: EmbededNearpay;
  purchase: () => void;
  purchaseThenRefund: () => void;
  purchaseThenReverse: () => void;
  logout: () => void;
  reconcile: () => void;
  results: string;
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

  const values: props = {
    embededNearpay,
    results,
    logout,
    purchase,
    purchaseThenRefund,
    purchaseThenReverse,
    reconcile,
  };
  return <ctx.Provider value={values}>{children}</ctx.Provider>;
}
