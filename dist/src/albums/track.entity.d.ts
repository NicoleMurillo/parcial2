import { AlbumEntity } from './album.entity';
export declare class TrackEntity {
    id: string;
    name: string;
    duration: number;
    album: AlbumEntity;
}
