import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { EmailQueueService } from './services/emailqueue.service';
import { EmailQueueConsumer } from './services/emailqueueconsumer.service';

@Module({
  imports: [BullModule.forRoot({
    redis: {
      host: 'localhost',
      port: 6379,
    },
  }), 
  BullModule.registerQueue({
    name: 'email',
  })],
  controllers: [AppController],
  providers: [EmailQueueService, EmailQueueConsumer],
})
export class AppModule {}

