import { Exclude, Expose, Type } from 'class-transformer';
import { DrawCategoryDto } from '@modules/category/dto/draw-category.dto';

@Exclude()
export class DrawBoardDto {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  visibility: string;

  @Expose()
  @Type(() => DrawCategoryDto)
  categories: DrawCategoryDto[];
}
