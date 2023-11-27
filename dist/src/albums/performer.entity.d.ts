import { AlbumEntity } from './album.entity';
export declare class PerformerEntity {
    id: string;
    name: string;
    image: string;
    description: string;
    albums: AlbumEntity[];
}
