import { IsUUID } from 'class-validator';

export class AddToFavoritesDto {
  @IsUUID('4', { message: 'Invalid UUID format' })
  id: string;
}
