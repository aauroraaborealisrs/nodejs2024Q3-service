import { Module } from '@nestjs/common';
import { UserModule } from './users/user.module';
import { ArtistModule } from './artists/artist.module';

@Module({
  imports: [UserModule, ArtistModule],
})
export class AppModule {}
