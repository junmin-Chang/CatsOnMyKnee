import { selector } from 'recoil';
import { diaryAtom, diaryFilterAtom } from '../atom/diary';
import { compareAsc, compareDesc } from 'date-fns';

export const filteredDiaries = selector({
  key: 'selector/filteredDiaries',
  get: ({ get }) => {
    const filters = get(diaryFilterAtom);
    const diaries = get(diaryAtom);
    switch (filters) {
      case '오래된 순':
        return [...diaries!].sort((a, b) => {
          return compareAsc(new Date(a.date), new Date(b.date));
        });
      case '최근 순':
        return [...diaries!].sort((a, b) => {
          return compareDesc(new Date(a.date), new Date(b.date));
        });

      case '기분 좋음':
        return diaries?.filter((diary) => {
          return diary.feeling === '기분 좋음';
        });

      case '그저그럼':
        return diaries?.filter((diary) => {
          return diary.feeling === '그저 그럼';
        });

      case '기분 안 좋음':
        return diaries?.filter((diary) => {
          return diary.feeling === '기분 안 좋음';
        });

      default:
        return diaries;
    }
  },

  set: ({ set }, newValue) => {
    set(diaryAtom, (prevState: any) => {
      console.log('prevSTATE:', prevState);
      return [...prevState, newValue];
    });
  },
});
