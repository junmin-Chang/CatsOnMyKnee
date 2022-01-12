import { IsNotEmpty } from 'class-validator';
import { DiaryFeeling } from '../diary-feeling.enum';

export class CreateDiaryDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  date: string;

  @IsNotEmpty()
  feeling: DiaryFeeling;
}
