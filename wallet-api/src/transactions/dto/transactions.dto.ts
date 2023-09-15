import {ApiProperty} from '@nestjs/swagger';
import {ValidateNested} from "class-validator";
import {Type} from "class-transformer";

export class TransactionDto {
    @ApiProperty({default: 500})
    value: number;
    @ApiProperty({default: 100})
    latency: number;
}

export class TransactionsDto {
    @ApiProperty({ default: [{ value:500, latency:100}]})
    @Type(() => TransactionDto)
    @ValidateNested({each: true})
    transactions: TransactionDto[];
}
