import { DiaryFilter } from '@src/typings/Diary';
import { atom, selector } from 'recoil';
import { filteredCat } from '../selector/cat';

export const diaryAtom = atom({
  key: 'atom/diary',
  default: selector({
    key: 'diarySelector',
    get: ({ get }) => get(filteredCat).diary,
  }),
});
export const diaryFilterAtom = atom<DiaryFilter>({
  key: 'atom/diaryFilter',
  default: DiaryFilter['오래된 순'],
});
