import { IsString, IsInt, IsUUID, IsOptional } from 'class-validator';

export class CreateAlbumDto {
  @IsString()
  name: string;

  @IsInt()
  year: number;

  @IsUUID('4', { message: 'Invalid albumId format' })
  @IsOptional()
  artistId: string | null;
}
