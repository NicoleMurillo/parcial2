import { TypeOrmModule } from '@nestjs/typeorm';
import { AlbumEntity } from 'src/albums/album.entity';
import { TrackEntity } from 'src/albums/track.entity';
import { PerformerEntity } from 'src/albums/performer.entity';

export const TypeOrmTestingConfig = () => [
 TypeOrmModule.forRoot({
    type: 'postgres', 
    host: 'localhost', 
    port: 5432, 
    username: 'nicolemurillo', 
    password: '1234', 
    database: 'database', 
    entities: [AlbumEntity, TrackEntity, PerformerEntity],
    synchronize: true,
    keepConnectionAlive: true
 }),
 TypeOrmModule.forFeature([AlbumEntity, TrackEntity, PerformerEntity]),
];