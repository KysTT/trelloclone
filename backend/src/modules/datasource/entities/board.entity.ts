import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Category } from '@modules/datasource/entities/category.entity';
import { Workspace } from '@modules/datasource/entities/workspace.entity';
import { User } from '@modules/datasource/entities/user.entity';

@Entity('boards')
export class Board {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => Workspace, (workspace) => workspace.boards, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'workspace_id' })
  workspace: Workspace;

  @OneToMany(() => Category, (category) => category.board)
  categories: Category[];

  @Column()
  visibility: string;

  @ManyToMany(() => User, (user) => user.boards_member, {
    onDelete: 'CASCADE',
  })
  members: User[];
}
