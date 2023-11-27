"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const performer_service_1 = require("./performer.service");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const performer_entity_1 = require("./performer.entity");
const common_1 = require("@nestjs/common");
describe('PerformerService', () => {
    let service;
    let performerRepository;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [
                performer_service_1.PerformerService,
                {
                    provide: (0, typeorm_1.getRepositoryToken)(performer_entity_1.PerformerEntity),
                    useClass: typeorm_2.Repository,
                },
            ],
        }).compile();
        service = module.get(performer_service_1.PerformerService);
        performerRepository = module.get((0, typeorm_1.getRepositoryToken)(performer_entity_1.PerformerEntity));
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
            const createdPerformer = new performer_entity_1.PerformerEntity();
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
            await expect(service.create(performerData)).rejects.toThrowError('La descripción del performer no puede tener más de 100 caracteres.');
        });
    });
    describe('findOne', () => {
        it('should return a performer by ID', async () => {
            const performerId = 'validPerformerId';
            const performerEntity = new performer_entity_1.PerformerEntity();
            jest.spyOn(performerRepository, 'findOne').mockResolvedValueOnce(performerEntity);
            const result = await service.findOne(performerId);
            expect(performerRepository.findOne).toHaveBeenCalledWith({ where: { id: performerId } });
            expect(result).toBeInstanceOf(performer_entity_1.PerformerEntity);
        });
        it('should throw NotFoundException for non-existing performer', async () => {
            const performerId = 'nonExistingPerformerId';
            jest.spyOn(performerRepository, 'findOne').mockResolvedValueOnce(undefined);
            await expect(service.findOne(performerId)).rejects.toThrowError(common_1.NotFoundException);
        });
    });
    describe('findAll', () => {
        it('should return an array of performers', async () => {
            const performerEntities = [new performer_entity_1.PerformerEntity(), new performer_entity_1.PerformerEntity()];
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
//# sourceMappingURL=performer.service.spec.js.map