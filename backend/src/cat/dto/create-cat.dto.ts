import { IsNotEmpty, MaxLength, MinLength } from 'class-validator';
import { CatGender } from '../cat-gender.enum';
export class CreateCatDto {
  @MinLength(1)
  @MaxLength(6)
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  age: string;

  @IsNotEmpty()
  breed: string;

  @IsNotEmpty()
  gender: CatGender;
}
