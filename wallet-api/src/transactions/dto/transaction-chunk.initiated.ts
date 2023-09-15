import { TransactionDto } from './transactions.dto';

export class TransactionChunkInitiated {
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

  getChunkId() {
    return this.chunkId;
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

  setChunkId(id: number) {
    this.chunkId = id;
    return this;
  }
}

export class TransactionChunkBuilder {
  private readonly transactionChunk: TransactionChunkInitiated;
  constructor() {
    this.transactionChunk = new TransactionChunkInitiated();
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

  setChunkId(id: number) {
    this.transactionChunk.chunkId = id;
    return this;
  }

  public build() {
    return this.transactionChunk;
  }
}
