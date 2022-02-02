import { selector } from 'recoil';
import { diaryFilterAtom } from '../atom/diary';
import { filteredCat } from './cat';
import { compareAsc, compareDesc } from 'date-fns';

export const filteredDiaries = selector({
  key: 'selector/filteredDiaries',
  get: ({ get }) => {
    const filters = get(diaryFilterAtom);
    const diaries = get(filteredCat).diary;
    switch (filters) {
      case 'ASC':
        return [...diaries!].sort((a, b) => {
          return compareAsc(new Date(a.date), new Date(b.date));
        });
      case 'DESC':
        return [...diaries!].sort((a, b) => {
          return compareDesc(new Date(a.date), new Date(b.date));
        });

      case 'GOOD':
        return diaries?.filter((diary) => {
          return diary.feeling === '기분 좋음';
        });

      case 'SOSO':
        return diaries?.filter((diary) => {
          return diary.feeling === '그저 그럼';
        });

      case 'BAD':
        return diaries?.filter((diary) => {
          return diary.feeling === '기분 안 좋음';
        });

      default:
        return diaries;
    }
  },
});
