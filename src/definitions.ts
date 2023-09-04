import { SessionData, TransactionData } from '@nearpaydev/nearpay-ts-sdk';
import {
  PurchaseError,
  QueryError,
  ReconcileError,
  RefundError,
  ReverseError,
  SessionError,
} from './models/errors';

export enum Environments {
  sandbox = 'sandbox',
  testing = 'testing',
  production = 'production',
}

export enum AuthenticationType {
  login = 'userenter',
  email = 'email',
  mobile = 'mobile',
  jwt = 'jwt',
}

export enum Locale {
  default = 'default',
}

export type EmbededInitializeOptions = {
  authtype: AuthenticationType;
  authvalue: string;
  environment: Environments;
  locale?: Locale;
  networkConfig?: NetworkConfig;
  arabicPaymentText?: string;
  englishPaymentText?: string;
  uiPosition?: UIPosition;
  loadingUi?: boolean;
};

export enum NetworkConfig {
  SIM_ONLY = 'SIM_ONLY',
  SIM_PREFERRED = 'SIM_PREFERRED',
  DEFAULT = 'DEFAULT',
}

export enum UIPosition {
  TOP_START = 'TOP_START',
  TOP_END = 'TOP_END',
  TOP_RIGHT = 'TOP_RIGHT',
  TOP_LEFT = 'TOP_LEFT',
  BOTTOM_START = 'BOTTOM_START',
  BOTTOM_END = 'BOTTOM_END',
  BOTTOM_RIGHT = 'BOTTOM_RIGHT',
  BOTTOM_LEFT = 'BOTTOM_LEFT',
  CENTER_START = 'CENTER_START',
  CENTER_END = 'CENTER_END',
  CENTER_RIGHT = 'CENTER_RIGHT',
  CENTER_LEFT = 'CENTER_LEFT',
  CENTER_TOP = 'CENTER_TOP',
  CENTER_BOTTOM = 'CENTER_BOTTOM',
  CENTER = 'CENTER',
  DEFAULT = 'DEFAULT',
}

export type EmbededPurchaseOptions = {
  amount: number;
  transactionID?: string;
  customerReferenceNumber?: string;
  enableReceiptUi?: boolean;
  enableReversalUi?: boolean;
  enableUiDismiss?: boolean;
  finishTimeout?: number;
};

export type EmbededRefundOptions = {
  amount: number;
  originalTransactionUUID: string;
  transactionID?: string;
  customerReferenceNumber?: string;
  enableReceiptUi?: boolean;
  enableReversalUi?: boolean;
  editableRefundAmountUI?: boolean;
  enableUiDismiss?: boolean;
  finishTimeout?: number;
  adminPin?: string;
};

export type EmbededReconcileOptions = {
  enableReceiptUi?: boolean;
  finishTimeout?: number;
  adminPin?: string;
  enableUiDismiss?: boolean;
};

export type EmbededReverseOptions = {
  originalTransactionUUID: string;
  enableReceiptUi?: boolean;
  finishTimeout?: number;
  enableUiDismiss?: boolean;
};

export type EmbededSessionOptions = {
  sessionID: string;
  enableReceiptUi?: boolean;
  enableReversalUi?: boolean;
  finishTimeout?: number;
  enableUiDismiss?: boolean;
  onSessionOpen?: (receipts: TransactionData) => void;
  onSessionClose?: (session: SessionData) => void;
  onSessionFailed?: (error: SessionError) => void;
};

export type EmbededGetTransactionsListOptions = {
  page?: number;
  limit?: number;
  startDate?: Date;
  endDate?: Date;
};

export type EmbededGetTransactionOptions = {
  transactionUUID: string;
};

export type EmbededGetReconciliationsListOptions = {
  page?: number;
  limit?: number;
  startDate?: Date;
  endDate?: Date;
};

export type EmbededGetReconciliationOptions = {
  reconciliationUUID: string;
};

export type NearpayPluginDefenetions = {
  initialize: (options: EmbededInitializeOptions) => Promise<any>;
  setup: (options: any) => Promise<any>;
  purchase: (options: any) => Promise<any>;
  reverse: (options: any) => Promise<any>;
  refund: (options: any) => Promise<any>;
  reconcile: (options: any) => Promise<any>;
  logout: (options: any) => Promise<any>;
  session: (options: any) => Promise<any>;
  getTransactionsList: (options: any) => Promise<any>;
  getTransaction: (options: any) => Promise<any>;
  getReconciliationsList: (options: any) => Promise<any>;
  getReconciliation: (options: any) => Promise<any>;
  proxyShowConnection: (options: any) => Promise<void>;
  proxyDisconnect: (options: any) => Promise<void>;
};
