import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Card } from '@modules/datasource/entities/card.entity';
import { ChecklistItem } from '@modules/datasource/entities/checklist-item.entity';

@Entity('checklist')
export class Checklist {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Card, (card) => card.checklists)
  @JoinColumn({ name: 'card_id' })
  card: Card;

  @Column()
  name: string;

  @OneToMany(() => ChecklistItem, (checklistItem) => checklistItem.checklist)
  items: ChecklistItem[];
}
