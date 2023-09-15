import { TransactionDto } from './dto/transaction.dto';

export class TransactionFailedException implements Error {
  message: string;
  name: string;
  reason: any;
  failedTransaction: TransactionDto;
}
export class TransactionFailedExceptionBuilder {
  transactionFailedException: TransactionFailedException;

  constructor() {
    this.transactionFailedException = new TransactionFailedException();
  }
  setMessage(message) {
    this.transactionFailedException.message = message;
    return this;
  }

  setName(name) {
    this.transactionFailedException.name = name;
    return this;
  }

  setReason(reason) {
    this.transactionFailedException.reason = reason;
    return this;
  }

  setFailedTransaction(failedTransaction) {
    this.transactionFailedException.failedTransaction = failedTransaction;
    return this;
  }

  build() {
    return this.transactionFailedException;
  }
}
