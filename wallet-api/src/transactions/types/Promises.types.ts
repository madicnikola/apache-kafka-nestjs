interface PromiseFulfilledResult<T> {
  status: 'fulfilled';
  value: T;
}

interface PromiseRejectedResult {
  status: 'rejected';
  reason: any;
}

export type PromiseSettledResult<T> = PromiseFulfilledResult<T> | PromiseRejectedResult;

// export type PromiseStatus = 'rejected' | 'fulfilled';

export enum PromiseStatus {
  REJECTED = 'rejected',
  FULFILLED = 'fulfilled',
}
