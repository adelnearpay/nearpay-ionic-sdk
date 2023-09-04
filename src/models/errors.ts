// ------------------------------------------
// --------------- Purchase -----------------
// ------------------------------------------

import { TransactionData } from '@nearpaydev/nearpay-ts-sdk';

export enum PURCHASE_ERROR_ENUM {
  DECLIEND = 'purchase-decliend',
  REJECTED = 'purchase-rejected',
  AUTH_FAILED = 'purchase-auth-failed',
  INVALID_STATUS = 'purchase-invalid-status',
  GENERAL_ERROR = 'purchase-general-error',
}

export type PurchaseDecielnd = {
  type: PURCHASE_ERROR_ENUM.DECLIEND;
  reciepts: TransactionData;
};

export type PurchaseRejected = {
  type: PURCHASE_ERROR_ENUM.REJECTED;
  message: string;
};

export type PurchaseAuthFailed = {
  type: PURCHASE_ERROR_ENUM.AUTH_FAILED;
  message: string;
};

export type PurchaseInvalidStatus = {
  type: PURCHASE_ERROR_ENUM.INVALID_STATUS;
};

export type PurchaseGeneralError = {
  type: PURCHASE_ERROR_ENUM.GENERAL_ERROR;
};

export type PurchaseError =
  | PurchaseDecielnd
  | PurchaseRejected
  | PurchaseAuthFailed
  | PurchaseInvalidStatus
  | PurchaseGeneralError;

// ------------------------------------------
// ----------------- Refund -----------------
// ------------------------------------------

export enum REFUND_ERROR_ENUM {
  DECLIEND = 'refund-decliend',
  REJECTED = 'refund-rejected',
  AUTH_FAILED = 'refund-auth-failed',
  INVALID_STATUS = 'refund-invalid-status',
  GENERAL_ERROR = 'refund-general-error',
}

export type RefundDecielnd = {
  type: REFUND_ERROR_ENUM.DECLIEND;
  reciepts: TransactionData;
};

export type RefundRejected = {
  type: REFUND_ERROR_ENUM.REJECTED;
  message: string;
};

export type RefundAuthFailed = {
  type: REFUND_ERROR_ENUM.AUTH_FAILED;
  message: string;
};

export type RefundInvalidStatus = {
  type: REFUND_ERROR_ENUM.INVALID_STATUS;
};
export type RefundGeneralError = {
  type: REFUND_ERROR_ENUM.GENERAL_ERROR;
};

export type RefundError =
  | RefundDecielnd
  | RefundRejected
  | RefundAuthFailed
  | RefundInvalidStatus
  | RefundGeneralError;

// ------------------------------------------
// ----------------- Reverse -----------------
// ------------------------------------------

export enum REVERSE_ERROR_ENUM {
  FAILURE_MESSAGE = 'Reverse-failure-message',
  AUTH_FAILED = 'Reverse-auth-failed',
  INVALID_STATUS = 'Reverse-invalid-status',
  GENERAL_ERROR = 'reverse-general-error',
}

export type ReverseFailureMessage = {
  type: REVERSE_ERROR_ENUM.FAILURE_MESSAGE;
  message: string;
};

export type ReverseAuthFailed = {
  type: REVERSE_ERROR_ENUM.AUTH_FAILED;
  message: string;
};

export type ReverseInvalidStatus = {
  type: REVERSE_ERROR_ENUM.INVALID_STATUS;
};
export type ReverseGeneralError = {
  type: REVERSE_ERROR_ENUM.GENERAL_ERROR;
};

export type ReverseError =
  | ReverseFailureMessage
  | ReverseAuthFailed
  | ReverseInvalidStatus
  | ReverseGeneralError;

// ------------------------------------------
// ----------------- Reconcile -----------------
// ------------------------------------------

export enum RECONCILE_ERROR_ENUM {
  FAILURE_MESSAGE = 'Reconcile-failure-message',
  AUTH_FAILED = 'Reconcile-auth-failed',
  INVALID_STATUS = 'Reconcile-invalid-status',
  GENERAL_ERROR = 'Reconcile-general-error',
}

export type ReconcileFailureMessage = {
  type: RECONCILE_ERROR_ENUM.FAILURE_MESSAGE;
  message: string;
};

export type ReconcileAuthFailed = {
  type: RECONCILE_ERROR_ENUM.AUTH_FAILED;
  message: string;
};

export type ReconcileInvalidStatus = {
  type: RECONCILE_ERROR_ENUM.INVALID_STATUS;
};
export type ReconcileGeneralError = {
  type: RECONCILE_ERROR_ENUM.GENERAL_ERROR;
};

export type ReconcileError =
  | ReconcileFailureMessage
  | ReconcileAuthFailed
  | ReconcileInvalidStatus
  | ReconcileGeneralError;

// ------------------------------------------
// ----------------- Session -----------------
// ------------------------------------------

export enum SESSION_ERROR_ENUM {
  FAILURE_MESSAGE = 'Session-failure-message',
  AUTH_FAILED = 'Session-auth-failed',
  INVALID_STATUS = 'Session-invalid-status',
  GENERAL_ERROR = 'Session-general-error',
}

export type SessionFailureMessage = {
  type: SESSION_ERROR_ENUM.FAILURE_MESSAGE;
  message: string;
};

export type SessionAuthFailed = {
  type: SESSION_ERROR_ENUM.AUTH_FAILED;
  message: string;
};

export type SessionInvalidStatus = {
  type: SESSION_ERROR_ENUM.INVALID_STATUS;
};
export type SessionGeneralError = {
  type: SESSION_ERROR_ENUM.GENERAL_ERROR;
};

export type SessionError =
  | SessionFailureMessage
  | SessionAuthFailed
  | SessionInvalidStatus
  | SessionGeneralError;

// ------------------------------------------
// ----------------- query ------------------
// ------------------------------------------

export enum QUERY_ERROR_ENUM {
  FAILURE_MESSAGE = 'query-failure-message',
  AUTH_FAILED = 'query-auth-failed',
  INVALID_STATUS = 'query-invalid-status',
  GENERAL_ERROR = 'query-general-error',
}

export type QueryFailureMessage = {
  type: QUERY_ERROR_ENUM.FAILURE_MESSAGE;
  message: string;
};

export type QueryAuthFailed = {
  type: QUERY_ERROR_ENUM.AUTH_FAILED;
  message: string;
};

export type QueryInvalidStatus = {
  type: QUERY_ERROR_ENUM.INVALID_STATUS;
};
export type QueryGeneralError = {
  type: QUERY_ERROR_ENUM.GENERAL_ERROR;
};

export type QueryError =
  | QueryFailureMessage
  | QueryAuthFailed
  | QueryInvalidStatus
  | QueryGeneralError;
