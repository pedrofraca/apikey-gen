import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';

import * as sgMail from '@sendgrid/mail';
import { JwtService } from '@nestjs/jwt';

@Processor('email')
export class EmailQueueConsumer {
  constructor(private readonly jwtService: JwtService) {}
  @Process()
  async transcode(job: Job<unknown>) {
    const data = job.data as any;
    const token = this.jwtService.sign({ api: '' });
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    const msg = {
      to: data.email,
      from: 'api@silent.ws',
      subject: 'Sending with SendGrid is Fun',
      text: 'and easy to do anywhere, even with Node.js',
      html: '<strong>and easy to do anywhere, even with Node.js</strong>',
    };

    sgMail
      .send(msg)
      .catch((error) => {
        console.error(error);
      });
    return {};
  }
}
