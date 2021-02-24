import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { EmailQueueService } from './services/emailqueue.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [EmailQueueService],
})
export class AppModule {}
