"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const performer_album_service_1 = require("./performer-album.service");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const album_entity_1 = require("./album.entity");
const performer_entity_1 = require("./performer.entity");
const common_1 = require("@nestjs/common");
describe('PerformerAlbumService', () => {
    let service;
    let albumRepository;
    let performerRepository;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [
                performer_album_service_1.PerformerAlbumService,
                {
                    provide: (0, typeorm_1.getRepositoryToken)(album_entity_1.AlbumEntity),
                    useClass: typeorm_2.Repository,
                },
                {
                    provide: (0, typeorm_1.getRepositoryToken)(performer_entity_1.PerformerEntity),
                    useClass: typeorm_2.Repository,
                },
            ],
        }).compile();
        service = module.get(performer_album_service_1.PerformerAlbumService);
        albumRepository = module.get((0, typeorm_1.getRepositoryToken)(album_entity_1.AlbumEntity));
        performerRepository = module.get((0, typeorm_1.getRepositoryToken)(performer_entity_1.PerformerEntity));
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
    describe('addPerformerToAlbum', () => {
        it('should add performer to album successfully', async () => {
            const albumId = 'validAlbumId';
            const performerId = 'validPerformerId';
            const albumEntity = new album_entity_1.AlbumEntity();
            const performerEntity = new performer_entity_1.PerformerEntity();
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
            jest.spyOn(performerRepository, 'findOne').mockResolvedValueOnce(new performer_entity_1.PerformerEntity());
            await expect(service.addPerformerToAlbum(albumId, performerId)).rejects.toThrowError(common_1.NotFoundException);
        });
        it('should throw NotFoundException for non-existing performer', async () => {
            const albumId = 'validAlbumId';
            const performerId = 'nonExistingPerformerId';
            jest.spyOn(albumRepository, 'findOne').mockResolvedValueOnce(new album_entity_1.AlbumEntity());
            jest.spyOn(performerRepository, 'findOne').mockResolvedValueOnce(undefined);
            await expect(service.addPerformerToAlbum(albumId, performerId)).rejects.toThrowError(common_1.NotFoundException);
        });
        it('should throw BadRequestException for album with more than 3 performers', async () => {
            const albumId = 'validAlbumId';
            const performerId = 'validPerformerId';
            const albumEntity = new album_entity_1.AlbumEntity();
            albumEntity.performers = [new performer_entity_1.PerformerEntity(), new performer_entity_1.PerformerEntity(), new performer_entity_1.PerformerEntity()];
            jest.spyOn(albumRepository, 'findOne').mockResolvedValueOnce(albumEntity);
            jest.spyOn(performerRepository, 'findOne').mockResolvedValueOnce(new performer_entity_1.PerformerEntity());
            await expect(service.addPerformerToAlbum(albumId, performerId)).rejects.toThrowError(common_1.BadRequestException);
        });
    });
});
//# sourceMappingURL=performer-album.service.spec.js.map