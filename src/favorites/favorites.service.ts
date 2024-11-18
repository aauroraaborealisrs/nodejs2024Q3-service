import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { validate as isUUID } from 'uuid';

@Injectable()
export class FavoritesService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllFavorites() {
    const favTracks = await this.prisma.favTrack.findMany({
      include: { track: true },
    });
    const favAlbums = await this.prisma.favAlbum.findMany({
      include: { album: true },
    });
    const favArtists = await this.prisma.favArtist.findMany({
      include: { artist: true },
    });

    return {
      tracks: favTracks.map((fav) => fav.track),
      albums: favAlbums.map((fav) => fav.album),
      artists: favArtists.map((fav) => fav.artist),
    };
  }

  async addTrackToFavorites(trackId: string) {
    if (!isUUID(trackId)) {
      throw new HttpException('Invalid trackId format', HttpStatus.BAD_REQUEST);
    }

    const trackExists = await this.prisma.track.findUnique({ where: { id: trackId } });
    if (!trackExists) {
      throw new HttpException('Track not found', HttpStatus.NOT_FOUND);
    }

    const favoriteExists = await this.prisma.favTrack.findUnique({ where: { trackId } });
    if (favoriteExists) {
      return { message: 'Track already in favorites', status: 201 };
    }

    await this.prisma.favTrack.create({ data: { trackId } });
    return { message: 'Track added to favorites', status: 201 };
  }

  async removeTrackFromFavorites(trackId: string) {
    if (!isUUID(trackId)) {
      throw new HttpException('Invalid trackId format', HttpStatus.BAD_REQUEST);
    }

    const favorite = await this.prisma.favTrack.findUnique({ where: { trackId } });
    if (!favorite) {
      throw new HttpException('Track not found in favorites', HttpStatus.NOT_FOUND);
    }

    await this.prisma.favTrack.delete({ where: { trackId } });
    return { message: 'Track removed from favorites', status: 201 };
  }

  async addAlbumToFavorites(albumId: string) {
    if (!isUUID(albumId)) {
      throw new HttpException('Invalid albumId format', HttpStatus.BAD_REQUEST);
    }

    const albumExists = await this.prisma.album.findUnique({ where: { id: albumId } });
    if (!albumExists) {
      throw new HttpException('Album not found', HttpStatus.NOT_FOUND);
    }

    const favoriteExists = await this.prisma.favAlbum.findUnique({ where: { albumId } });
    if (favoriteExists) {
      return { message: 'Album already in favorites', status: 201 };
    }

    await this.prisma.favAlbum.create({ data: { albumId } });
    return { message: 'Album added to favorites', status: 201 };
  }

  async addArtistToFavorites(artistId: string) {
    if (!isUUID(artistId)) {
      throw new HttpException('Invalid artistId format', HttpStatus.BAD_REQUEST);
    }

    const artistExists = await this.prisma.artist.findUnique({ where: { id: artistId } });
    if (!artistExists) {
      throw new HttpException('Artist not found', HttpStatus.NOT_FOUND);
    }

    const favoriteExists = await this.prisma.favArtist.findUnique({ where: { artistId } });
    if (favoriteExists) {
      return { message: 'Artist already in favorites', status: 201 };
    }

    await this.prisma.favArtist.create({ data: { artistId } });
    return { message: 'Artist added to favorites', status: 201 };
  }

  async removeAlbumFromFavorites(albumId: string) {
    if (!isUUID(albumId)) {
      throw new HttpException('Invalid albumId format', HttpStatus.BAD_REQUEST);
    }
  
    const favorite = await this.prisma.favAlbum.findUnique({ where: { albumId } });
    if (!favorite) {
      throw new HttpException('Album not found in favorites', HttpStatus.NOT_FOUND);
    }
  
    await this.prisma.favAlbum.delete({ where: { albumId } });
    return { message: 'Album removed from favorites' };
  }
  
  async removeArtistFromFavorites(artistId: string) {
    if (!isUUID(artistId)) {
      throw new HttpException('Invalid artistId format', HttpStatus.BAD_REQUEST);
    }
  
    const favorite = await this.prisma.favArtist.findUnique({ where: { artistId } });
    if (!favorite) {
      throw new HttpException('Artist not found in favorites', HttpStatus.NOT_FOUND);
    }
  
    await this.prisma.favArtist.delete({ where: { artistId } });
    return { message: 'Artist removed from favorites' };
  }
  
  
}
