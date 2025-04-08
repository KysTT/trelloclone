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

enum VisibilityEnum {
  public = 0,
  workspace = 1,
  private = 2,
  UNRECOGNIZED = -1,
}

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
  visibility: VisibilityEnum;

  @ManyToMany(() => User, (user) => user.boards_member, {
    onDelete: 'CASCADE',
  })
  members: User[];
}
