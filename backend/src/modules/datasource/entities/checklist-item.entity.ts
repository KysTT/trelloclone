import { Checklist } from '@modules/datasource/entities/checklist.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('checklist-item')
export class ChecklistItem {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Checklist, (checklist) => checklist.items)
  @JoinColumn({ name: 'checklist_id' })
  checklist: Checklist;

  @Column()
  name: string;

  @Column()
  done: boolean;
}
