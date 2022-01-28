import { selector } from 'recoil';
import { userAtom } from '../atom';

export const catsSelector = selector({
  key: 'selector/cat',
  get: ({ get }) => {
    const cats = get(userAtom)?.cat;
    return cats;
  },
});
