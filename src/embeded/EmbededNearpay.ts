import { registerPlugin } from '@capacitor/core';
import {
  NearpayPluginDefenetions,
  EmbededPurchaseOptions,
  InitializeOptions,
  EmbededRefundOptions,
  EmbededReverseOptions,
  EmbededReconcileOptions,
  EmbededSessionOptions,
} from '../definitions';
import { ApiResponse } from '../models/ApiResponse';
import {
  ReconciliationRecipt,
  TransactionRecipt,
} from '@nearpaydev/nearpay-ts-sdk';
import {
  PurchaseErrorMap,
  ReconcileErrorMap,
  RefundErrorMap,
  ReverseErrorMap,
  SessionErrorMap,
} from '../models/error_status_map';

export class EmbededNearpay {
  private nearpay = registerPlugin<NearpayPluginDefenetions>('NearpayPlugin');

  constructor(options: InitializeOptions) {
    this.nearpay.initialize(options);
  }

  async purchase({
    amount,
    customerReferenceNumber = '',
    enableReceiptUi = true,
    enableReversalUi = true,
    enableUiDismiss = true,
    finishTimeout = 60,
    transactionUUID,
    onPurchaseFailed,
    onPurchaseSuccess,
  }: EmbededPurchaseOptions) {
    // console.log(1);

    // const { onPurchaseFailed, onPurchaseSuccess, ...optionsToPass } = options;
    // console.log({ optionsToPass });
    function callback(response: ApiResponse) {
      if (response.status === 200) {
        onPurchaseSuccess?.(response.receipts! as TransactionRecipt[]);
      } else {
        onPurchaseFailed?.(PurchaseErrorMap(response));
      }
    }
    return await this.callMethod(
      'purchase',
      {
        amount,
        customerReferenceNumber,
        enableReceiptUi,
        enableReversalUi,
        enableUiDismiss,
        finishTimeout,
        transactionUUID,
      },
      callback,
    );
    // return await this.nearpay.purchase(options);
  }
  // async refund(options: EmbededRefundOptions) {
  //   const { onRefundFailed, onRefundSuccess, ...optionsToPass } = options;
  //   function callback(response: ApiResponse) {
  //     if (response.status === 200) {
  //       onRefundSuccess?.(response.receipts! as TransactionRecipt[]);
  //     } else {
  //       onRefundFailed?.(RefundErrorMap(response));
  //     }
  //   }
  //   return await this.callMethod('refund', optionsToPass, callback);
  // }
  // async reverse(options: EmbededReverseOptions) {
  //   const { onReverseSuccess, onReverseFailed, ...optionsToPass } = options;
  //   function callback(response: ApiResponse) {
  //     if (response.status === 200) {
  //       onReverseSuccess?.(response.receipts! as TransactionRecipt[]);
  //     } else {
  //       onReverseFailed?.(ReverseErrorMap(response));
  //     }
  //   }
  //   return await this.callMethod('reverse', optionsToPass, callback);
  // }
  // async reconcile(options: EmbededReconcileOptions) {
  //   const { onReconcileSuccess, onReconcileFailed, ...optionsToPass } = options;
  //   function callback(response: ApiResponse) {
  //     if (response.status === 200) {
  //       onReconcileSuccess?.(response.receipts! as ReconciliationRecipt[]);
  //     } else {
  //       onReconcileFailed?.(ReconcileErrorMap(response));
  //     }
  //   }
  //   return await this.callMethod('reconcile', optionsToPass, callback);
  // }
  // async session(options: EmbededSessionOptions) {
  //   const { onSessionClose, onSessionFailed, onSessionOpen, ...optionsToPass } =
  //     options;
  //   function callback(response: ApiResponse) {
  //     if (response.status === 200) {
  //       onSessionOpen !== undefined &&
  //         onSessionOpen(response.receipts as TransactionRecipt[]);
  //     } else if (response.status === 500) {
  //       onSessionClose !== undefined && onSessionClose(response.session!);
  //     } else {
  //       onSessionFailed !== undefined &&
  //         onSessionFailed(SessionErrorMap(response));
  //     }
  //   }
  //   return await this.callMethod('reconcile', optionsToPass, callback);
  // }
  // async logout() {
  //   // const { onReconcileSuccess, onReconcileFailed, ...optionsToPass } = options;
  //   // function callback(response: ApiResponse) {
  //   //   if (response.status === 200) {
  //   //     onReconcileSuccess?.(response.receipts! as ReconciliationRecipt[]);
  //   //   } else {
  //   //     onReconcileFailed?.(ReconcileErrorMap(response));
  //   //   }
  //   // }
  //   return await this.callMethod('reconcile', {}, () => {});
  // }
  // // async test(options: { xxx: string }, callback: (str: string) => void) {
  // //   return await this.nearpay.test(options, callback);
  // // }

  private async callMethod(
    name: keyof NearpayPluginDefenetions,
    options: any,
    callback: (response: ApiResponse) => void,
  ) {
    console.log({
      name,
      options,
      callback,
    });
    return await this.nearpay[name](options, callback);
  }
}
