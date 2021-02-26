
import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';

@Processor('email')
export class EmailQueueConsumer {
    @Process()
    async transcode(job: Job<unknown>) {
      console.log(job.data);
      return {};
    }
}
