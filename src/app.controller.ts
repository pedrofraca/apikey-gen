import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common';
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

  @Get('verify/:token')
  async verifyToken(@Param('token') token: string, @Res() response: Response) {
    try {
      const apiKey = await this.tokenVerifier.verifyToken(token);
      response.redirect(`https://tour.silent.ws/key/${apiKey}`)
    } catch {
      response.status(400).send();
    }
  }
}
