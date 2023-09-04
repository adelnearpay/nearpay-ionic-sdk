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
  PurchaseErrorMap,
  QueryErrorMap,
  ReconcileErrorMap,
  RefundErrorMap,
  ReverseErrorMap,
  SessionErrorMap,
} from '../models/error_status_map';
import {
  ReconciliationBannerList,
  ReconciliationReceipt,
  TransactionBannerList,
  TransactionData,
} from '@nearpaydev/nearpay-ts-sdk';

export class EmbededNearpay {
  private nearpay = registerPlugin<NearpayPluginDefenetions>('NearpayPlugin');
  private savedOptions: EmbededInitializeOptions;
  public proxy = new NearpayProxy(this, this.nearpay);

  constructor(options: EmbededInitializeOptions) {
    this.nearpay.initialize(options);
    this.savedOptions = options;
  }

  async initialize() {
    const data = {
      authtype: this.savedOptions.authtype,
      authvalue: this.savedOptions.authvalue,
      environment: this.savedOptions.environment,
      locale: this.savedOptions.locale,
      network_configuration: this.savedOptions.networkConfig,
      ui_position: this.savedOptions.uiPosition,
      loading_ui: this.savedOptions.loadingUi,
      arabic_payment_text: this.savedOptions.arabicPaymentText,
      english_payment_text: this.savedOptions.englishPaymentText,
    };

    await this.callMethod('initialize', this.savedOptions);
  }

  async purchase({
    amount,
    customerReferenceNumber = '',
    enableReceiptUi = true,
    enableReversalUi = true,
    enableUiDismiss = true,
    finishTimeout = 60,
    transactionID,
  }: EmbededPurchaseOptions): Promise<TransactionData> {
    const data = {
      amount,
      customer_reference_number: customerReferenceNumber,
      finishTimeout,
      enableReversal: enableReversalUi,
      enableReceiptUi: enableReceiptUi,
      enableUiDismiss: enableUiDismiss,
      job_id: transactionID,
    };

    const res = await this.callMethod('purchase', data);
    return res.result;
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
    transactionID,
  }: EmbededRefundOptions): Promise<TransactionData> {
    const data = {
      amount,
      original_transaction_uuid: originalTransactionUUID,
      job_id: transactionID,
      customer_reference_number: customerReferenceNumber,
      finishTimeout,
      enableReversal: enableReversalUi,
      enableReceiptUi: enableReceiptUi,
      enableUiDismiss: enableUiDismiss,
      enableEditableRefundAmountUi: editableRefundAmountUI,
      ...(adminPin !== undefined ? { adminPin } : null),
    };

    const res = await this.callMethod('refund', data);
    return res.result;
  }

  async reverse({
    originalTransactionUUID,
    enableReceiptUi,
    enableUiDismiss,
    finishTimeout,
  }: EmbededReverseOptions): Promise<TransactionData> {
    const data = {
      original_transaction_uuid: originalTransactionUUID,
      finishTimeout,
      enableUiDismiss: enableUiDismiss,
      enableReceiptUi: enableReceiptUi,
    };

    const res = await this.callMethod('reverse', data);
    return res.result;
  }

  async reconcile({
    adminPin,
    enableReceiptUi,
    enableUiDismiss,
    finishTimeout,
  }: EmbededReconcileOptions): Promise<ReconciliationReceipt> {
    const data = {
      finishTimeout,
      enableReceiptUi: enableReceiptUi,
      enableUiDismiss: enableUiDismiss,
      ...(adminPin !== undefined ? { adminPin } : null),
    };

    const res = await this.callMethod('reconcile', data);
    return res.result;
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
  }: EmbededSessionOptions): Promise<void> {
    const data = {
      sessionID,
      finishTimeout,
      enableUiDismiss: enableUiDismiss,
      enableReversal: enableReversalUi,
      enableReceiptUi: enableReceiptUi,
    };

    // TODO: change later
    const res = await this.callMethod('session', data);
    if (res.status === 200) {
      onSessionOpen !== undefined &&
        onSessionOpen(res.receipts as TransactionData);
    } else if (res.status === 500) {
      onSessionClose !== undefined && onSessionClose(res.session!);
    } else {
      onSessionFailed !== undefined && onSessionFailed(SessionErrorMap(res));
    }
  }

  async logout() {
    await this.callMethod('logout', {});
  }

  async getTranactionsList({
    limit,
    page,
    endDate,
    startDate,
  }: EmbededGetTransactionsListOptions): Promise<TransactionBannerList> {
    const data = {
      limit,
      page,
      start_date: startDate?.toISOString(),
      end_date: endDate?.toISOString(),
    };

    const res = await this.callMethod('getTransactionsList', data);
    return res.result;
  }

  async getTranaction({
    transactionUUID,
  }: EmbededGetTransactionOptions): Promise<TransactionData> {
    const data = {
      transaction_uuid: transactionUUID,
    };

    const res = await this.callMethod('getTransaction', data);
    return res.result;
  }

  async getReconciliationsList({
    limit,
    page,
    endDate,
    startDate,
  }: EmbededGetReconciliationsListOptions): Promise<ReconciliationBannerList> {
    const data = {
      limit,
      page,
      start_date: startDate?.toISOString(),
      end_date: endDate?.toISOString(),
    };

    const res = await this.callMethod('getReconciliationsList', data);
    return res.result;
  }

  async getReconciliation({
    reconciliationUUID,
  }: EmbededGetReconciliationOptions): Promise<ReconciliationReceipt> {
    const data = {
      reconciliation_uuid: reconciliationUUID,
    };

    const res = await this.callMethod('getReconciliation', data);
    return res.result;
  }

  private async callMethod(name: keyof NearpayPluginDefenetions, options: any) {
    const res = await this.nearpay[name](options);

    console.log({ res });

    if (res.status >= 200 && res.status < 300) {
      return res;
    } else {
      throw res;
    }
  }
}

class NearpayProxy {
  constructor(
    private embededNearpay: EmbededNearpay,
    private plugin: NearpayPluginDefenetions,
  ) {}

  async showConnection() {
    return await this.callMethod('proxyShowConnection', {});
  }

  async disconnect() {
    return await this.callMethod('proxyDisconnect', {});
  }

  protected async callMethod(
    name: keyof NearpayPluginDefenetions,
    options: any,
  ) {
    const res = await this.plugin[name](options);
    if (res.status >= 200 && res.status < 300) {
      return res;
    } else {
      throw res;
    }
  }
}
