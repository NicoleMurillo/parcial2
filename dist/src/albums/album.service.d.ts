import { Repository } from 'typeorm';
import { AlbumEntity } from './album.entity';
export declare class AlbumService {
    private readonly albumRepository;
    constructor(albumRepository: Repository<AlbumEntity>);
    create(album: Partial<AlbumEntity>): Promise<AlbumEntity>;
    findOne(id: string): Promise<AlbumEntity>;
    findAll(): Promise<AlbumEntity[]>;
    delete(id: string): Promise<void>;
}
