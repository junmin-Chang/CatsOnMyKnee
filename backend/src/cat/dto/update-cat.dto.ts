import { CatGender } from '../cat-gender.enum';

export class UpdateCatDto {
  name: string;

  age: number;

  breed: string;

  gender: CatGender;

  favorite: string;

  hate: string;
}
