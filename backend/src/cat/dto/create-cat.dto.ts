import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { CatGender } from '../cat-gender.enum';

export class CreateCatDto {
  @IsNotEmpty({ message: '이름을 입력해주세요' })
  name: string;

  @IsNotEmpty({ message: '나이를 입력해주세요' })
  @IsString()
  age: string;

  @IsNotEmpty({ message: '종을 입력해주세요' })
  breed: string;

  @IsNotEmpty({ message: '성별을 입력해주세요' })
  gender: CatGender;

  @IsOptional()
  favorite: { value: string; label: string }[];

  @IsOptional()
  hate: { value: string[]; label: string }[];

  @IsNotEmpty({ message: '날짜를 입력해주세요' })
  startDate: string;
}
