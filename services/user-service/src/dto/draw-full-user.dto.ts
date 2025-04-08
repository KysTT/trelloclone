import { Board, Card, Workspace } from '@/interfaces/user';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class FindFullUserDto {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  username: string;

  @Expose()
  email: string;

  @Expose()
  workspaces: Workspace[];

  @Expose()
  boards_member: Board[];

  @Expose()
  attached_cards: Card[];
}
