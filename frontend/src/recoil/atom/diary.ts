import { getDiaries } from '@src/api/Diary';
import { Diary, DiaryFilter } from '@src/typings/Diary';
import { atom, atomFamily, selector, selectorFamily } from 'recoil';
import { catNameAtom } from './cat';

export const diaryAtom = atom({
  key: 'atom/diary',
  default: selector({
    key: 'diary/Default',
    get: ({ get }) => {
      const catName = get(catNameAtom);
      return getDiaries(catName as string);
    },
  }),
});
export const diaryItemState = atomFamily({
  key: 'diaryItemState',
  default: selectorFamily({
    key: 'diaryItemState/Default',
    get:
      (id: string) =>
      ({ get }) => {
        const diaries = get(diaryAtom) as Diary[];
        return diaries.find((v) => v.id === id);
      },
  }),
});
export const diaryFilterAtom = atom<DiaryFilter>({
  key: 'atom/diaryFilter',
  default: DiaryFilter['오래된 순'],
});
