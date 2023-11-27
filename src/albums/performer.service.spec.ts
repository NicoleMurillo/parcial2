import { Test, TestingModule } from '@nestjs/testing';
import { PerformerService } from './performer.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PerformerEntity } from './performer.entity';
import { BadRequestException, NotFoundException } from '@nestjs/common';

describe('PerformerService', () => {
  let service: PerformerService;
  let performerRepository: Repository<PerformerEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PerformerService,
        {
          provide: getRepositoryToken(PerformerEntity),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<PerformerService>(PerformerService);
    performerRepository = module.get<Repository<PerformerEntity>>(getRepositoryToken(PerformerEntity));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a performer successfully', async () => {
      const performerData = {
        name: 'Performer Name',
        image: 'performer-image.jpg',
        description: 'Valid description.',
      };

      const createdPerformer = new PerformerEntity();
      jest.spyOn(performerRepository, 'create').mockReturnValue(createdPerformer);
      jest.spyOn(performerRepository, 'save').mockResolvedValue(createdPerformer);

      const result = await service.create(performerData);

      expect(result).toEqual(createdPerformer);
      expect(performerRepository.create).toHaveBeenCalledWith(performerData);
      expect(performerRepository.save).toHaveBeenCalledWith(createdPerformer);
    });

    it('should throw a business exception for description exceeding 100 characters', async () => {
      const performerData = {
        name: 'Performer Name',
        image: 'performer-image.jpg',
        description: 'A'.repeat(101),
      };

      await expect(service.create(performerData)).rejects.toThrowError(
        'La descripción del performer no puede tener más de 100 caracteres.',
      );
    });
  });

  describe('findOne', () => {
    it('should return a performer by ID', async () => {
      const performerId = 'validPerformerId';
      const performerEntity = new PerformerEntity();

      jest.spyOn(performerRepository, 'findOne').mockResolvedValueOnce(performerEntity);

      const result = await service.findOne(performerId);

      expect(performerRepository.findOne).toHaveBeenCalledWith({ where: { id: performerId } });
      expect(result).toBeInstanceOf(PerformerEntity);
    });

    it('should throw NotFoundException for non-existing performer', async () => {
      const performerId = 'nonExistingPerformerId';

      jest.spyOn(performerRepository, 'findOne').mockResolvedValueOnce(undefined);

      await expect(service.findOne(performerId)).rejects.toThrowError(NotFoundException);
    });
  });

  describe('findAll', () => {
    it('should return an array of performers', async () => {
      const performerEntities = [new PerformerEntity(), new PerformerEntity()];

      jest.spyOn(performerRepository, 'find').mockResolvedValueOnce(performerEntities);

      const result = await service.findAll();

      expect(performerRepository.find).toHaveBeenCalled();
      expect(result).toEqual(expect.arrayContaining(performerEntities));
    });

    it('should return an empty array if no performers are found', async () => {
      jest.spyOn(performerRepository, 'find').mockResolvedValueOnce([]);

      const result = await service.findAll();

      expect(performerRepository.find).toHaveBeenCalled();
      expect(result).toEqual([]);
    });
  });
});
