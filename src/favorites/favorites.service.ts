import {
  HttpStatus,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { AlbumService } from 'src/album/album.service';
import { ArtistService } from 'src/artists/artist.service';
import { TrackService } from 'src/track/track.service';
import { Album, Artist, Track } from 'src/db/entities';
import { plainToClass } from 'class-transformer';

@Injectable()
export class FavoritesService {
  constructor(
    private readonly trackService: TrackService,
    private readonly albumService: AlbumService,
    private readonly artistService: ArtistService,
  ) {}

  public async getAllFavorites(): Promise<{
    artists: Artist[];
    albums: Album[];
    tracks: Track[];
  }> {
    const artists = (await Artist.find({ where: { favorite: true } })).map(
      (artist) => plainToClass(Artist, artist),
    );
    const albums = (await Album.find({ where: { favorite: true } })).map(
      (album) => plainToClass(Album, album),
    );
    const tracks = (await Track.find({ where: { favorite: true } })).map(
      (track) => plainToClass(Track, track),
    );

    return {
      artists,
      albums,
      tracks,
    };
  }

  public async addTrackToFavorites(
    id: string,
  ): Promise<Record<string, string>> {
    try {
      const track = await this.trackService.getTrackById(id);

      await Track.save({ ...track, favorite: true });

      return { message: 'Track added to favorites' };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new UnprocessableEntityException('Track is unprocessable');
      }
    }
  }

  public async removeTrackFromFavorites(trackId: string): Promise<void> {
    try {
      const track = await this.trackService.getTrackById(trackId);

      await Track.delete({ id: track.id });
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new UnprocessableEntityException('Track is unprocessable');
      }
    }
  }

  public async addAlbumToFavorites(
    id: string,
  ): Promise<Record<string, string>> {
    try {
      const album = await this.albumService.getAlbumById(id);

      await Album.save({ ...album, favorite: true });

      return { message: 'Album added to favorites' };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new UnprocessableEntityException('Album is unprocessable');
      }
    }
  }

  public async removeAlbumFromFavorites(id: string): Promise<void> {
    try {
      const album = await this.albumService.getAlbumById(id);

      await Album.save({ ...album, favorite: false });
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new UnprocessableEntityException('Album is unprocessable');
      }
    }
  }

  public async addArtistToFavorites(
    id: string,
  ): Promise<Record<string, string>> {
    try {
      const artist = await this.artistService.getArtistById(id);

      await Artist.save({ ...artist, favorite: true });

      return { message: 'Artist added to favorites' };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new UnprocessableEntityException('Artist is unprocessable');
      }
    }
  }

  public async removeArtistFromFavorites(id: string): Promise<void> {
    try {
      const artist = await this.artistService.getArtistById(id);

      await Artist.save({ ...artist, favorite: false });
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new UnprocessableEntityException('Artist is unprocessable');
      }
    }
  }
}
