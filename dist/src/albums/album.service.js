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
exports.AlbumService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const album_entity_1 = require("./album.entity");
let AlbumService = class AlbumService {
    constructor(albumRepository) {
        this.albumRepository = albumRepository;
    }
    async create(album) {
        if (!album.name || !album.description) {
            throw new common_1.BadRequestException('El nombre y la descripción del álbum son obligatorios.');
        }
        const newAlbum = this.albumRepository.create(album);
        return await this.albumRepository.save(newAlbum);
    }
    async findOne(id) {
        const album = await this.albumRepository.findOne({ where: { id } });
        if (!album) {
            throw new common_1.NotFoundException(`Álbum con ID ${id} no encontrado.`);
        }
        return album;
    }
    async findAll() {
        return await this.albumRepository.find();
    }
    async delete(id) {
        const album = await this.findOne(id);
        if (album.tracks && album.tracks.length > 0) {
            throw new common_1.BadRequestException('No se puede eliminar un álbum con tracks asociados.');
        }
        await this.albumRepository.remove(album);
    }
};
AlbumService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(album_entity_1.AlbumEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], AlbumService);
exports.AlbumService = AlbumService;
//# sourceMappingURL=album.service.js.map