import { registerPlugin } from '@capacitor/core';
import {
  NearpayPluginDefenetions,
  EmbededPurchaseOptions,
  EmbededInitializeOptions,
  EmbededRefundOptions,
  EmbededReverseOptions,
  EmbededReconcileOptions,
  EmbededSessionOptions,
  EmbededGetTransactionsListOptions,
  EmbededGetTransactionOptions,
  EmbededGetReconciliationsListOptions,
  EmbededGetReconciliationOptions,
} from '../definitions';
import { ApiResponse } from '../models/ApiResponse';
import {
  ReconciliationRecipt,
  TransactionRecipt,
} from '@nearpaydev/nearpay-ts-sdk';
import {
  PurchaseErrorMap,
  QueryErrorMap,
  ReconcileErrorMap,
  RefundErrorMap,
  ReverseErrorMap,
  SessionErrorMap,
} from '../models/error_status_map';

export class EmbededNearpay {
  private nearpay = registerPlugin<NearpayPluginDefenetions>('NearpayPlugin');
  private savedOptions: EmbededInitializeOptions;
  public proxy = new NearpayProxy(this, this.nearpay);

  constructor(options: EmbededInitializeOptions) {
    this.nearpay.initialize(options);
    this.savedOptions = options;
  }

  async initialize({
    onSuccess,
    onFail,
  }: {
    onSuccess: () => {};
    onFail: () => {};
  }) {
    function callback(response: ApiResponse) {
      if (response.status === 200) {
        onSuccess && onSuccess();
      } else {
        onFail && onFail();
      }
    }

    return await this.callMethod('initialize', this.savedOptions, callback);
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
    const data = {
      amount: amount,
      customer_reference_number: customerReferenceNumber,
      transaction_uuid: transactionUUID,
      enableReceiptUi: enableReceiptUi,
      enableReversal: enableReversalUi,
      finishTimeout: finishTimeout,

      enableUiDismiss: enableUiDismiss,
    };

    function callback(response: ApiResponse) {
      if (response.status === 200) {
        onPurchaseSuccess?.(response.receipts! as TransactionRecipt[]);
      } else {
        onPurchaseFailed?.(PurchaseErrorMap(response));
      }
    }
    return await this.callMethod('purchase', data, callback);
    // return await this.nearpay.purchase(options);
  }
  async refund({
    amount,
    originalTransactionUUID,
    adminPin,
    customerReferenceNumber,
    editableRefundAmountUI,
    enableReceiptUi,
    enableReversalUi,
    enableUiDismiss,
    finishTimeout,
    transactionUUID,
    onRefundFailed,
    onRefundSuccess,
  }: EmbededRefundOptions) {
    const data = {
      amount: amount,
      original_transaction_uuid: originalTransactionUUID,
      customer_reference_number: customerReferenceNumber,
      transaction_uuid: transactionUUID,
      enableReceiptUi: enableReceiptUi,
      enableReversal: enableReversalUi,
      enableEditableRefundAmountUi: editableRefundAmountUI,
      finishTimeout: finishTimeout,
      adminPin: adminPin,
      enableUiDismiss: enableUiDismiss,
    };

    function callback(response: ApiResponse) {
      if (response.status === 200) {
        onRefundSuccess?.(response.receipts! as TransactionRecipt[]);
      } else {
        onRefundFailed?.(RefundErrorMap(response));
      }
    }

    return await this.callMethod('refund', data, callback);
  }

  async reverse({
    originalTransactionUUID,
    enableReceiptUi,
    enableUiDismiss,
    finishTimeout,
    onReverseSuccess,
    onReverseFailed,
  }: EmbededReverseOptions) {
    const data = {
      original_transaction_uuid: originalTransactionUUID,
      enableReceiptUi: enableReceiptUi,
      finishTimeout: finishTimeout,
      enableUiDismiss: enableUiDismiss,
    };
    function callback(response: ApiResponse) {
      if (response.status === 200) {
        onReverseSuccess?.(response.receipts! as TransactionRecipt[]);
      } else {
        onReverseFailed?.(ReverseErrorMap(response));
      }
    }
    return await this.callMethod('reverse', data, callback);
  }

  async reconcile({
    adminPin,
    enableReceiptUi,
    enableUiDismiss,
    finishTimeout,
    onReconcileSuccess,
    onReconcileFailed,
  }: EmbededReconcileOptions) {
    const data = {
      enableReceiptUi: enableReceiptUi,
      finishTimeout: finishTimeout,
      adminPin: adminPin,
      enableUiDismiss: enableUiDismiss,
    };

    function callback(response: ApiResponse) {
      if (response.status === 200) {
        onReconcileSuccess?.(response.receipts! as ReconciliationRecipt[]);
      } else {
        onReconcileFailed?.(ReconcileErrorMap(response));
      }
    }
    return await this.callMethod('reconcile', data, callback);
  }

  async session({
    sessionID,
    enableReceiptUi,
    enableReversalUi,
    enableUiDismiss,
    finishTimeout,
    onSessionClose,
    onSessionFailed,
    onSessionOpen,
  }: EmbededSessionOptions) {
    const data = {
      sessionID: sessionID,
      enableReceiptUi: enableReceiptUi,
      enableReversal: enableReversalUi,
      finishTimeout: finishTimeout,
      enableUiDismiss: enableUiDismiss,
    };

    function callback(response: ApiResponse) {
      if (response.status === 200) {
        onSessionOpen !== undefined &&
          onSessionOpen(response.receipts as TransactionRecipt[]);
      } else if (response.status === 500) {
        onSessionClose !== undefined && onSessionClose(response.session!);
      } else {
        onSessionFailed !== undefined &&
          onSessionFailed(SessionErrorMap(response));
      }
    }
    return await this.callMethod('session', data, callback);
  }
  async logout() {
    return await this.callMethod('logout', {}, () => {});
  }

  async getTranactionsList({
    limit,
    page,
    onResult,
    onFail,
  }: EmbededGetTransactionsListOptions) {
    const data = {
      limit,
      page,
    };

    function callback(response: ApiResponse) {
      if (response.status === 200) {
        onResult !== undefined && onResult(response.result);
      } else {
        onFail !== undefined && onFail(QueryErrorMap(response));
      }
    }
    return await this.callMethod('getTransactions', data, callback);
  }

  async getTranaction({
    transactionUUID,
    onResult,
    onFail,
  }: EmbededGetTransactionOptions) {
    const data = {
      transaction_uuid: transactionUUID,
    };

    function callback(response: ApiResponse) {
      if (response.status === 200) {
        onResult !== undefined && onResult(response.result);
      } else {
        onFail !== undefined && onFail(QueryErrorMap(response));
      }
    }
    return await this.callMethod('getTransaction', data, callback);
  }

  async getReconciliationsList({
    limit,
    page,
    onResult,
    onFail,
  }: EmbededGetReconciliationsListOptions) {
    const data = {
      limit,
      page,
    };

    function callback(response: ApiResponse) {
      if (response.status === 200) {
        onResult !== undefined && onResult(response.result);
      } else {
        onFail !== undefined && onFail(QueryErrorMap(response));
      }
    }
    return await this.callMethod('getReconciliations', data, callback);
  }

  async getReconciliation({
    reconciliationUUID,
    onResult,
    onFail,
  }: EmbededGetReconciliationOptions) {
    const data = {
      reconciliation_uuid: reconciliationUUID,
    };

    function callback(response: ApiResponse) {
      if (response.status === 200) {
        onResult !== undefined && onResult(response.result);
      } else {
        onFail !== undefined && onFail(QueryErrorMap(response));
      }
    }
    return await this.callMethod('getReconciliation', data, callback);
  }

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

class NearpayProxy {
  constructor(
    private embededNearpay: EmbededNearpay,
    private plugin: NearpayPluginDefenetions,
  ) {}

  async showConnection() {
    return await this.callMethod('proxyShowConnection', {}, () => {});
  }

  async disconnect() {
    return await this.callMethod('proxyDisconnect', {}, () => {});
  }

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
    return await this.plugin[name](options, callback);
  }
}
