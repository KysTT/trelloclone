import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Workspace } from '@/entities/workspace.entity';
import { Card } from '@/entities/card.entity';
import { Board } from '@/entities/board.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  name: string;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @ManyToMany(() => Workspace, (workspace) => workspace.users, {
    onDelete: 'CASCADE',
  })
  @JoinTable()
  workspaces: Workspace[];

  @ManyToMany(() => Card, (card) => card.attached_users)
  @JoinTable()
  attached_cards: Card[];

  @ManyToMany(() => Board, (board) => board.members, {
    onDelete: 'CASCADE',
  })
  @JoinTable()
  boards_member: Board[];
}
