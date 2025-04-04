import { Exclude, Expose, Type } from 'class-transformer';
import { DrawBoardDto } from '@modules/board/dto/draw-board.dto';

@Exclude()
export class DrawWorkspaceDTONoBoards {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  shortname: string;
}

@Exclude()
export class DrawWorkspaceDTO {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  shortname: string;

  @Expose()
  @Type(() => DrawBoardDto)
  boards: DrawBoardDto[];
}
