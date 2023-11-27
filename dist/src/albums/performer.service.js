"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PerformerService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const performer_entity_1 = require("./performer.entity");
let PerformerService = class PerformerService {
    constructor(performerRepository) {
        this.performerRepository = performerRepository;
    }
    async create(performer) {
        if (performer.description && performer.description.length > 100) {
            throw new common_1.BadRequestException('La descripción del performer no puede tener más de 100 caracteres.');
        }
        const newPerformer = this.performerRepository.create(performer);
        return await this.performerRepository.save(newPerformer);
    }
    async findOne(id) {
        const performer = await this.performerRepository.findOne({ where: { id } });
        if (!performer) {
            throw new common_1.NotFoundException(`Performer con ID ${id} no encontrado.`);
        }
        return performer;
    }
    async findAll() {
        return await this.performerRepository.find();
    }
};
PerformerService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(performer_entity_1.PerformerEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], PerformerService);
exports.PerformerService = PerformerService;
//# sourceMappingURL=performer.service.js.map