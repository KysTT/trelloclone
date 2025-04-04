import { Exclude, Expose, Type } from 'class-transformer';
import { DrawWorkspaceDTO } from '@modules/workspace/dto/draw-workspace.dto';
import { DrawBoardDto } from '@modules/board/dto/draw-board.dto';
import { DrawCardDto } from '@modules/card/dto/draw-card.dto';

@Exclude()
export class DrawUserDto {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  username: string;

  @Expose()
  email: string;

  @Expose()
  @Type(() => DrawWorkspaceDTO)
  workspaces: DrawWorkspaceDTO[];

  @Expose()
  @Type(() => DrawBoardDto)
  boards_member: DrawBoardDto[];

  @Expose()
  @Type(() => DrawCardDto)
  attached_cards: DrawCardDto[];
}
