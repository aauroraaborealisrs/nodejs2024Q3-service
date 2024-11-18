import {
  Controller,
  Get,
  Post,
  Delete,
  HttpCode,
  UsePipes,
  ValidationPipe,
  Param,
  BadRequestException,
} from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { isUUID } from 'class-validator';

@Controller('favs')
@UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  public async getAllFavorites() {
    return this.favoritesService.getAllFavorites();
  }

  @Post('track/:id')
  @HttpCode(201)
  public async addTrackToFavorites(@Param('id') id: string) {
    if (!isUUID(id)) {
      throw new BadRequestException('Invalid trackId format');
    }

    return this.favoritesService.addTrackToFavorites(id);
  }

  @Delete('track/:id')
  @HttpCode(204)
  public async removeTrackFromFavorites(@Param('id') id: string) {
    if (!isUUID(id)) {
      throw new BadRequestException('Invalid trackId format');
    }

    await this.favoritesService.removeTrackFromFavorites(id);
  }

  @Post('album/:id')
  @HttpCode(201)
  public async addAlbumToFavorites(@Param('id') id: string) {
    if (!isUUID(id)) {
      throw new BadRequestException('Invalid albumId format');
    }

    return this.favoritesService.addAlbumToFavorites(id);
  }

  @Delete('album/:id')
  @HttpCode(204)
  public async removeAlbumFromFavorites(@Param('id') id: string) {
    if (!isUUID(id)) {
      throw new BadRequestException('Invalid albumId format');
    }

    await this.favoritesService.removeAlbumFromFavorites(id);
  }

  @Post('artist/:id')
  @HttpCode(201)
  public async addArtistToFavorites(@Param('id') id: string) {
    if (!isUUID(id)) {
      throw new BadRequestException('Invalid artistId format');
    }

    return this.favoritesService.addArtistToFavorites(id);
  }

  @Delete('artist/:id')
  @HttpCode(204)
  public async removeArtistFromFavorites(@Param('id') id: string) {
    if (!isUUID(id)) {
      throw new BadRequestException('Invalid artistId format');
    }

    await this.favoritesService.removeArtistFromFavorites(id);
  }
}
