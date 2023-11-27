import { Repository } from 'typeorm';
import { TrackEntity } from './track.entity';
import { AlbumEntity } from './album.entity';
export declare class TrackService {
    private readonly trackRepository;
    private readonly albumRepository;
    constructor(trackRepository: Repository<TrackEntity>, albumRepository: Repository<AlbumEntity>);
    create(albumId: string, track: Partial<TrackEntity>): Promise<TrackEntity>;
    findOne(id: string): Promise<TrackEntity>;
    findAll(): Promise<TrackEntity[]>;
}
