import { Exclude, Expose } from 'class-transformer';
import { Board } from '@/interfaces/workspace';

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
  boards: Board[];
}
