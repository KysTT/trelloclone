import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class DrawCardDto {
  @Expose()
  id: number;
}
