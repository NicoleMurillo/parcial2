import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { AlbumEntity } from './album.entity';

@Entity()
export class PerformerEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  image: string;

  @Column()
  description: string;

  @ManyToMany(() => AlbumEntity, album => album.performers, { nullable: true })
  @JoinTable()
  albums: AlbumEntity[];
}
