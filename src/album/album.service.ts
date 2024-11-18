import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAlbumDto } from 'src/album/dto';
import { Album } from 'src/db/entities';

@Injectable()
export class AlbumService {
  public async getAllAlbums(): Promise<Album[]> {
    return Album.find();
  }

  public async getAlbumById(id: string): Promise<Album> {
    const album = await Album.findOneBy({ id });

    if (!album) {
      throw new NotFoundException('Album not found');
    }

    return album;
  }

  public async createAlbum(dto: CreateAlbumDto): Promise<Album> {
    return Album.save({ ...dto });
  }

  public async updateAlbum(id: string, dto: CreateAlbumDto): Promise<Album> {
    const album = await this.getAlbumById(id);

    Object.assign(album, dto);

    return Album.save(album);
  }

  public async deleteAlbum(id: string): Promise<boolean> {
    const album = await this.getAlbumById(id);

    await Album.delete({ id: album.id });

    return true;
  }
}
