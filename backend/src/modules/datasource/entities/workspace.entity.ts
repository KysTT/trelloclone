import {
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '@modules/datasource/entities/user.entity';
import { Board } from '@modules/datasource/entities/board.entity';

@Entity('workspace')
export class Workspace {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  shortname: string;

  @ManyToMany(() => User, (user) => user.workspaces, { onDelete: 'CASCADE' })
  users: User[];

  @OneToMany(() => Board, (board) => board.workspace, {
    onDelete: 'CASCADE',
  })
  boards: Board[];
}
