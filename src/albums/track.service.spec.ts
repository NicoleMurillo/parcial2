import { Test, TestingModule } from '@nestjs/testing';
import { TrackService } from './track.service';
import { TrackEntity } from './track.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AlbumEntity } from './album.entity';
import { NotFoundException, BadRequestException } from '@nestjs/common';

describe('TrackService', () => {
  let trackService: TrackService;
  let trackRepository: Repository<TrackEntity>;
  let albumRepository: Repository<AlbumEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TrackService,
        {
          provide: getRepositoryToken(TrackEntity),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(AlbumEntity),
          useClass: Repository,
        },
      ],
    }).compile();

    trackService = module.get<TrackService>(TrackService);
    trackRepository = module.get<Repository<TrackEntity>>(getRepositoryToken(TrackEntity));
    albumRepository = module.get<Repository<AlbumEntity>>(getRepositoryToken(AlbumEntity));
  });

  describe('create', () => {
    it('should create a track successfully', async () => {
      const albumId = 'validAlbumId';
      const trackData = {
        name: 'Track 1',
        duration: 180,
      };

      const findAlbumMock = jest
        .spyOn(albumRepository, 'findOne')
        .mockResolvedValueOnce(new AlbumEntity()); 

      const createTrackMock = jest
        .spyOn(trackRepository, 'create')
        .mockReturnValueOnce(new TrackEntity()); 

      const saveTrackMock = jest
        .spyOn(trackRepository, 'save')
        .mockResolvedValueOnce(new TrackEntity()); 

      const result = await trackService.create(albumId, trackData);

      expect(findAlbumMock).toHaveBeenCalledWith({ where: { id: albumId } });
      expect(createTrackMock).toHaveBeenCalledWith(expect.objectContaining(trackData));
      expect(saveTrackMock).toHaveBeenCalled();
      expect(result).toBeInstanceOf(TrackEntity);
    });

    it('should throw BadRequestException for negative duration', async () => {
      const albumId = 'validAlbumId';
      const trackData = {
        name: 'Track 1',
        duration: -10,
      };

      await expect(trackService.create(albumId, trackData)).rejects.toThrowError(BadRequestException);
    });

    it('should throw NotFoundException for non-existing album', async () => {
      const albumId = 'nonExistingAlbumId';
      const trackData = {
        name: 'Track 1',
        duration: 180,
      };

      jest.spyOn(albumRepository, 'findOne').mockResolvedValueOnce(undefined);

      await expect(trackService.create(albumId, trackData)).rejects.toThrowError(NotFoundException);
    });
  });

  describe('findOne', () => {
    it('should return a track by ID', async () => {
      const trackId = 'validTrackId';
      const trackEntity = new TrackEntity();

      jest.spyOn(trackRepository, 'findOne').mockResolvedValueOnce(trackEntity);

      const result = await trackService.findOne(trackId);

      expect(trackRepository.findOne).toHaveBeenCalledWith({ where: { id: trackId } });
      expect(result).toBeInstanceOf(TrackEntity);
    });

    it('should throw NotFoundException for non-existing track', async () => {
      const trackId = 'nonExistingTrackId';

      jest.spyOn(trackRepository, 'findOne').mockResolvedValueOnce(undefined);

      await expect(trackService.findOne(trackId)).rejects.toThrowError(NotFoundException);
    });
  });

  describe('findAll', () => {
    it('should return an array of tracks', async () => {
      const trackEntities = [new TrackEntity(), new TrackEntity()];

      jest.spyOn(trackRepository, 'find').mockResolvedValueOnce(trackEntities);

      const result = await trackService.findAll();

      expect(trackRepository.find).toHaveBeenCalled();
      expect(result).toEqual(expect.arrayContaining(trackEntities));
    });

    it('should return an empty array if no tracks are found', async () => {
      jest.spyOn(trackRepository, 'find').mockResolvedValueOnce([]);

      const result = await trackService.findAll();

      expect(trackRepository.find).toHaveBeenCalled();
      expect(result).toEqual([]);
    });
  });
});
