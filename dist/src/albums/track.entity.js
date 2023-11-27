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
Object.defineProperty(exports, "__esModule", { value: true });
exports.TrackEntity = void 0;
const typeorm_1 = require("typeorm");
const album_entity_1 = require("./album.entity");
let TrackEntity = class TrackEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], TrackEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], TrackEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], TrackEntity.prototype, "duration", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => album_entity_1.AlbumEntity, album => album.tracks),
    __metadata("design:type", album_entity_1.AlbumEntity)
], TrackEntity.prototype, "album", void 0);
TrackEntity = __decorate([
    (0, typeorm_1.Entity)()
], TrackEntity);
exports.TrackEntity = TrackEntity;
//# sourceMappingURL=track.entity.js.map