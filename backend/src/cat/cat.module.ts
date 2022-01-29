import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { UploadModule } from 'src/upload/upload.module';
import { CatController } from './cat.controller';
import { CatRepository } from './cat.repository';
import { CatService } from './cat.service';
@Module({
  imports: [
    TypeOrmModule.forFeature([CatRepository]),
    AuthModule,
    UploadModule,
  ],
  controllers: [CatController],
  providers: [CatService],
})
export class CatModule {}
