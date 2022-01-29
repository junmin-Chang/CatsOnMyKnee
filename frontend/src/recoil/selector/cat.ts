import { selector } from 'recoil';
import { catAtom, catNameAtom } from '../atom/cat';

export const filteredCat = selector({
  key: 'selector/filteredCat',
  get: ({ get }) => {
    const catName = get(catNameAtom);
    const cats = get(catAtom);
    return cats.filter((cat) => cat.name === catName)[0];
  },
});
