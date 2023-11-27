import { AlbumService } from './album.service';
import { AlbumEntity } from './album.entity';
export declare class AlbumController {
    private readonly albumService;
    constructor(albumService: AlbumService);
    findAll(): Promise<AlbumEntity[]>;
    findOne(id: string): Promise<AlbumEntity>;
    create(album: Partial<AlbumEntity>): Promise<AlbumEntity>;
    delete(id: string): Promise<void>;
}
