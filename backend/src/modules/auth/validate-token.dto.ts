import { IsEmail, IsNotEmpty } from 'class-validator';

export class ValidateTokenDto {
  @IsNotEmpty()
  user_id: number;

  @IsNotEmpty()
  @IsEmail()
  email: string;
}
