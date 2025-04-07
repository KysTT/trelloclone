import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Category } from '@/entities/category.entity';
import { Workspace } from '@/entities/workspace.entity';
import { User } from '@/entities/user.entity';

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
