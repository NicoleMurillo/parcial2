import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlbumEntity } from './albums/album.entity';
import { TrackEntity } from './albums/track.entity';
import { PerformerEntity } from './albums/performer.entity';
import { AlbumService } from './albums/album.service';
import { TrackService } from './albums/track.service';
import { PerformerService } from './albums/performer.service';
import { PerformerAlbumService } from './albums/performer-album.service';
import { AlbumController } from './albums/album.controller';
import { TrackController } from './albums/track.controller';
import { PerformerController } from './albums/performer.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres', 
      host: 'localhost', 
      port: 5432, 
      username: 'nicolemurillo', 
      password: '1234', 
      database: 'database', 
      entities: [AlbumEntity, TrackEntity, PerformerEntity],
      synchronize: true, 
    }),
  ],
  controllers: [AppController, AlbumController, TrackController, PerformerController],
  providers: [AppService, AlbumService, TrackService, PerformerService, PerformerAlbumService],
})
export class AppModule {}


