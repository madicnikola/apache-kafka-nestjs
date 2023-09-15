import { Inject, Injectable } from "@nestjs/common";
import { ClientKafka } from "@nestjs/microservices";
import { TransactionChunkDto } from "./dto/transaction-chunk.dto";
import { TransactionDto, TransactionsDto } from "./dto/transactions.dto";
import { knapSack } from "./utils";
import { lastValueFrom } from "rxjs";
import { TransactionChunkBuilder, TransactionChunkInitiated } from "./dto/transaction-chunk.initiated";
import { Transaction } from "./types/transaction";
import { timeoutPromise } from "./utils/timeout";
import { TransactionFailedException } from "./exceptions/app.exceptions";
import { PromiseStatus } from "./types/Promises.types";

const indexOfAll = (arr, val) => arr.reduce((acc, el, i) => (val ? [...acc, i] : acc), []);
type TransactionProcessingResponse = {
  successfulTransactions: Transaction[];
  failedTransactions: TransactionFailedException[];
};

export type MicroServiceResponse = {
  res: string;
  transactions: TransactionProcessingResponse;
};

@Injectable()
export class TransactionsService {
  chunks: TransactionChunkDto[];
  MAX_LATENCY = 1000;
  TIMEOUT = 10000;
  private MAX_RETRIES = 3;

  constructor(@Inject('TRANSACTIONS_SERVICE') private client: ClientKafka) {
    this.chunks = [];
  }

  async debit(transactionsDto: TransactionsDto) {
    const { processorResponse, chunks } = await this.sendTransactionsToProcessing(
      transactionsDto.transactions,
    );

    chunks.forEach((value) => {
      console.log(value);
    });

    return processorResponse;
  }

  private async sendTransactionsToProcessing(transactions: Transaction[]) {
    const chunks: TransactionChunkInitiated[] = [];
    const promises: Promise<MicroServiceResponse>[] = [];
    const processorResponse = [];

    const transactionsClone = transactions.slice();
    while (transactionsClone?.length) {
      const chunk = await this.packToChunk(transactionsClone);
      promises.push(this.publish(chunk));
      chunks.push(chunk);
    }
    // await this.awaitProcessingResponse(processorResponse, promises, chunks);

    return { processorResponse, chunks };
  }

  private async awaitProcessingResponse(
    processorResponse: any[],
    promises: Promise<MicroServiceResponse>[],
    chunks: TransactionChunkInitiated[],
    retryCounter = 1,
  ) {
    processorResponse.push(await Promise.allSettled(promises));
    const indexes = indexOfAll(
      processorResponse,
      (promise) => promise.status === PromiseStatus.REJECTED,
    );
    // const failedChunks = chunks.filter((value, index) => indexes.indexOf(index));
    // this.retryFailedChunks(failedChunks, processorResponse, chunks, retryCounter);
  }

  async packToChunk(transactions: TransactionDto[]): Promise<TransactionChunkInitiated> {
    const { values, latencies } = this.filterOutValuesAndLatencies(transactions);

    const selectedIndexes: number[] = knapSack(
      this.MAX_LATENCY,
      latencies,
      values,
      transactions.length,
    );
    const chunk: TransactionDto[] = selectedIndexes.map(
      (value) => transactions.splice(value, 1)[0],
    );

    return new TransactionChunkBuilder().setTransactions(chunk).build();
  }

  private filterOutValuesAndLatencies(transactions: TransactionDto[]) {
    const values = [],
      latencies = [];

    transactions.map((transaction) => {
      values.push(transaction.value);
      latencies.push(transaction.latency);
    });

    return { values, latencies };
  }

  async publish(
    transactionChunkInitiated: TransactionChunkInitiated,
    retryCounter = 0,
  ): Promise<MicroServiceResponse> {
    console.log(JSON.stringify(transactionChunkInitiated));
    const response = lastValueFrom(
      this.client.emit<MicroServiceResponse>(
        'transaction_chunk_initiated',
        JSON.stringify(transactionChunkInitiated),
      ),
    );
    try {
      if (retryCounter < this.MAX_RETRIES) {
        const timeOutPromise = timeoutPromise(this.TIMEOUT);
        await Promise.race([response, timeOutPromise]);
      }
    } catch (e) {
      if (e === 'TIMEOUT!' && retryCounter < this.MAX_RETRIES) {
        return this.publish(transactionChunkInitiated, retryCounter++);
      }
    }

    return response;
  }

  private retryFailedChunks(
    failedChunks: TransactionChunkInitiated[],
    processorResponse,
    retryCounter = 1,
  ) {
    // switch (reason ){
    //   case ...
    //   default
    // }
    if (retryCounter < this.MAX_RETRIES) {
      const promises = failedChunks.map(async (failedChunk) => this.publish(failedChunk));
      this.awaitProcessingResponse(processorResponse, promises, failedChunks, retryCounter++);
    }
  }
}
