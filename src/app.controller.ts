import { Body, Controller, Param, Post, Res } from '@nestjs/common';
import { EmailQueueService } from './services/emailqueue.service';
import { Response } from 'express';
import { EnqueueEmailDto } from './data/email.dto';
import { TokenVerifier } from './services/tokenverifier.service';

@Controller()
export class AppController {
  constructor(
    private readonly emailQueue: EmailQueueService,
    private readonly tokenVerifier: TokenVerifier,
  ) {}

  @Post('save')
  async saveEmail(@Body() body: EnqueueEmailDto, @Res() response: Response) {
    await this.emailQueue.enqueueEmail(body.email);
    response.status(201).send();
  }

  @Post('verify/:token')
  async verifyToken(@Param('token') token: string, @Res() response: Response) {
    try {
      await this.tokenVerifier.verifyToken(token);
      response.status(200).send();
    } catch {
      response.status(400).send();
    }
  }
}
