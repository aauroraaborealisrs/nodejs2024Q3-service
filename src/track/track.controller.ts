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
  ValidationPipe,
  UsePipes,
} from '@nestjs/common';
import { TrackService } from './track.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { validate as isUUID } from 'uuid';

@Controller('track')
@UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Get()
  public async getAllTracks() {
    return this.trackService.getAllTracks();
  }

  @Get(':id')
  public async getTrackById(@Param('id') id: string) {
    if (!isUUID(id)) {
      throw new HttpException('Invalid trackId format', HttpStatus.BAD_REQUEST);
    }

    return this.trackService.getTrackById(id);
  }

  @Post()
  @HttpCode(201)
  public async createTrack(@Body() createTrackDto: CreateTrackDto) {
    return this.trackService.createTrack(createTrackDto);
  }

  @Put(':id')
  @HttpCode(200)
  public async updateTrack(
    @Param('id') id: string,
    @Body() updateTrackDto: CreateTrackDto,
  ) {
    if (!isUUID(id)) {
      throw new HttpException('Invalid trackId format', HttpStatus.BAD_REQUEST);
    }

    return this.trackService.updateTrack(id, updateTrackDto);
  }

  @Delete(':id')
  @HttpCode(204)
  public async deleteTrack(@Param('id') id: string) {
    if (!isUUID(id)) {
      throw new HttpException('Invalid trackId format', HttpStatus.BAD_REQUEST);
    }

    await this.trackService.deleteTrack(id);
  }
}
