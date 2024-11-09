import { Module } from '@nestjs/common';
import { UserModule } from './users/user.module';
import { ArtistModule } from './artists/artist.module';
import { TrackModule } from './track/track.module';

@Module({
  imports: [UserModule, ArtistModule, TrackModule],
})
export class AppModule {}
