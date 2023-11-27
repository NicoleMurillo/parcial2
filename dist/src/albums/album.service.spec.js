"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const album_service_1 = require("./album.service");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const album_entity_1 = require("./album.entity");
const common_1 = require("@nestjs/common");
describe('AlbumService', () => {
    let service;
    let albumRepository;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [
                album_service_1.AlbumService,
                {
                    provide: (0, typeorm_1.getRepositoryToken)(album_entity_1.AlbumEntity),
                    useClass: typeorm_2.Repository,
                },
            ],
        }).compile();
        service = module.get(album_service_1.AlbumService);
        albumRepository = module.get((0, typeorm_1.getRepositoryToken)(album_entity_1.AlbumEntity));
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
            const createdAlbum = new album_entity_1.AlbumEntity();
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
            const albumEntity = new album_entity_1.AlbumEntity();
            jest.spyOn(albumRepository, 'findOne').mockResolvedValueOnce(albumEntity);
            const result = await service.findOne(albumId);
            expect(albumRepository.findOne).toHaveBeenCalledWith({ where: { id: albumId } });
            expect(result).toBeInstanceOf(album_entity_1.AlbumEntity);
        });
        it('should throw NotFoundException for non-existing album', async () => {
            const albumId = 'nonExistingAlbumId';
            jest.spyOn(albumRepository, 'findOne').mockResolvedValueOnce(undefined);
            await expect(service.findOne(albumId)).rejects.toThrowError(common_1.NotFoundException);
        });
    });
    describe('findAll', () => {
        it('should return an array of albums', async () => {
            const albumEntities = [new album_entity_1.AlbumEntity(), new album_entity_1.AlbumEntity()];
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
//# sourceMappingURL=album.service.spec.js.map