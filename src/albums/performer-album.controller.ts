import { Controller, Post, Param, NotFoundException, BadRequestException, UseInterceptors } from '@nestjs/common';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors.interceptor';
import { PerformerAlbumService } from './performer-album.service';

@Controller('performer-albums')
@UseInterceptors(BusinessErrorsInterceptor)
export class PerformerAlbumController {
  constructor(private readonly performerAlbumService: PerformerAlbumService) {}

  @Post(':albumId/add-performer/:performerId')
  async addPerformerToAlbum(
    @Param('albumId') albumId: string,
    @Param('performerId') performerId: string,
  ): Promise<void> {
    try {
      await this.performerAlbumService.addPerformerToAlbum(albumId, performerId);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      } else if (error instanceof BadRequestException) {
        throw new BadRequestException(error.message);
      } else {
        throw error;
      }
    }
  }
}
