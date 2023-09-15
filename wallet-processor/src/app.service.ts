import { Injectable } from '@nestjs/common';
import { TransactionChunk } from './dto/transaction-chunk';
import { delayFunction } from './util';
import { TransactionFailedException, TransactionFailedExceptionBuilder } from './app.exceptions';
import { Transaction } from './entity/transaction.entity';
import { TransactionDto } from './dto/transaction.dto';

type TransactionProcessingResponse = {
  successfulTransactions: Transaction[];
  failedTransactions: TransactionFailedException[];
};

@Injectable()
export class AppService {
  counter = 1;
  async handleTransactions(data: TransactionChunk): Promise<TransactionProcessingResponse> {
    // business logic
    const { successfulTransactions, failedTransactions } = await this.processTransactions(
      data.transactions
    );

    return { successfulTransactions, failedTransactions };
  }

  private async processTransactions(
    transactions: TransactionDto[]
  ): Promise<TransactionProcessingResponse> {
    const successfulTransactions = [];
    const failedTransactions: TransactionFailedException[] = [];
    await Promise.all(
      transactions.map(async (transaction) => {
        try {
          const executionResult = await this.execute({ ...transaction, id: this.counter++ });
          successfulTransactions.push(executionResult);
        } catch (error) {
          switch (error.constructor) {
            case TransactionFailedException:
              failedTransactions.push(error);
              break;
            default:
              throw error;
          }
        }
      })
    );

    return { successfulTransactions, failedTransactions };
  }

  private async execute(transaction: TransactionDto) {
    try {
      console.log(`...Processing transaction with id: #${transaction.id}`);
      // simulating latency
      await delayFunction(transaction.latency);
      console.log(`done! #${transaction.id}`);

      return transaction;
    } catch (e) {
      throw new TransactionFailedExceptionBuilder()
        .setFailedTransaction(transaction)
        .setMessage(e.message)
        .setName(e.name)
        .setReason(e.reason)
        .build();
    }
  }
}
