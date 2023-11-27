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
exports.PerformerAlbumService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const album_entity_1 = require("./album.entity");
const performer_entity_1 = require("./performer.entity");
let PerformerAlbumService = class PerformerAlbumService {
    constructor(albumRepository, performerRepository) {
        this.albumRepository = albumRepository;
        this.performerRepository = performerRepository;
    }
    async addPerformerToAlbum(albumId, performerId) {
        const album = await this.albumRepository.findOne({ where: { id: albumId } });
        if (!album) {
            throw new common_1.NotFoundException(`Álbum con ID ${albumId} no encontrado.`);
        }
        const performer = await this.performerRepository.findOne({ where: { id: performerId } });
        if (!performer) {
            throw new common_1.NotFoundException(`Performer con ID ${performerId} no encontrado.`);
        }
        if (album.performers && album.performers.length >= 3) {
            throw new common_1.BadRequestException('El álbum ya tiene el máximo número de performers asociados.');
        }
        album.performers = [...(album.performers || []), performer];
        await this.albumRepository.save(album);
    }
};
PerformerAlbumService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(album_entity_1.AlbumEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(performer_entity_1.PerformerEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], PerformerAlbumService);
exports.PerformerAlbumService = PerformerAlbumService;
//# sourceMappingURL=performer-album.service.js.map