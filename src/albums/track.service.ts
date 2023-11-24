import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TrackEntity } from './track.entity';
import { AlbumEntity } from './album.entity';

@Injectable()
export class TrackService {
  constructor(
    @InjectRepository(TrackEntity)
    private readonly trackRepository: Repository<TrackEntity>,
    @InjectRepository(AlbumEntity)
    private readonly albumRepository: Repository<AlbumEntity>,
  ) {}

  async create(albumId: string, track: Partial<TrackEntity>): Promise<TrackEntity> {
    if (track.duration <= 0) {
      throw new BadRequestException('La duración del track debe ser un número positivo.');
    }

    const album = await this.albumRepository.findOne({where:{id:albumId}});
    if (!album) {
      throw new NotFoundException(`Álbum con ID ${albumId} no encontrado.`);
    }

    const newTrack = this.trackRepository.create({ ...track, album });
    return await this.trackRepository.save(newTrack);
  }

  async findOne(id: string): Promise<TrackEntity> {
    const track = await this.trackRepository.findOne({where:{id}});
  
    if (!track) {
      throw new NotFoundException(`Track con ID ${id} no encontrado.`);
    }
  
    return track;
  }

  async findAll(): Promise<TrackEntity[]> {
    return await this.trackRepository.find();
  }
}
