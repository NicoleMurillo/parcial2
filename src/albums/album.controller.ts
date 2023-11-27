import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseInterceptors } from '@nestjs/common';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors.interceptor';
import { AlbumService } from './album.service';
import { AlbumEntity } from './album.entity';

@Controller('albums')
@UseInterceptors(BusinessErrorsInterceptor)
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Get()
  async findAll(): Promise<AlbumEntity[]> {
    return this.albumService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<AlbumEntity> {
    return this.albumService.findOne(id);
  }

  @Post()
  async create(@Body() album: Partial<AlbumEntity>): Promise<AlbumEntity> {
    return this.albumService.create(album);
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id') id: string): Promise<void> {
    return this.albumService.delete(id);
  }
}
