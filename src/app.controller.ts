import { Body, Controller, Post, Res } from '@nestjs/common';
import { EmailQueueService } from './services/emailqueue.service';
import { Response } from 'express';
import { EnqueueEmailDto } from './data/email.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: EmailQueueService) {}

  @Post("save")
  saveEmail(@Body() body: EnqueueEmailDto, @Res() response: Response) {
    this.appService.enqueueEmail(body.email);
    response.status(201).send();
  }
}
