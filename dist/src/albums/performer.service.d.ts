import { Repository } from 'typeorm';
import { PerformerEntity } from './performer.entity';
export declare class PerformerService {
    private readonly performerRepository;
    constructor(performerRepository: Repository<PerformerEntity>);
    create(performer: Partial<PerformerEntity>): Promise<PerformerEntity>;
    findOne(id: string): Promise<PerformerEntity>;
    findAll(): Promise<PerformerEntity[]>;
}
