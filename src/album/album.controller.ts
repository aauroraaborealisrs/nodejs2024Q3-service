import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  HttpException,
  HttpStatus,
  HttpCode,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AlbumService } from './album.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { validate as isUUID } from 'uuid';

@Controller('album')
@UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Get()
  async getAllAlbums() {
    return await this.albumService.getAllAlbums();
  }

  @Get(':id')
  async getAlbumById(@Param('id') id: string) {
    if (!isUUID(id)) {
      throw new HttpException('Invalid albumId format', HttpStatus.BAD_REQUEST);
    }

    return await this.albumService.getAlbumById(id);
  }

  @Post()
  @HttpCode(201)
  async createAlbum(@Body() createAlbumDto: CreateAlbumDto) {
    return await this.albumService.createAlbum(createAlbumDto);
  }

  @Put(':id')
  @HttpCode(200)
  async updateAlbum(@Param('id') id: string, @Body() updateAlbumDto: CreateAlbumDto) {
    if (!isUUID(id)) {
      throw new HttpException('Invalid albumId format', HttpStatus.BAD_REQUEST);
    }

    return await this.albumService.updateAlbum(id, updateAlbumDto);
  }

  @Delete(':id')
  @HttpCode(204)
  async deleteAlbum(@Param('id') id: string) {
    if (!isUUID(id)) {
      throw new HttpException('Invalid albumId format', HttpStatus.BAD_REQUEST);
    }

    await this.albumService.deleteAlbum(id);
  }
}
