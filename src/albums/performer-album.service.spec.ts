import { Test, TestingModule } from '@nestjs/testing';
import { PerformerAlbumService } from './performer-album.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AlbumEntity } from './album.entity';
import { PerformerEntity } from './performer.entity';
import { NotFoundException, BadRequestException } from '@nestjs/common';

describe('PerformerAlbumService', () => {
  let service: PerformerAlbumService;
  let albumRepository: Repository<AlbumEntity>;
  let performerRepository: Repository<PerformerEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PerformerAlbumService,
        {
          provide: getRepositoryToken(AlbumEntity),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(PerformerEntity),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<PerformerAlbumService>(PerformerAlbumService);
    albumRepository = module.get<Repository<AlbumEntity>>(getRepositoryToken(AlbumEntity));
    performerRepository = module.get<Repository<PerformerEntity>>(getRepositoryToken(PerformerEntity));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('addPerformerToAlbum', () => {
    it('should add performer to album successfully', async () => {
      const albumId = 'validAlbumId';
      const performerId = 'validPerformerId';
      const albumEntity = new AlbumEntity(); 
      const performerEntity = new PerformerEntity();

      jest.spyOn(albumRepository, 'findOne').mockResolvedValueOnce(albumEntity);
      jest.spyOn(performerRepository, 'findOne').mockResolvedValueOnce(performerEntity);
      jest.spyOn(albumRepository, 'save').mockResolvedValueOnce(albumEntity);

      await service.addPerformerToAlbum(albumId, performerId);

      expect(albumRepository.findOne).toHaveBeenCalledWith({ where: { id: albumId } });
      expect(performerRepository.findOne).toHaveBeenCalledWith({ where: { id: performerId } });
      expect(albumRepository.save).toHaveBeenCalledWith(albumEntity);
      expect(albumEntity.performers).toEqual(expect.arrayContaining([performerEntity]));
    });

    it('should throw NotFoundException for non-existing album', async () => {
      const albumId = 'nonExistingAlbumId';
      const performerId = 'validPerformerId';

      jest.spyOn(albumRepository, 'findOne').mockResolvedValueOnce(undefined);
      jest.spyOn(performerRepository, 'findOne').mockResolvedValueOnce(new PerformerEntity());

      await expect(service.addPerformerToAlbum(albumId, performerId)).rejects.toThrowError(NotFoundException);
    });

    it('should throw NotFoundException for non-existing performer', async () => {
      const albumId = 'validAlbumId';
      const performerId = 'nonExistingPerformerId';

      jest.spyOn(albumRepository, 'findOne').mockResolvedValueOnce(new AlbumEntity());
      jest.spyOn(performerRepository, 'findOne').mockResolvedValueOnce(undefined);

      await expect(service.addPerformerToAlbum(albumId, performerId)).rejects.toThrowError(NotFoundException);
    });

    it('should throw BadRequestException for album with more than 3 performers', async () => {
      const albumId = 'validAlbumId';
      const performerId = 'validPerformerId';
      const albumEntity = new AlbumEntity();
      albumEntity.performers = [new PerformerEntity(), new PerformerEntity(), new PerformerEntity()];

      jest.spyOn(albumRepository, 'findOne').mockResolvedValueOnce(albumEntity);
      jest.spyOn(performerRepository, 'findOne').mockResolvedValueOnce(new PerformerEntity());

      await expect(service.addPerformerToAlbum(albumId, performerId)).rejects.toThrowError(BadRequestException);
    });
  });
});
