import { atom, selector } from 'recoil';
import { Cat } from '@src/typings/Cat';
import { getCats } from '@src/api/Cat';
export const catAtom = atom<Cat[]>({
  key: 'atom/cat',
  default: selector({
    key: 'cat/Default',
    get: () =>
      getCats().catch(() => {
        return [];
      }),
  }),
});

export const catNameAtom = atom({
  key: 'atom/catName',
  default: selector({
    key: 'catName/default',
    get: ({ get }) => {
      const catName = get(catAtom)[0].name;
      return catName;
    },
  }),
});
