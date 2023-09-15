import { Controller } from "@nestjs/common";
import { AppService } from "./app.service";
import { MessagePattern, Payload } from "@nestjs/microservices";
import { TransactionChunk } from "./dto/transaction-chunk";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern('transaction_chunk_initiated')
  async handleTransactionInitiated(@Payload() data: TransactionChunk) {
    console.log(data);

    const { successfulTransactions, failedTransactions } = await this.appService.handleTransactions(
      data
    );

    const message = `Transaction chunk successfully processed! chunkId:#${data.chunkId} transactionsNumber:#${data.transactions.length}`;

    return { res: message, result: { successfulTransactions, failedTransactions } };
  }
}
