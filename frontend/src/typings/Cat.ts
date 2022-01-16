import { Diary } from './Diary';

export type CatGender = 'MALE' | 'FEMALE' | 'NO';
export interface Cat {
  name?: string;
  breed?: string;
  gender?: CatGender;
  age?: string;
  favorite?: string;
  hate?: string;
  diary?: Diary[] | null;
  image?: {
    url: string;
  };
}
