import { IsString, IsBoolean, IsNotEmpty } from 'class-validator';

export class CreateArtistDto {
  @IsString({ message: 'Name must be a string' })
  @IsNotEmpty()
  name: string;

  @IsBoolean({ message: 'Grammy must be a boolean value' })
  grammy: boolean;
}
