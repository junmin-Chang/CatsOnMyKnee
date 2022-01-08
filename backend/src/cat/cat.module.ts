import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { CatController } from './cat.controller';
import { CatRepository } from './cat.repository';
import { CatService } from './cat.service';

@Module({
  imports: [TypeOrmModule.forFeature([CatRepository]), AuthModule],
  controllers: [CatController],
  providers: [CatService],
})
export class CatModule {}
