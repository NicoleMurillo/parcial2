import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { TrackEntity } from './track.entity';
import { PerformerEntity } from './performer.entity';

@Entity()
export class AlbumEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  cover: string;

  @Column({ type: 'date' })
  releaseDate: Date;

  @Column()
  description: string;

  @OneToMany(() => TrackEntity, track => track.album)
  tracks: TrackEntity[];

  @ManyToMany(() => PerformerEntity, performers => performers.albums, { nullable: true })
  @JoinTable()
  performers: PerformerEntity[];
}
