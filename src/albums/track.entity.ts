import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { AlbumEntity } from './album.entity';

@Entity()
export class TrackEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  duration: number;

  @ManyToOne(() => AlbumEntity, album => album.tracks)
  album: AlbumEntity;
}