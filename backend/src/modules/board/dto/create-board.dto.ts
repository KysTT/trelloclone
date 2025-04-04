import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateBoardDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNumber()
  workspaceId: number;

  @IsNumber()
  userId: number;

  @IsNotEmpty()
  @IsString()
  visibility: string;
}
