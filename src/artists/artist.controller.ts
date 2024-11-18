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
import { ArtistService } from './artist.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { isUUID } from 'class-validator';

@Controller('artist')
@UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Get()
  public async getAllArtists() {
    return this.artistService.getAllArtists();
  }

  @Get(':id')
  public async getArtistById(@Param('id') id: string) {
    if (!isUUID(id)) {
      throw new HttpException(
        'Invalid artistId format',
        HttpStatus.BAD_REQUEST,
      );
    }

    return this.artistService.getArtistById(id);
  }

  @Post()
  @HttpCode(201)
  public async createArtist(@Body() createArtistDto: CreateArtistDto) {
    return this.artistService.createArtist(createArtistDto);
  }

  @Put(':id')
  @HttpCode(200)
  public async updateArtist(
    @Param('id') id: string,
    @Body() updateArtistDto: CreateArtistDto,
  ) {
    if (!isUUID(id)) {
      throw new HttpException(
        'Invalid artistId format',
        HttpStatus.BAD_REQUEST,
      );
    }

    return this.artistService.updateArtist(id, updateArtistDto);
  }

  @Delete(':id')
  @HttpCode(204)
  public async deleteArtist(@Param('id') id: string) {
    if (!isUUID(id)) {
      throw new HttpException(
        'Invalid artistId format',
        HttpStatus.BAD_REQUEST,
      );
    }

    return this.artistService.deleteArtist(id);
  }
}
