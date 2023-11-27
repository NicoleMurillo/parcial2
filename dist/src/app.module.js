"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const typeorm_1 = require("@nestjs/typeorm");
const album_entity_1 = require("./albums/album.entity");
const track_entity_1 = require("./albums/track.entity");
const performer_entity_1 = require("./albums/performer.entity");
const album_service_1 = require("./albums/album.service");
const track_service_1 = require("./albums/track.service");
const performer_service_1 = require("./albums/performer.service");
const performer_album_service_1 = require("./albums/performer-album.service");
const album_controller_1 = require("./albums/album.controller");
const track_controller_1 = require("./albums/track.controller");
const performer_controller_1 = require("./albums/performer.controller");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forRoot({
                type: 'postgres',
                host: 'localhost',
                port: 5432,
                username: 'nicolemurillo',
                password: '1234',
                database: 'database',
                entities: [album_entity_1.AlbumEntity, track_entity_1.TrackEntity, performer_entity_1.PerformerEntity],
                synchronize: true,
            }),
        ],
        controllers: [app_controller_1.AppController, album_controller_1.AlbumController, track_controller_1.TrackController, performer_controller_1.PerformerController],
        providers: [app_service_1.AppService, album_service_1.AlbumService, track_service_1.TrackService, performer_service_1.PerformerService, performer_album_service_1.PerformerAlbumService],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map