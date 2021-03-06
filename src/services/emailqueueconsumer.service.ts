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
    const link = `https://tour.silent.ws/api/email/verify/${token}`
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    
    const msg = {
      to: data.email,
      from: 'api@silent.ws',
      subject: 'Verify your email to active your API Key',
      text: `This is your api key ${token}, follow this link to activate it ${link}.`,
      html: `This is your api key <strong>${token}</strong>, please follow this <a href="${link}">link</a> to activate it.`,
    };

    sgMail
      .send(msg)
      .catch((error) => {
        console.error(error);
      });
    return {};
  }
}
