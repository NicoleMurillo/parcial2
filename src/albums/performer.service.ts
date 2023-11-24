import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PerformerEntity } from './performer.entity';

@Injectable()
export class PerformerService {
  constructor(
    @InjectRepository(PerformerEntity)
    private readonly performerRepository: Repository<PerformerEntity>,
  ) {}

  async create(performer: Partial<PerformerEntity>): Promise<PerformerEntity> {
    if (performer.description && performer.description.length > 100) {
      throw new BadRequestException('La descripción del performer no puede tener más de 100 caracteres.');
    }

    const newPerformer = this.performerRepository.create(performer);
    return await this.performerRepository.save(newPerformer);
  }

  async findOne(id: string): Promise<PerformerEntity> {
    const performer = await this.performerRepository.findOne({where:{id}});

    if (!performer) {
      throw new NotFoundException(`Performer con ID ${id} no encontrado.`);
    }

    return performer;
  }

  async findAll(): Promise<PerformerEntity[]> {
    return await this.performerRepository.find();
  }
}
