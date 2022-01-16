import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UploadImage } from './upload.entity';
import { UploadService } from './upload.service';
@Module({
  imports: [TypeOrmModule.forFeature([UploadImage])],
  providers: [UploadService],
  exports: [UploadService],
})
export class UploadModule {}
