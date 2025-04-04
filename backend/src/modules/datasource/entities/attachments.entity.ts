import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Card } from '@modules/datasource/entities/card.entity';

@Entity('attachments')
export class Attachments {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Card, (card) => card.attachments)
  @JoinColumn({ name: 'card_id' })
  card: Card;

  @Column()
  path: string;
}
