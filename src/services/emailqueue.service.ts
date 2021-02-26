import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';

@Injectable()
export class EmailQueueService {

  constructor(@InjectQueue('email') private emailQueue: Queue) {}
  
  async enqueueEmail(email: string) {
    const job = await this.emailQueue.add({
      email: email,
    });
  }
}
