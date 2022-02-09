import { Diary } from './Diary';

export type CatGender = 'MALE' | 'FEMALE' | 'NO';
export interface Cat {
  name?: string;
  breed?: string;
  gender: CatGender;
  age?: string;
  favorite?: { value: string; label: string }[];
  hate?: { value: string; label: string }[];
  diary?: Diary[] | null;
  image?: {
    url: string;
  };
  startDate?: string | Date | null;
}
