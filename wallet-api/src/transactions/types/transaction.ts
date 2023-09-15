import { ApiProperty } from '@nestjs/swagger';

export class Transaction {
  value: number;
  latency: number;
}
