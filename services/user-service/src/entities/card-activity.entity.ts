import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Card } from '@/entities/card.entity';

@Entity('card-activity')
export class CardActivity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Card, (card) => card.activity)
  @JoinColumn({ name: 'card_id' })
  card: Card;

  @Column()
  activity: string;
}
