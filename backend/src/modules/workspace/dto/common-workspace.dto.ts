import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CommonWorkspaceDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  shortname: string;

  @IsNumber()
  id: number;
}
