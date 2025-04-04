import { IsNotEmpty, IsString } from 'class-validator';
import { User } from '@modules/datasource/entities/user.entity';

export class CreateWorkspaceDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  shortname: string;

  @IsNotEmpty()
  user: User;
}
