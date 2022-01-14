import { IsNotEmpty, IsString } from 'class-validator';
import { CatGender } from '../cat-gender.enum';

export class CreateCatDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  age: number;

  @IsNotEmpty()
  breed: string;

  @IsNotEmpty()
  gender: CatGender;

  favorite: string;

  hate: string;
}
