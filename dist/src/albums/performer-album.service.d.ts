import { Repository } from 'typeorm';
import { AlbumEntity } from './album.entity';
import { PerformerEntity } from './performer.entity';
export declare class PerformerAlbumService {
    private readonly albumRepository;
    private readonly performerRepository;
    constructor(albumRepository: Repository<AlbumEntity>, performerRepository: Repository<PerformerEntity>);
    addPerformerToAlbum(albumId: string, performerId: string): Promise<void>;
}
