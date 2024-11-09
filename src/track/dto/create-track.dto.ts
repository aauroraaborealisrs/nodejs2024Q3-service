import { IsString, IsInt, IsUUID, IsOptional } from 'class-validator';

export class CreateTrackDto {
  @IsString()
  name: string;

  @IsUUID('4', { message: 'Invalid artistId format' })
  @IsOptional()
  artistId: string | null;

  @IsUUID('4', { message: 'Invalid albumId format' })
  @IsOptional()
  albumId: string | null;

  @IsInt()
  duration: number;
}
