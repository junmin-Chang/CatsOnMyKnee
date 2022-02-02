import { DiaryFilter } from '@src/typings/Diary';
import { atom } from 'recoil';

export const diaryFilterAtom = atom<DiaryFilter>({
  key: 'atom/diaryFilter',
  default: DiaryFilter.ASC,
});
