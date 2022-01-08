import { IsNotEmpty } from 'class-validator';

export class CreateCatDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  age: string;

  @IsNotEmpty()
  breed: string;
}
