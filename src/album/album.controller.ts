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
  NotFoundException,
} from '@nestjs/common';
import { AlbumService } from './album.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { validate as isUUID } from 'uuid';

@Controller('album')
@UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Get()
  public async getAllAlbums() {
    return this.albumService.getAllAlbums();
  }

  @Get(':id')
  public async getAlbumById(@Param('id') id: string) {
    if (!isUUID(id)) {
      throw new HttpException('Invalid albumId format', HttpStatus.BAD_REQUEST);
    }

    const album = this.albumService.getAlbumById(id);
    if (!album) {
      throw new NotFoundException('Album not found');
    }

    return album;
  }

  @Post()
  @HttpCode(201)
  public async createAlbum(@Body() createAlbumDto: CreateAlbumDto) {
    return this.albumService.createAlbum(createAlbumDto);
  }

  @Put(':id')
  @HttpCode(200)
  public async updateAlbum(
    @Param('id') id: string,
    @Body() updateAlbumDto: CreateAlbumDto,
  ) {
    if (!isUUID(id)) {
      throw new HttpException('Invalid albumId format', HttpStatus.BAD_REQUEST);
    }

    return this.albumService.updateAlbum(id, updateAlbumDto);
  }

  @Delete(':id')
  @HttpCode(204)
  public async deleteAlbum(@Param('id') id: string) {
    if (!isUUID(id)) {
      throw new HttpException('Invalid albumId format', HttpStatus.BAD_REQUEST);
    }

    return this.albumService.deleteAlbum(id);
  }
}
