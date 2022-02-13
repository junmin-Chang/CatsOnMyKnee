import { IsOptional, IsString } from 'class-validator';
import { CatGender } from '../cat-gender.enum';

export class UpdateCatDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  age: string;

  @IsOptional()
  @IsString()
  breed: string;

  @IsOptional()
  gender: CatGender;

  @IsOptional()
  favorite: string[];

  @IsOptional()
  hate: string[];
}
