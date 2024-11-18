import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateArtistDto } from 'src/artists/dto';
import { Artist } from 'src/db/entities';

@Injectable()
export class ArtistService {
  public async getAllArtists(): Promise<Artist[]> {
    return Artist.find();
  }

  public async getArtistById(id: string): Promise<Artist> {
    const artist = await Artist.findOne({
      where: {
        id,
      },
      relations: {
        albums: true,
        tracks: true,
      },
    });

    if (!artist) {
      throw new NotFoundException('Artist not found');
    }

    return artist;
  }

  public async createArtist(dto: CreateArtistDto): Promise<Artist> {
    return Artist.save({ ...dto });
  }

  public async updateArtist(id: string, dto: CreateArtistDto): Promise<Artist> {
    const artist = await this.getArtistById(id);

    Object.assign(artist, dto);

    return Artist.save(artist);
  }

  public async deleteArtist(id: string): Promise<boolean> {
    const artist = await this.getArtistById(id);

    await Promise.all([
      artist.albums.forEach(async (album) => (album.artistId = null) && await album.save()),
      artist.tracks.forEach(async (track) => (track.artistId = null) && await track.save()),
    ]);

    await artist.remove();

    return true;
  }
}
