import { Exclude, Expose, Type } from 'class-transformer';

@Exclude()
export class DrawCardDto {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  description: string;

  @Expose()
  @Type(() => CardActivityDto)
  activity: CardActivityDto[];

  @Expose()
  @Type(() => CardAttachmentsDto)
  attachments: CardAttachmentsDto[];

  @Expose()
  @Type(() => CardChecklistDto)
  checklists: CardChecklistDto[];

  @Expose()
  createdAt: Date;

  @Expose()
  lastEditedAt: Date;

  @Expose()
  dueTo: Date;
}

@Exclude()
class CardActivityDto {
  @Expose()
  id: number;

  @Expose()
  activity: string;
}

@Exclude()
class CardAttachmentsDto {
  @Expose()
  id: number;

  @Expose()
  path: string;
}

@Exclude()
class CardChecklistDto {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  items: CardChecklistItemDto[];
}

@Exclude()
class CardChecklistItemDto {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  done: boolean;
}
