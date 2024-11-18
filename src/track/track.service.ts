import { Injectable, NotFoundException } from '@nestjs/common';
import { Track } from 'src/db/entities';
import { CreateTrackDto } from 'src/track/dto';

@Injectable()
export class TrackService {
  public async getAllTracks(): Promise<Track[]> {
    return Track.find({
      relations: {
        album: true,
        artist: true,
      },
    });
  }

  public async getTrackById(id: string): Promise<Track> {
    const track = await Track.findOne({
      where: { id },
      relations: {
        album: true,
        artist: true,
      },
    });

    if (!track) {
      throw new NotFoundException('Track not found');
    }

    return track;
  }

  public async createTrack(dto: CreateTrackDto): Promise<Track> {
    return Track.save({ ...dto });
  }

  public async updateTrack(id: string, dto: CreateTrackDto): Promise<Track> {
    const track = await this.getTrackById(id);

    Object.assign(track, { ...dto });

    return Track.save(track);
  }

  public async deleteTrack(id: string): Promise<boolean> {
    const track = await this.getTrackById(id);

    await Track.delete({ id: track.id });

    return true;
  }
}
