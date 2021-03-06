import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Queue } from 'bull';

@Injectable()
export class TokenVerifier {
  constructor(private readonly jwtService: JwtService) {}

  async verifyToken(token: string): Promise<string> {
    this.jwtService.verify(token);
    return this.jwtService.sign({ api: '' });
  }
}
