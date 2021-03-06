import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AppController } from './app.controller';
import { EmailQueueService } from './services/emailqueue.service';
import { EmailQueueConsumer } from './services/emailqueueconsumer.service';
import { TokenVerifier } from './services/tokenverifier.service';

@Module({
  imports: [
    BullModule.forRoot({
      redis: {
        host: process.env.REDIS,
        port: 6379,
      },
    }),
    BullModule.registerQueue({
      name: 'email',
    }),
    JwtModule.register({ secret: `${process.env.SECRET}` }),
  ],
  controllers: [AppController],
  providers: [EmailQueueService, EmailQueueConsumer, TokenVerifier],
})
export class AppModule {}
