import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AlbumEntity } from './album.entity';
import { PerformerEntity } from './performer.entity';

@Injectable()
export class PerformerAlbumService {
  constructor(
    @InjectRepository(AlbumEntity)
    private readonly albumRepository: Repository<AlbumEntity>,
    @InjectRepository(PerformerEntity)
    private readonly performerRepository: Repository<PerformerEntity>,
  ) {}

  async addPerformerToAlbum(albumId: string, performerId: string): Promise<void> {
    const album = await this.albumRepository.findOne({where:{id:albumId}});
    if (!album) {
      throw new NotFoundException(`Álbum con ID ${albumId} no encontrado.`);
    }
    const performer = await this.performerRepository.findOne({where:{id:performerId}});
    if (!performer) {
      throw new NotFoundException(`Performer con ID ${performerId} no encontrado.`);
    }

    if (album.performers && album.performers.length >= 3) {
      throw new BadRequestException('El álbum ya tiene el máximo número de performers asociados.');
    }

    album.performers = [...(album.performers || []), performer];
    await this.albumRepository.save(album);
  }
}
