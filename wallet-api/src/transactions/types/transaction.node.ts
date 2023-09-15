import { ApiProperty } from '@nestjs/swagger';

export class TransactionNode {
  @ApiProperty() private _value: number;
  @ApiProperty() private _latency: number;

  private _next: TransactionNode;

  set value(value: number) {
    this._value = value;
  }

  public get value(): number {
    return this._value;
  }

  set latency(value: number) {
    this._latency = value;
  }

  public get latency(): number {
    return this._latency;
  }

  set next(value: TransactionNode) {
    this._next = value;
  }

  public get next(): TransactionNode {
    return this._next;
  }
}

export class TransactionNodeBuilder {
  private readonly transactionNode: TransactionNode;
  constructor() {
    this.transactionNode = new TransactionNode();
  }

  public setValue(value: number) {
    this.transactionNode.value = value;
    return this;
  }
  public setLatency(latency: number) {
    this.transactionNode.latency = latency;
    return this;
  }
  public setNext(nextNode: TransactionNode) {
    this.transactionNode.next = nextNode;
    return this;
  }

  public build() {
    return this.transactionNode;
  }
}
