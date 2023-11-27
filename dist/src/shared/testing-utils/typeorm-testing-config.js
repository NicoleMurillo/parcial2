"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeOrmTestingConfig = void 0;
const typeorm_1 = require("@nestjs/typeorm");
const album_entity_1 = require("src/albums/album.entity");
const track_entity_1 = require("src/albums/track.entity");
const performer_entity_1 = require("src/albums/performer.entity");
const TypeOrmTestingConfig = () => [
    typeorm_1.TypeOrmModule.forRoot({
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'nicolemurillo',
        password: '1234',
        database: 'database',
        entities: [album_entity_1.AlbumEntity, track_entity_1.TrackEntity, performer_entity_1.PerformerEntity],
        synchronize: true,
        keepConnectionAlive: true
    }),
    typeorm_1.TypeOrmModule.forFeature([album_entity_1.AlbumEntity, track_entity_1.TrackEntity, performer_entity_1.PerformerEntity]),
];
exports.TypeOrmTestingConfig = TypeOrmTestingConfig;
//# sourceMappingURL=typeorm-testing-config.js.map