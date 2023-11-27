import { Controller, Get, Post, Body, Param, UseInterceptors } from '@nestjs/common';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors.interceptor';
import { PerformerService } from './performer.service';
import { PerformerEntity } from './performer.entity';

@Controller('performers')
@UseInterceptors(BusinessErrorsInterceptor)
export class PerformerController {
  constructor(private readonly performerService: PerformerService) {}

  @Get()
  async findAll(): Promise<PerformerEntity[]> {
    return this.performerService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<PerformerEntity> {
    return this.performerService.findOne(id);
  }

  @Post()
  async create(@Body() performer: Partial<PerformerEntity>): Promise<PerformerEntity> {
    return this.performerService.create(performer);
  }
}
