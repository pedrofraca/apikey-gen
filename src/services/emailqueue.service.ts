import { Injectable } from '@nestjs/common';

@Injectable()
export class EmailQueueService {
  enqueueEmail(email: string): string {
    console.log("saving email in the queue for later processing");
    return 'Hello World!';
  }
}
