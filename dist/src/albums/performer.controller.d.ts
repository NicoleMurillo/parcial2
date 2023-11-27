import { PerformerService } from './performer.service';
import { PerformerEntity } from './performer.entity';
export declare class PerformerController {
    private readonly performerService;
    constructor(performerService: PerformerService);
    findAll(): Promise<PerformerEntity[]>;
    findOne(id: string): Promise<PerformerEntity>;
    create(performer: Partial<PerformerEntity>): Promise<PerformerEntity>;
}
