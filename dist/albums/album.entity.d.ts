import { TrackEntity } from './track.entity';
import { PerformerEntity } from './performer.entity';
export declare class AlbumEntity {
    id: string;
    name: string;
    cover: string;
    releaseDate: Date;
    description: string;
    tracks: TrackEntity[];
    performer: PerformerEntity;
}
