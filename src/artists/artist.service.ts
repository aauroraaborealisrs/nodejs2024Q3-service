import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CreateArtistDto } from './dto/create-artist.dto';
import { Artist } from 'src/models/artist.interface';

@Injectable()
export class ArtistService {
  private artists: Artist[] = [];

  getAllArtists(): Artist[] {
    return this.artists;
  }

  getArtistById(id: string): Artist | undefined {
    return this.artists.find(artist => artist.id === id);
  }

  createArtist(createArtistDto: CreateArtistDto): Artist {
    const newArtist: Artist = {
      id: uuidv4(),
      ...createArtistDto,
    };
    this.artists.push(newArtist);
    return newArtist;
  }

  updateArtist(id: string, updateArtistDto: CreateArtistDto): Artist | null {
    const artist = this.getArtistById(id);
    if (!artist) return null;

    artist.name = updateArtistDto.name;
    artist.grammy = updateArtistDto.grammy;
    return artist;
  }

  deleteArtist(id: string): boolean {
    const index = this.artists.findIndex(artist => artist.id === id);
    if (index === -1) return false;

    this.artists.splice(index, 1);
    return true;
  }
}
