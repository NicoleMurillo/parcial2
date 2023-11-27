"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const track_service_1 = require("./track.service");
const track_entity_1 = require("./track.entity");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const album_entity_1 = require("./album.entity");
const common_1 = require("@nestjs/common");
describe('TrackService', () => {
    let trackService;
    let trackRepository;
    let albumRepository;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [
                track_service_1.TrackService,
                {
                    provide: (0, typeorm_2.getRepositoryToken)(track_entity_1.TrackEntity),
                    useClass: typeorm_1.Repository,
                },
                {
                    provide: (0, typeorm_2.getRepositoryToken)(album_entity_1.AlbumEntity),
                    useClass: typeorm_1.Repository,
                },
            ],
        }).compile();
        trackService = module.get(track_service_1.TrackService);
        trackRepository = module.get((0, typeorm_2.getRepositoryToken)(track_entity_1.TrackEntity));
        albumRepository = module.get((0, typeorm_2.getRepositoryToken)(album_entity_1.AlbumEntity));
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
                .mockResolvedValueOnce(new album_entity_1.AlbumEntity());
            const createTrackMock = jest
                .spyOn(trackRepository, 'create')
                .mockReturnValueOnce(new track_entity_1.TrackEntity());
            const saveTrackMock = jest
                .spyOn(trackRepository, 'save')
                .mockResolvedValueOnce(new track_entity_1.TrackEntity());
            const result = await trackService.create(albumId, trackData);
            expect(findAlbumMock).toHaveBeenCalledWith({ where: { id: albumId } });
            expect(createTrackMock).toHaveBeenCalledWith(expect.objectContaining(trackData));
            expect(saveTrackMock).toHaveBeenCalled();
            expect(result).toBeInstanceOf(track_entity_1.TrackEntity);
        });
        it('should throw BadRequestException for negative duration', async () => {
            const albumId = 'validAlbumId';
            const trackData = {
                name: 'Track 1',
                duration: -10,
            };
            await expect(trackService.create(albumId, trackData)).rejects.toThrowError(common_1.BadRequestException);
        });
        it('should throw NotFoundException for non-existing album', async () => {
            const albumId = 'nonExistingAlbumId';
            const trackData = {
                name: 'Track 1',
                duration: 180,
            };
            jest.spyOn(albumRepository, 'findOne').mockResolvedValueOnce(undefined);
            await expect(trackService.create(albumId, trackData)).rejects.toThrowError(common_1.NotFoundException);
        });
    });
    describe('findOne', () => {
        it('should return a track by ID', async () => {
            const trackId = 'validTrackId';
            const trackEntity = new track_entity_1.TrackEntity();
            jest.spyOn(trackRepository, 'findOne').mockResolvedValueOnce(trackEntity);
            const result = await trackService.findOne(trackId);
            expect(trackRepository.findOne).toHaveBeenCalledWith({ where: { id: trackId } });
            expect(result).toBeInstanceOf(track_entity_1.TrackEntity);
        });
        it('should throw NotFoundException for non-existing track', async () => {
            const trackId = 'nonExistingTrackId';
            jest.spyOn(trackRepository, 'findOne').mockResolvedValueOnce(undefined);
            await expect(trackService.findOne(trackId)).rejects.toThrowError(common_1.NotFoundException);
        });
    });
    describe('findAll', () => {
        it('should return an array of tracks', async () => {
            const trackEntities = [new track_entity_1.TrackEntity(), new track_entity_1.TrackEntity()];
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
//# sourceMappingURL=track.service.spec.js.map