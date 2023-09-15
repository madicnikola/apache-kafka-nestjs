import { Body, Controller, Post } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { ApiOperation } from '@nestjs/swagger';
import { TransactionsDto } from './dto/transactions.dto';

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @ApiOperation({
    summary: 'Initiates a debit transaction',
  })
  @Post('wallet/debit')
  async initiateDebitTransaction(@Body() transactionsDto: TransactionsDto): Promise<string[]> {
    return this.transactionsService.debit(transactionsDto);
  }
}
