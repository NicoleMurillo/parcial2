import { Controller, Get, Post, Body, Param, UseInterceptors } from '@nestjs/common';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors.interceptor';
import { TrackService } from './track.service';
import { TrackEntity } from './track.entity';

@Controller('tracks')
@UseInterceptors(BusinessErrorsInterceptor)
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Get()
  async findAll(): Promise<TrackEntity[]> {
    return this.trackService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<TrackEntity> {
    return this.trackService.findOne(id);
  }

  @Post(':albumId')
  async create(@Param('albumId') albumId: string, @Body() track: Partial<TrackEntity>): Promise<TrackEntity> {
    return this.trackService.create(albumId, track);
  }
}
