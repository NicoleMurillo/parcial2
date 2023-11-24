import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AlbumEntity } from './album.entity';

@Injectable()
export class AlbumService {
  constructor(
    @InjectRepository(AlbumEntity)
    private readonly albumRepository: Repository<AlbumEntity>,
  ) {}

  async create(album: Partial<AlbumEntity>): Promise<AlbumEntity> {
    if (!album.name || !album.description) {
      throw new BadRequestException('El nombre y la descripción del álbum son obligatorios.');
    }

    const newAlbum = this.albumRepository.create(album);
    return await this.albumRepository.save(newAlbum);
  }

  async findOne(id: string): Promise<AlbumEntity> {
    const album = await this.albumRepository.findOne({where:{id}});

    if (!album) {
      throw new NotFoundException(`Álbum con ID ${id} no encontrado.`);
    }

    return album;
  }

  async findAll(): Promise<AlbumEntity[]> {
    return await this.albumRepository.find();
  }

  async delete(id: string): Promise<void> {
    const album = await this.findOne(id);
    if (album.tracks && album.tracks.length > 0) {
      throw new BadRequestException('No se puede eliminar un álbum con tracks asociados.');
    }

    await this.albumRepository.remove(album);
  }
}
