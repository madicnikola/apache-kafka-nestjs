import { TransactionDto } from './transactions.dto';

export class TransactionChunkDto {
  get transactions(): TransactionDto[] {
    return this._transactions;
  }

  set transactions(value: TransactionDto[]) {
    this._transactions = value;
  }
  private _transactions: TransactionDto[] = [];
  totalValue: number;
  totalLatency: number;

  getTotalLatency() {
    if (!this.totalLatency)
      this.totalLatency = this._transactions
        .map((transaction) => transaction.latency)
        .reduce((previousValue, currentValue) => previousValue + currentValue);
    return this.totalLatency;
  }
  getTotalValue() {
    if (!this.totalValue)
      this.totalValue = this._transactions
        .map((transaction) => transaction.value)
        .reduce((previousValue, currentValue) => previousValue + currentValue);
    return this.totalValue;
  }

  pushToChunk(transactionDto: TransactionDto) {
    this._transactions.push(transactionDto);
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
