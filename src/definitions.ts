import {
  ReconciliationRecipt,
  TransactionRecipt,
} from '@nearpaydev/nearpay-ts-sdk';
import {
  PurchaseError,
  ReconcileError,
  RefundError,
  ReverseError,
  SessionError,
} from './models/errors';
import { SessionType } from './models/Session';

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
  locale?: Locale;
  environment: Environments;
};

export type EmbededPurchaseOptions = {
  amount: number;
  transactionUUID?: string;
  customerReferenceNumber?: string;
  enableReceiptUi?: boolean;
  enableReversalUi?: boolean;
  enableUiDismiss?: boolean;
  finishTimeout?: number;
  onPurchaseSuccess?: (receipts: TransactionRecipt[]) => void;
  onPurchaseFailed?: (error: PurchaseError) => void;
};

export type EmbededRefundOptions = {
  amount: number;
  originalTransactionUUID: string;
  transactionUUID?: string;
  customerReferenceNumber?: string;
  enableReceiptUi?: boolean;
  enableReversalUi?: boolean;
  editableRefundAmountUI?: boolean;
  enableUiDismiss?: boolean;
  finishTimeout?: number;
  adminPin?: string;
  onRefundSuccess?: (receipts: TransactionRecipt[]) => void;
  onRefundFailed?: (error: RefundError) => void;
};

export type EmbededReconcileOptions = {
  enableReceiptUi?: boolean;
  finishTimeout?: number;
  adminPin?: string;
  enableUiDismiss?: boolean;
  onReconcileSuccess?: (receipts: ReconciliationRecipt[]) => void;
  onReconcileFailed?: (error: ReconcileError) => void;
};

export type EmbededReverseOptions = {
  originalTransactionUUID: string;
  enableReceiptUi?: boolean;
  finishTimeout?: number;
  enableUiDismiss?: boolean;
  onReverseSuccess?: (receipts: TransactionRecipt[]) => void;
  onReverseFailed?: (error: ReverseError) => void;
};

export type EmbededSessionOptions = {
  sessionID: string;
  enableReceiptUi?: boolean;
  enableReversalUi?: boolean;
  finishTimeout?: number;
  enableUiDismiss?: boolean;
  onSessionOpen?: (receipts: TransactionRecipt[]) => void;
  onSessionClose?: (session: SessionType) => void;
  onSessionFailed?: (error: SessionError) => void;
};

export type NearpayPluginDefenetions = {
  initialize: (options: EmbededInitializeOptions) => Promise<any>;
  setup: (options: any, callback: any) => Promise<any>;
  purchase: (options: any, callback: any) => Promise<any>;
  reverse: (options: any, callback: any) => Promise<any>;
  refund: (options: any, callback: any) => Promise<any>;
  reconcile: (options: any, callback: any) => Promise<any>;
  logout: (options: any, callback: any) => Promise<any>;
  session: (options: any, callback: any) => Promise<any>;
  proxyShowConnection: (options: any, callback: any) => Promise<void>;
  proxyDisconnect: (options: any, callback: any) => Promise<void>;
};
