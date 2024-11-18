import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  BaseEntity,
} from 'typeorm';
import { Artist } from './artist.entity';
import { Track } from './track.entity';
import { Exclude } from 'class-transformer';

@Entity()
export class Album extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  year: number;

  @Exclude()
  @Column({ default: false })
  favorite: boolean;

  @Column({ name: 'artist_id' })
  artistId: string;

  @ManyToOne(() => Artist, (artist) => artist.albums, { nullable: true })
  @JoinColumn({ name: 'artist_id' })
  artist: Artist;

  @OneToMany(() => Track, (track) => track.album)
  tracks: Track[];
}
