import { Test, TestingModule } from '@nestjs/testing';
import { AlbumService } from './album.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AlbumEntity } from './album.entity';
import { NotFoundException, BadRequestException } from '@nestjs/common';

describe('AlbumService', () => {
  let service: AlbumService;
  let albumRepository: Repository<AlbumEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AlbumService,
        {
          provide: getRepositoryToken(AlbumEntity),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<AlbumService>(AlbumService);
    albumRepository = module.get<Repository<AlbumEntity>>(getRepositoryToken(AlbumEntity));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create an album successfully', async () => {
      const albumData = {
        name: 'Album Name',
        cover: 'album-cover.jpg',
        releaseDate: new Date(),
        description: 'Album description',
      };

      const createdAlbum = new AlbumEntity();
      jest.spyOn(albumRepository, 'create').mockReturnValue(createdAlbum);
      jest.spyOn(albumRepository, 'save').mockResolvedValue(createdAlbum);

      const result = await service.create(albumData);

      expect(result).toEqual(createdAlbum);
      expect(albumRepository.create).toHaveBeenCalledWith(albumData);
      expect(albumRepository.save).toHaveBeenCalledWith(createdAlbum);
    });

    it('should throw a business exception for an empty description', async () => {
      const albumData = {
        name: 'Album Name',
        cover: 'album-cover.jpg',
        releaseDate: new Date(),
        description: '',
      };

      await expect(service.create(albumData)).rejects.toThrowError('El nombre y la descripción del álbum son obligatorios.');
    });
  });

  describe('findOne', () => {
    it('should return an album by ID', async () => {
      const albumId = 'validAlbumId';
      const albumEntity = new AlbumEntity();

      jest.spyOn(albumRepository, 'findOne').mockResolvedValueOnce(albumEntity);

      const result = await service.findOne(albumId);

      expect(albumRepository.findOne).toHaveBeenCalledWith({ where: { id: albumId } });
      expect(result).toBeInstanceOf(AlbumEntity);
    });

    it('should throw NotFoundException for non-existing album', async () => {
      const albumId = 'nonExistingAlbumId';

      jest.spyOn(albumRepository, 'findOne').mockResolvedValueOnce(undefined);

      await expect(service.findOne(albumId)).rejects.toThrowError(NotFoundException);
    });
  });

  describe('findAll', () => {
    it('should return an array of albums', async () => {
      const albumEntities = [new AlbumEntity(), new AlbumEntity()];

      jest.spyOn(albumRepository, 'find').mockResolvedValueOnce(albumEntities);

      const result = await service.findAll();

      expect(albumRepository.find).toHaveBeenCalled();
      expect(result).toEqual(expect.arrayContaining(albumEntities));
    });

    it('should return an empty array if no albums are found', async () => {
      jest.spyOn(albumRepository, 'find').mockResolvedValueOnce([]);

      const result = await service.findAll();

      expect(albumRepository.find).toHaveBeenCalled();
      expect(result).toEqual([]);
    });
  });
});
