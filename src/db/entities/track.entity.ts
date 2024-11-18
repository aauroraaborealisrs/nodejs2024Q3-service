import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  BaseEntity,
} from 'typeorm';
import { Album } from './album.entity';
import { Artist } from './artist.entity';
import { Exclude } from 'class-transformer';

@Entity()
export class Track extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  duration: number;

  @Exclude()
  @Column({ default: false})
  favorite: boolean;

  @Column({ name: 'album_id' })
  albumId: string;

  @ManyToOne(() => Album, (album) => album.tracks, { nullable: true })
  @JoinColumn({ name: 'album_id' })
  album: Album;

  @Column({ name: 'artist_id' })
  artistId: string;

  @ManyToOne(() => Artist, (artist) => artist.tracks, { nullable: true })
  @JoinColumn({ name: 'artist_id' })
  artist: Artist;
}
