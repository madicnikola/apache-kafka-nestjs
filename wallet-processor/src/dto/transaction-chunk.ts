import { TransactionDto } from './transaction.dto';

export class TransactionChunk {
  chunkId: number;
  transactions: TransactionDto[] = [];
  totalValue: number;
  totalLatency: number;

  getTotalLatency() {
    if (!this.totalLatency)
      this.totalLatency = this.transactions
        .map((transaction) => transaction.latency)
        .reduce((previousValue, currentValue) => previousValue + currentValue);
    return this.totalLatency;
  }
  getTotalValue() {
    if (!this.totalValue)
      this.totalValue = this.transactions
        .map((transaction) => transaction.value)
        .reduce((previousValue, currentValue) => previousValue + currentValue);
    return this.totalValue;
  }

  pushToChunk(transactionDto: TransactionDto) {
    this.transactions.push(transactionDto);
    this.totalValue += transactionDto.value;
    this.totalLatency += transactionDto.latency;

    return this;
  }

  setTotalValue(value: number) {
    this.totalValue = value;
    return this;
  }

  setTotalLatency(latency: number) {
    this.totalLatency = latency;
    return this;
  }
}

export class TransactionChunkBuilder {
  private readonly transactionChunk: TransactionChunk;
  constructor() {
    this.transactionChunk = new TransactionChunk();
  }

  public setTotalValue(value: number) {
    this.transactionChunk.totalValue = value;
    return this;
  }
  public setTotalLatency(latency: number) {
    this.transactionChunk.totalLatency = latency;
    return this;
  }
  public setTransactions(transactions: TransactionDto[]) {
    this.transactionChunk.transactions = transactions;
    return this;
  }

  public build() {
    return this.transactionChunk;
  }
}

export class TransactionsDto {
  transactions: TransactionDto[];
}
