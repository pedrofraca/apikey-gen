import { IsEmail } from 'class-validator';

export class EnqueueEmailDto {
  @IsEmail() email: string;
}
