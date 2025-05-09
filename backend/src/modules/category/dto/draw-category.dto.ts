import { Exclude, Expose, Type } from 'class-transformer';
import { DrawCardDto } from '@modules/card/dto/draw-card.dto';

@Exclude()
export class DrawCategoryDto {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  @Type(() => DrawCardDto)
  cards: DrawCardDto[];
}
