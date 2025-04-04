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
import { Attachments } from '@modules/datasource/entities/attachments.entity';
import { Checklist } from '@modules/datasource/entities/checklist.entity';
import { User } from '@modules/datasource/entities/user.entity';
import { CardActivity } from '@modules/datasource/entities/card-activity.entity';

@Entity('cards')
export class Card {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => Category, (category) => category.cards)
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @Column()
  description: string;

  @OneToMany(() => CardActivity, (cardActivity) => cardActivity.card)
  activity: CardActivity[];

  @OneToMany(() => Attachments, (attachments) => attachments.card)
  attachments: Attachments[];

  @OneToMany(() => Checklist, (checklist) => checklist.card)
  checklists: Checklist[];

  @Column()
  createdAt: Date;

  @Column()
  lastEditedAt: Date;

  @Column()
  dueTo: Date;

  @ManyToMany(() => User, (user) => user.attached_cards)
  attached_users: User[];
}
